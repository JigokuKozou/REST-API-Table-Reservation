import Service from './service.js'
import Reservation from '../model/reservation.js'
import tableService from '../service/table.service.js'
import personService from '../service/person.service.js'

class ReservationService extends Service {
    constructor() {
        super('Reservations', 'reservation')
    }

    async create({ tableId, personId, bookingStartDate, bookingEndDate }) {
        const reservation = new Reservation(tableId, personId, bookingStartDate, bookingEndDate)

        await this.checkValidityReservation(reservation)

        return super.create(reservation)
    }
    
    async getAll() {
        return super.getAll(ReservationService.snapshotToReservation)
    }
    
    async get(id) {
        return super.get(id, ReservationService.snapshotToReservation)
    }
    
    async update({ id, tableId, personId, bookingStartDate, bookingEndDate }) {
        const update = await super.update({ id, tableId, personId, bookingStartDate, bookingEndDate }, 
            ReservationService.snapshotToReservation)

        const documentReference = update.documentReference
        const reservation = update.element

        reservation.tableId = tableId || reservation.tableId
        reservation.personId = personId || reservation.personId
        reservation.setBookingTime(bookingStartDate || reservation.bookingStartDate, bookingEndDate || reservation.bookingEndDate)
        
        await this.checkValidityReservation(reservation)

        await documentReference.set(reservation.toFirestoreData(false))

        return reservation
    }
    
    async delete(id) {
        return super.delete(id)
    }

    async getAllTableReservations(tableId) {
        const snapshots = await this.database.where('tableId', '==', tableId).get()
        const reservations = snapshots.docs.map((snapshot) => Reservation.fromFirestoreData({ id: snapshot.id, ...snapshot.data() }))

        return reservations
    }

    async checkValidityReservation(reservation) {
        if (await ReservationService.isTableExist(reservation.tableId) === false) {
            throw new Error('Table is not exist')
        }

        if (await ReservationService.isPersonExist(reservation.personId) === false) {
            throw new Error('Person is not exist')
        }

        if (await this.isReservationBookingTimeValid(reservation) === false) {
            throw new Error('Booked times intersect existing bookings')
        }
    }

    static async isTableExist(tableId) {
        return (await tableService.get(tableId)) !== undefined
    }

    static async isPersonExist(personId) {
        return (await personService.get(personId)) !== undefined
    }

    async isReservationBookingTimeValid(reservation) {
        const tableReservations = await this.getAllTableReservations(reservation.tableId)
        return tableReservations.some(x => reservation.id !== x.id && reservation.isCrossBookingDate(x)) === false
    }

    static snapshotToReservation(snapshot) {
        return Reservation.fromFirestoreData({ id: snapshot.id, ...snapshot.data() })
    }
}

export default new ReservationService()