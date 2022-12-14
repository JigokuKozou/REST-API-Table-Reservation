import Service from './service.js'
import Reservation from '../model/reservation.js'
import userService from './user.service.js'

class ReservationService extends Service {
    constructor() {
        super('Reservations', 'reservation')
    }

    async create({ tableId, userId, bookingStartDate, bookingEndDate, phone, login }) {

        phone = phone || (await userService.get(userId)).phone;
        login = login || (await userService.get(userId)).login;

        const reservation = new Reservation(tableId, userId, bookingStartDate, bookingEndDate, phone, login, false)

        await this.checkValidityReservation(reservation)

        return super.create(reservation)
    }
    
    async getAll() {
        return super.getAll(ReservationService.snapshotToReservation)
    }
    
    async get(id) {
        return super.get(id, ReservationService.snapshotToReservation)
    }
    
    async update({ id, tableId, userId, bookingStartDate, bookingEndDate, phone, login, isDeleted }) {

        const update = await super.update({ id, tableId, userId, bookingStartDate, bookingEndDate, phone, login, isDeleted },
            ReservationService.snapshotToReservation)

        const documentReference = update.documentReference
        const reservation = update.element

        reservation.tableId = tableId || reservation.tableId
        reservation.userId = userId || reservation.userId
        reservation.phone = phone || (await userService.get(userId)).phone;
        reservation.login = login || (await userService.get(userId)).login;
        reservation.setBookingTime(bookingStartDate || reservation.bookingStartDate, bookingEndDate || reservation.bookingEndDate)
        
        await this.checkValidityReservation(reservation)

        await documentReference.set(reservation.toFirestoreData(false))

        return reservation
    }
    
    async delete(id) {
        return super.delete(id)
    }


    async getAllByPhone(phone) {
        return this.getAllByField('phone', phone);
    }

    async getAllByUserId(userId) {
        return this.getAllByField('userId', userId);
    }

    async getAllByLogin(login) {
        return this.getAllByField('login', login);
    }

    async getAllByTable(tableId) {
        return this.getAllByField('tableId', Number(tableId));
    }

    async getAllByField(fieldName, fieldValue) {
        const snapshots = await this.database.where(fieldName, '==', fieldValue).get()
        const reservations = snapshots.docs.map((snapshot) => Reservation.fromFirestoreData({ id: snapshot.id, ...snapshot.data() }))

        return reservations
    }

    async checkValidityReservation(reservation) {
        if (await ReservationService.isTableValid(reservation.tableId) === false) {
            throw new Error('Table is not valid')
        }

        if (await ReservationService.isUserExist(reservation.userId) === false) {
            throw new Error('User is not exist')
        }

        if (await this.isReservationBookingTimeValid(reservation) === false) {
            throw new Error('Booked times intersect existing bookings')
        }
    }

    static async isTableValid(tableId) {
        return 0 < tableId;
    }

    static async isUserExist(userId) {
        return (await userService.get(userId)) !== undefined
    }

    async isReservationBookingTimeValid(reservation) {
        const tableReservations = await this.getAllByTable(reservation.tableId)
        return tableReservations.some(x => reservation.id !== x.id && reservation.isCrossBookingDate(x)) === false
    }

    static snapshotToReservation(snapshot) {
        return Reservation.fromFirestoreData({ id: snapshot.id, ...snapshot.data() })
    }
}

export default new ReservationService()