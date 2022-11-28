import Person from '../model/person.js'
import personService from '../service/person.service.js'

class PersonController {
    async create(req, res) {
        try {
            const person = PersonController.toJson(await personService.create(req.body))

            res.json(person)
        } catch (e) {
            res.status(500).json(e.message)
            console.log(e)
        }
    }
    
    async getAll(req, res) {
        try {
            const persons = (await personService.getAll()).map(PersonController.toJson)
            
            res.json(persons)
        } catch (e) {
            res.status(500).json(e.message)
            console.log(e)
        }
    }
    
    async get(req, res) {
        try {
            const person = PersonController.toJson(await personService.get(req.params.id))

            res.json(person)
        } catch (e) {
            res.status(500).json(e.message)
            console.log(e)
        }
    }
    
    async update(req, res) {
        try {
            const person = PersonController.toJson(await personService.update(req.body))

            res.json(person)
        } catch (e) {
            res.status(500).json(e.message)
            console.log(e)
        }
    }
    
    async delete(req, res) {
        try {
            const writeResult = await personService.delete(req.params.id)
    
            res.json(writeResult)
        } catch (e) {
            res.status(500).json(e.message)
            console.log(e)
        }
    }

    static toJson(person) {
        return Person.toFirestoreData(person)
    }
}

export default new PersonController()