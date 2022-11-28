# REST-API-Table-Reservation
_REST API app_ 
__Приватный ключ__ необходимо помемтить по пути __util/serviceAccount.json__

http://localhost:8080/api
  ## /table - столы 
    {
      "id": "id",
      "number": number,
      "countSeats": number
    }

   >Number стола должен быть уникальным, если в базе уже есть такой номер, то не получится добавить/изменить номер стола.

__Требуемые поля:__
 * create POST Body { number, countSeats }
 * getAll GET [/](http://localhost:8080/api/table) 
 * get GET [/id](http://localhost:8080/api/table/id)
 * update PUT Body { id, ...изменяемый/(-е) параметр(-ы) }
 * delete DEL [/id](http://localhost:8080/api/table/id)

 ## /person - люди
    {
      "id": "id",
      "name": "Name",
      "surname": "Surname",
      "createdAt": "dateInISO",
      "updatedAt": "dateInISO"
    }
  __Date in ISO__
  >example: 2022-11-28T12:22:18.698Z
  Date.toISOString()

__Требуемые поля:__
 * create POST Body { number, countSeats }
 * getAll GET [/](http://localhost:8080/api/person)
 * get GET [/id](http://localhost:8080/api/person)
 * update PUT Body { id, ...изменяемый/(-е) параметр(-ы) }
 * delete DEL [/id](http://localhost:8080/api/person/id)

##  /reservation - бронирования
    {
      "id": "Id",
      "tableId": "tableId",
      "personId": "personId",
      "bookingStartDate": "dateInISO",
      "bookingEndDate": "dateInISO"
    }

__Требуемые поля:__
 * create POST Body _{ tableId, personId, bookingStartDate, bookingEndDate }_
 * getAll GET [/](http://localhost:8080/api/reservation)
 * get GET [/id](http://localhost:8080/api/reservation/id)
 * update PUT Body { id, ...изменяемый/(-е) параметр(-ы) }
 * delete DEL [/id](http://localhost:8080/api/reservation/id)
