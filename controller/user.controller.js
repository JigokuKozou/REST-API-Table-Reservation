import User from '../model/user.js'
import userService from '../service/user.service.js'

class UserController {
    async create(req, res) {
        try {
            const user = UserController.toJson(await userService.create(req.body))

            res.json(user)
        } catch (e) {
            res.status(500).json(e.message)
            console.log(e)
        }
    }
    
    async getAll(req, res) {
        try {
            const users = (await userService.getAll()).map(UserController.toJson)
            
            res.json(users)
        } catch (e) {
            res.status(500).json(e.message)
            console.log(e)
        }
    }
    
    async get(req, res) {
        try {
            const user = UserController.toJson(await userService.get(req.params.id))

            res.json(user)
        } catch (e) {
            res.status(500).json(e.message)
            console.log(e)
        }
    }
    
    async update(req, res) {
        try {
            const user = UserController.toJson(await userService.update(req.body))

            res.json(user)
        } catch (e) {
            res.status(500).json(e.message)
            console.log(e)
        }
    }
    
    async delete(req, res) {
        try {
            const writeResult = await userService.delete(req.params.id)
    
            res.json(writeResult)
        } catch (e) {
            res.status(500).json(e.message)
            console.log(e)
        }
    }

    static toJson(person) {
        return User.toFirestoreData(person)
    }
}

export default new UserController()