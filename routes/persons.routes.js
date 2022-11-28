import Router from 'express'
import personController from '../controller/persons.controller.js'

const router = new Router()

router.post('/person', personController.create) 
router.get('/person', personController.getAll)
router.get('/person/:id', personController.get)
router.put('/person', personController.update)
router.delete('/person/:id', personController.delete)

export default router