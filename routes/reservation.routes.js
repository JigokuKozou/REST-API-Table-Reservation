import Router from 'express'
import reservationController from '../controller/reservation.controller.js'

const router = new Router()

const nameDatabase = "reservations";

router.post(`/${nameDatabase}`, reservationController.create)
router.get(`/${nameDatabase}`, reservationController.getAll)
router.get(`/${nameDatabase}/:id`, reservationController.get)
router.get(`/${nameDatabase}/user/:id`, reservationController.getAllByUserId)
router.get(`/${nameDatabase}/phone/:phone`, reservationController.getAllByPhone)
router.get(`/${nameDatabase}/login/:login`, reservationController.getAllByLogin)
router.get(`/${nameDatabase}/table/:id`, reservationController.getAllByTableId)
router.put(`/${nameDatabase}`, reservationController.update)
router.delete(`/${nameDatabase}/:id`, reservationController.delete)

export default router