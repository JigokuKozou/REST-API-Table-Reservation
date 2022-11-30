import Router from 'express'
import userController from '../controller/user.controller.js'

const router = new Router()

router.post('/user', userController.create) 
router.get('/users', userController.getAll)
router.get('/user/:id', userController.get)
router.put('/user', userController.update)
router.delete('/user/:id', userController.delete)

export default router