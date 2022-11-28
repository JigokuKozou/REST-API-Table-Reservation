class Person {
    constructor(name, surname, id, createdAt, updatedAt) {
        this.name = name
        this.surname = surname

        this.id = id

        if (!createdAt || !updatedAt) {
            const dateNow = new Date()
            
            createdAt = dateNow
            updatedAt = dateNow
        }

        this.createdAt = createdAt
        this.updatedAt = updatedAt
    }

    get id() { return this._id }

    set id(value) {
        if (!value) return
        this._id = value.trim()
    }


    get name() { return this._name }

    set name(value) {
        value = value.trim()
        if (Person.isUndefinedOrEmpty(value)) {
            throw new Error('name cannot be undefined or empty')
        }

        this._name = value
    }

    get surname() { return this._surname }

    set surname(value) {
        value = value.trim()
        if (Person.isUndefinedOrEmpty(value)) {
            throw new Error('surname cannot be undefined or empty')
        }

        this._surname = value
    }

    get createdAt() { return this._createdAt }

    set createdAt(value) {
        if ((value instanceof Date) == false) {
            value = new Date(value)
        }
        
        if (!value || value.getTime() > this.updatedAt?.getTime())
            throw new Error("createdAt cannot be more than updatedAt")
        this._createdAt = value
    }
    
    get updatedAt() { return this._updatedAt }

    set updatedAt(value) {
        if ((value instanceof Date) == false) {
            value = new Date(value)
        }
        
        if (!value || value.getTime() < this.createdAt.getTime())
            throw new Error("updatedAt cannot be less than createdAt")
        this._updatedAt = value
    }

    static isUndefinedOrEmpty(value) {
        return !value || value.length <= 0
    }

    static fromFirestoreData(data) {
        return new Person(
            data.name, 
            data.surname, 
            data.id, 
            data.createdAt.toDate(), 
            data.updatedAt.toDate()
        )
    }

    static toFirestoreData(person, showId = true) {
        if (!person) throw new Error('person cannot be undefined')

        const firestoreData = {
            id: person.id,
            name: person.name,
            surname: person.surname,
            createdAt: person.createdAt,
            updatedAt: person.updatedAt
        }

        if (showId === false) {
            delete firestoreData.id
        }

        return firestoreData
    }

    toFirestoreData(showId = true) {
        return Person.toFirestoreData(this, showId)
    }
}

export default Person