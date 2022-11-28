class Table {
    constructor(number, countSeats, id) {
        this.number = number
        this.countSeats = countSeats
        this.id = id
    }

    get number() { return this._number }

    set number(value) {
        if (value == undefined || value <= 0) {
            throw new Error("number value cannot be less than or equal to zero")
        }

        this._number = value
    }

    get countSeats() { return this._countSeats }

    set countSeats(value) {
        if (value == undefined || value <= 0) {
            throw new Error("countSeats value cannot be less than or equal to zero")
        }
        
        this._countSeats = value
    }

    static fromFirestoreData(data) {
        return new Table(
            data.number,
            data.countSeats,
            data.id
        )
    }

    static toFirestoreData(table, showId = true) {
        if (!table) throw new Error('table cannot be undefined')

        const firestoreData = {
            id: table.id,
            number: table.number,
            countSeats: table.countSeats
        }

        if (showId === false) {
            delete firestoreData.id
        }

        return firestoreData
    }

    toFirestoreData(showId = true) {
       return Table.toFirestoreData(this, showId)
    }
}

export default Table