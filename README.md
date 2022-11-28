# REST-API-Table-Reservation
REST API app 

http://localhost:8080/api
  /table - столы 
    {
      "id": "id",
      "number": number,
      "countSeats": number
    }
   Number стола должен быть уникальным, если в базе уже есть такой номер, то не получится добавить/изменить номер стола
   Требуемые поля:
                  create POST Body { number, countSeats }
                  getAll GET - 
                  get GET /id
                  update PUT Body { id, ...изменяемый/(-е) параметр(-ы) }
                  delete DEL /id
  /person - люди
    {
      "id": "id",
      "name": "Name",
      "surname": "Surname",
      "createdAt": "dateInISO",
      "updatedAt": "dateInISO"
    }
  Date in ISO example: 2022-11-28T12:22:18.698Z
  Date.toISOString()
  Требуемые поля:
                  create POST Body { name, surname }
                  getAll GET - 
                  get GET /id
                  update PUT Body { id, ...изменяемый/(-е) параметр(-ы) }
                  delete DEL /id
  /reservation - бронирования
    {
      "id": "Id",
      "tableId": "tableId",
      "personId": "personId",
      "bookingStartDate": "dateInISO",
      "bookingEndDate": "dateInISO"
    }
    Требуемые поля:
                  create POST Body { tableId, personId, bookingStartDate, bookingEndDate }
                  getAll GET - 
                  get GET /id
                  update PUT Body { id, ...изменяемый/(-е) параметр(-ы) }
                  delete DEL /id
  