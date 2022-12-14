class User {
    constructor(login, password, phone, id) {
        this.login = login
        this.password = password
        this.phone = phone
        this.id = id
    }

    get id() { return this._id }

    set id(value) {
        if (!value) return
        this._id = value.trim()
    }

    get login() { return this._login }

    set login(value) {
        this._login = User.getValid(value, "login")
    }

    get password() { return this._password }

    set password(value) {
        this._password = User.getValid(value, "password")
    }

    get phone() { return this._phone }

    set phone(value) {
        this._phone = User.getValid(value, "phone")
    }

    static getValid(value, nameValue) {
        const newValue = value?.trim()

        if (User.isUndefinedOrEmpty(newValue)) {
            throw new Error(nameValue + ' cannot be undefined or empty')
        }

        return newValue
    }

    static isUndefinedOrEmpty(value) {
        return !value || value.length <= 0
    }

    static fromFirestoreData(data) {
        return new User(
            data.login,
            data.password,
            data.phone,
            data.id,
        )
    }

    static toFirestoreData(user, showId = true) {
        if (!user) throw new Error('user cannot be undefined')

        const firestoreData = {
            id: user.id,
            login: user.login,
            password: user.password,
            phone: user.phone,
        }

        if (showId === false) {
            delete firestoreData.id
        }

        return firestoreData
    }

    toFirestoreData(showId = true) {
        return User.toFirestoreData(this, showId)
    }
}

export default User