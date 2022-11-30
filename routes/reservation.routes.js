import Router from 'express'
import reservationController from '../controller/reservation.controller.js'

const router = new Router()

router.post('/reservation', reservationController.create) 
router.get('/reservations', reservationController.getAll)
router.get('/reservation/:id', reservationController.get)
router.put('/reservation', reservationController.update)
router.delete('/reservation/:id', reservationController.delete)

export default router