import db from '../util/admin.js'

class Service {
    constructor(collectionName, elementName) {
        this.database = db.collection(collectionName)
        this.elementName = elementName
    }

    async create(element) {
        const documentReference = await this.database.add(element.toFirestoreData(false))

        element.id = documentReference.id
        
        return element
    }
    
    async getAll(formatter = (snapshot) => snapshot) {
        const snapshots = await this.database.get()
        const elements = snapshots.docs.map(formatter)
 
        return elements;
    }
    
    async get(id, formatter = (snapshot) => snapshot) {
        if (!id) {
            throw new Error(`Missing ${this.elementName} "id"`)
        }
        
        const snapshot = await this.database.doc(id).get()
        if (snapshot.exists === false) {
            throw new Error(`${Service.ucFirst(this.elementName)} with this "id" was not found`)
        }

        return formatter(snapshot)
    }
    
    async update(body, formatter = (snapshot) => snapshot) {
        if (!body.id) {
            throw new Error(`Missing ${this.elementName} "id"`)
        }

        const keys = Object.keys(body).filter(key => body[key] !== undefined)
        if (keys.length < 2) {
            throw new Error('Missing parameter to change')
        }

        const documentReference = this.database.doc(body.id)
        const snapshot = await documentReference.get()
        if (snapshot.exists === false) {
            throw new Error(`${Service.ucFirst(this.elementName)} with this "id" was not found`)
        }

        const element = formatter(snapshot)
        
        if (Service.hasSameValues(body, JSON.stringify(element), keys)) {
            throw new Error('Missing parameter to change')
        }

        return { documentReference, element }
    }
    
    async delete(id) {
        if (!id) {
            throw new Error(`Missing ${this.elementName} "id"`)
        }

        const snapshot = await this.database.doc(id).get()
        if (snapshot.exists === false) {
            throw new Error(`${Service.ucFirst(this.elementName)} with this "id" was not found`)
        }

        return this.database.doc(id).delete()
    }

    static ucFirst(str) {
        if (!str) return str;
        return str[0].toUpperCase() + str.slice(1);
    }

    static hasSameValues(body, element, keys) {
        return !keys.some(key => {
            if (element[key] instanceof body[key].className) {
                body[key] != element[key]
            }
        });
    }
}

export default Service