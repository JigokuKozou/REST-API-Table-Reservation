import User from '../model/user.js'
import Service from './service.js'

class UserService extends Service {
    constructor() {
        super('Users', 'user')
    }

    async create(requestedUser) {
        const user = User.fromFirestoreData(requestedUser)

        if (await this.isPhoneExists(user.phone)) {
            throw new Error("User's phone is already exists")
        }

        return super.create(user)
    }
    
    async getAll() {
        return super.getAll(UserService.snapshotToUser)
    }
    
    async get(id) {
        return super.get(id, UserService.snapshotToUser)
    }
    
    async update({ id, login, password, phone }) {
        const update = await super.update({ id, login, password, phone }, 
            UserService.snapshotToUser)

        const documentReference = update.documentReference
        const user = update.element

        user.login = login || user.login
        user.password = password || user.password
        user.phone = phone || user.phone

        await documentReference.set(user.toFirestoreData(false))

        return user
    }
    
    async delete(id) {
        return super.delete(id)
    }

    static snapshotToUser(snapshot) {
        return User.fromFirestoreData({ id: snapshot.id, ...snapshot.data() })
    }

    async isPhoneExists(phone) {
        const snapshots = await this.database.where('phone', '==', phone).get()

        return snapshots?.docs?.length > 0
    }
}

export default new UserService()