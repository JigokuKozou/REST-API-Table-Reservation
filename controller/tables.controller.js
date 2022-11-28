import Table from '../model/table.js'
import tableService from '../service/table.service.js'

class TableController {
    async create(req, res) {
        try {
            const table = TableController.toJson(await tableService.create(req.body))

            res.json(table)
        } catch (e) {
            res.status(500).json(e.message)
            console.log(e)
        }
    }
    
    async getAll(req, res) {
        try {
            const tables = (await tableService.getAll()).map(TableController.toJson)
            
            res.json(tables)
        } catch (e) {
            res.status(500).json(e.message)
            console.log(e)
        }
    }
    
    async get(req, res) {
        try {
            const table = TableController.toJson(await tableService.get(req.params.id))

            res.json(table)
        } catch (e) {
            res.status(500).json(e.message)
            console.log(e)
        }
    }
    
    async update(req, res) {
        try {
            const table = TableController.toJson(await tableService.update(req.body))

            res.json(table)
        } catch (e) {
            res.status(500).json(e.message)
            console.log(e)
        }
    }
    
    async delete(req, res) {
        try {
            const writeResult = await tableService.delete(req.params.id)
    
            res.json(writeResult)
        } catch (e) {
            res.status(500).json(e.message)
            console.log(e)
        }
    }

    static toJson(table) {
        return Table.toFirestoreData(table)
    }
}

export default new TableController()