import User from '../model/user.js'
import Service from './service.js'

class UserService extends Service {
    constructor() {
        super('Users', 'user')
    }

    async create({ name, surname }) {
        const user = new User(name, surname)    
        
        return super.create(user)
    }
    
    async getAll() {
        return super.getAll(UserService.snapshotToPerson)
    }
    
    async get(id) {
        return super.get(id, UserService.snapshotToPerson)
    }
    
    async update({ id, name, surname }) {
        const update = await super.update({ id, name, surname }, 
            UserService.snapshotToPerson)

        const documentReference = update.documentReference
        const user = update.element

        user.name = name || user.name
        user.surname = surname || user.surname
        user.updatedAt = new Date()

        await documentReference.set(user.toFirestoreData(false))

        return user
    }
    
    async delete(id) {
        return super.delete(id)
    }

    static snapshotToPerson(snapshot) {
        return User.fromFirestoreData({ id: snapshot.id, ...snapshot.data() })
    }
}

export default new UserService()