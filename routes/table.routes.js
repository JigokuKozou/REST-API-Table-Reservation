import Router from 'express'
import tableController from '../controller/table.controller.js'

const router = new Router()

router.post('/table', tableController.create) 
router.get('/tables', tableController.getAll)
router.get('/table/:id', tableController.get)
router.put('/table', tableController.update)
router.delete('/table/:id', tableController.delete)

export default router