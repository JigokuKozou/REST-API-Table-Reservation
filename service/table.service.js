import Table from '../model/table.js'
import Service from './service.js'

class TableService extends Service {
    constructor() {
        super('Tables', 'table')
    }

    async create({ number, countSeats }) {
        const table = new Table(number, countSeats)
        if (await this.isTableNumberExist(number)) {
            throw Error(`Table number ${number} already exists`)
        }

        return super.create(table)
    }
    
    async getAll() {
        return super.getAll(TableService.snapshotToTable)
    }
    
    async get(id) {
        return super.get(id, TableService.snapshotToTable)
    }
    
    async update({ id, number, countSeats }) {
        const update = await super.update({ id, number, countSeats }, 
            TableService.snapshotToTable)

        const documentReference = update.documentReference
        const table = update.element
        
        if (number && table.number != number  && await this.isTableNumberExist(number)) {
            throw Error(`Table number ${number} already exists`)
        }

        table.number = number || table.number
        table.countSeats = countSeats || table.countSeats

        await documentReference.set(table.toFirestoreData(false))

        return table
    }
    
    async delete(id) {
        return super.delete(id)
    }

    async isTableNumberExist(number) {
        const snapshot = await this.database.where('number', '==', number).get()

        return snapshot?.docs?.length > 0
    }

    static snapshotToTable(snapshot) {
        return Table.fromFirestoreData({ id: snapshot.id, ...snapshot.data() })
    }
}

export default new TableService()