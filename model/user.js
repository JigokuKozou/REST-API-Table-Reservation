class User {
    constructor(id, login, password, phone) {
        this.id = id
        this.login = login
        this.password = password
        this.phone = phone
    }

    get id() { return this._id }

    set id(value) {
        if (!value) return
        this._id = value.trim()
    }

    get login() { return this._login }

    set login(value) {
        const newValue = value?.trim()
        if (User.isUndefinedOrEmpty(newValue)) {
            throw new Error('login cannot be undefined or empty')
        }

        this._login = newValue
    }

    get password() { return this._password }

    set password(value) {
        const newValue = value?.trim()
        if (User.isUndefinedOrEmpty(newValue)) {
            throw new Error('password cannot be undefined or empty')
        }

        this._password = newValue
    }

    get phone() { return this._phone }

    set phone(value) {
        const newValue = value?.trim()
        if (User.isUndefinedOrEmpty(newValue)) {
            throw new Error('phone cannot be undefined or empty')
        }

        this._phone = newValue
    }

    static isUndefinedOrEmpty(value) {
        return !value || value.length <= 0
    }

    static fromFirestoreData(data) {
        return new User(
            data.id,
            data.login,
            data.password,
            data.phone,
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