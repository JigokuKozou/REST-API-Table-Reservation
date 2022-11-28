import Person from '../model/person.js'
import Service from './service.js'

class PersonsService extends Service {
    constructor() {
        super('Persons', 'person')
    }

    async create({ name, surname }) {
        const person = new Person(name, surname)    
        
        return super.create(person)
    }
    
    async getAll() {
        return super.getAll(PersonsService.snapshotToPerson)
    }
    
    async get(id) {
        return super.get(id, PersonsService.snapshotToPerson)
    }
    
    async update({ id, name, surname }) {
        const update = await super.update({ id, name, surname }, 
            PersonsService.snapshotToPerson)

        const documentReference = update.documentReference
        const person = update.element

        person.name = name || person.name
        person.surname = surname || person.surname
        person.updatedAt = new Date()

        await documentReference.set(person.toFirestoreData(false))

        return person
    }
    
    async delete(id) {
        return super.delete(id)
    }

    static snapshotToPerson(snapshot) {
        return Person.fromFirestoreData({ id: snapshot.id, ...snapshot.data() })
    }
}

export default new PersonsService()