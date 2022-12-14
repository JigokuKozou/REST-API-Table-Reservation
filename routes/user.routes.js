import Router from 'express'
import userController from '../controller/user.controller.js'

const router = new Router()

const nameDatabase = "users"

router.post(`/${nameDatabase}`, userController.create)
router.get(`/${nameDatabase}`, userController.getAll)
router.get(`/${nameDatabase}/:id`, userController.get)
router.put(`/${nameDatabase}`, userController.update)
router.delete(`/${nameDatabase}/:id`, userController.delete)

export default router