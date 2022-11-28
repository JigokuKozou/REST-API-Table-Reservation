import Reservation from '../model/reservation.js'
import reservationService from '../service/reservation.service.js'

class ReservationController {
    async create(req, res) {
        try {
            const reservation = await reservationService.create(req.body)

            res.json(ReservationController.toJson(reservation))
        } catch (e) {
            res.status(500).json(e.message)
            console.log(e)
        }
    }
    
    async getAll(req, res) {
        try {
            const reservations = await reservationService.getAll()

            res.json(reservations.map(ReservationController.toJson))
        } catch (e) {
            res.status(500).json(e.message)
            console.log(e)
        }
    }
    
    async get(req, res) {
        try {
            const reservation = await reservationService.get(req.params.id)

            res.json(ReservationController.toJson(reservation))
        } catch (e) {
            res.status(500).json(e.message)
            console.log(e)
        }
    }
    
    async update(req, res) {
        try {
            const reservation = await reservationService.update(req.body)

            res.json(ReservationController.toJson(reservation))
        } catch (e) {
            res.status(500).json(e.message)
            console.log(e)
        }
    }
    
    async delete(req, res) {
        try {
            const writeResult = await reservationService.delete(req.params.id)
    
            res.json(writeResult)
        } catch (e) {
            res.status(500).json(e.message)
            console.log(e)
        }
    }

    static toJson(reservation) {
        return Reservation.toFirestoreData(reservation)
    }
}

export default new ReservationController()