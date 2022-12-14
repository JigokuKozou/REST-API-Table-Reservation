import User from "./user.js";

class Reservation {
    constructor(tableId, userId, bookingStartDate, bookingEndDate, phone, login, isDeleted, id) {
        this.tableId = tableId
        this.userId = userId
        this.bookingStartDate = bookingStartDate
        this.bookingEndDate = bookingEndDate
        this.phone = phone
        this.login = login
        this.isDeleted = isDeleted
        this.id = id
    }

    get tableId() { return this._tableId }

    set tableId(value) {
        if (value == undefined)
            throw new Error("tableId value cannot be undefined")

        this._tableId = Number(value)
    }

    get userId() { return this._userId }

    set userId(value) {
        if (value == undefined)
            throw new Error("userId value cannot be undefined")
        
        this._userId = value
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

    get login() { return this._login }

    set login(value) {
        this._login = User.getValid(value, "login")
    }

    get phone() { return this._phone }

    set phone(value) {
        this._phone = User.getValid(value, "phone")
    }

    setBookingTime(bookingStartDate, bookingEndDate) {
        this._bookingStartDate = this._bookingEndDate = undefined

        this.bookingStartDate = bookingStartDate
        this.bookingEndDate = bookingEndDate
    }

    isDateInRangeBooking(date) {
        return this.bookingStartDate.getTime() <= date.getTime() && date.getTime() <= this.bookingEndDate.getTime()
    }

    isDateRangeInRangeBooking(start, end) {
        return this.isDateInRangeBooking(start) || this.isDateInRangeBooking(end)
    }

    isCrossBookingDate(other) {
        return this.isDateRangeInRangeBooking(other.bookingStartDate, other.bookingEndDate) ||
            other.isDateRangeInRangeBooking(this.bookingStartDate, this.bookingEndDate)
    }

    static fromFirestoreData(data) {
        return new Reservation(
            data.tableId, 
            data.userId, 
            data.bookingStartDate.toDate(), 
            data.bookingEndDate.toDate(),
            data.phone,
            data.login,
            data.isDeleted,
            data.id
        )
    }

    static toFirestoreData(reservation, showId = true) {
        if (!reservation) throw new Error('reservation cannot be undefined')

        const firestoreData = {
            id: reservation.id,
            tableId: reservation.tableId,
            userId: reservation.userId,
            bookingStartDate: reservation.bookingStartDate,
            bookingEndDate: reservation.bookingEndDate,
            phone: reservation.phone,
            login: reservation.login,
            isDeleted: reservation.isDeleted
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