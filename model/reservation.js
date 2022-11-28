class Reservation {
    constructor(tableId, personId, bookingStartDate, bookingEndDate, id) {
        this.tableId = tableId
        this.personId = personId
        this.bookingStartDate = bookingStartDate
        this.bookingEndDate = bookingEndDate
        this.id = id
    }

    get tableId() { return this._tableId }

    set tableId(value) {
        if (value == undefined)
            throw new Error("tableId value cannot be undefined")

        this._tableId = value
    }

    get personId() { return this._personId }

    set personId(value) {
        if (value == undefined)
            throw new Error("personId value cannot be undefined")
        
        this._personId = value
    }

    get bookingStartDate() { return this._bookingStartDate }

    set bookingStartDate(value) {
        if (value === undefined){
            throw new Error("bookingStartDate value cannot be undefined")
        }

        if ((value instanceof Date) === false) {
            value = new Date(value)
        }

        if (value.getTime() >= this.bookingEndDate?.getTime()) {
            throw new Error("bookingEndDate cannot be more than or equal to bookingStartDate")
        }
        
        this._bookingStartDate = value
    }

    get bookingEndDate() { return this._bookingEndDate }

    set bookingEndDate(value) {
        if (value == undefined){
            throw new Error("bookingEndDate value cannot be undefined")
        }

        if ((value instanceof Date) === false) {
            value = new Date(value)
        }

        if (value <= this.bookingStartDate)
            throw new Error("bookingEndDate cannot be less than or equal to bookingStartDate")
        
        this._bookingEndDate = value
    }

    setBookingTime(bookingStartDate, bookingEndDate) {
        this._bookingStartDate = this._bookingEndDate = undefined

        this.bookingStartDate = bookingStartDate
        this.bookingEndDate = bookingEndDate
    }

    isInRangeBooking(date) {
        return this.bookingStartDate.getTime() <= date.getTime() && date.getTime() <= this.bookingEndDate.getTime()
    }

    isCrossBookingDate(other) {
        return this.isInRangeBooking(other.bookingStartDate) || this.isInRangeBooking(other.bookingEndDate)
    }

    static fromFirestoreData(data) {
        return new Reservation(
            data.tableId, 
            data.personId, 
            data.bookingStartDate.toDate(), 
            data.bookingEndDate.toDate(),
            data.id
        )
    }

    static toFirestoreData(reservation, showId = true) {
        if (!reservation) throw new Error('reservation cannot be undefined')

        const firestoreData = {
            id: reservation.id,
            tableId: reservation.tableId,
            personId: reservation.personId,
            bookingStartDate: reservation.bookingStartDate,
            bookingEndDate: reservation.bookingEndDate
        }

        if (showId === false) {
            delete firestoreData.id
        }

        return firestoreData
    }

    toFirestoreData(showId = true) {
       return Reservation.toFirestoreData(this, showId)
    }
}

export default Reservation