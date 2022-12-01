# REST-API-Table-Reservation
Приложение запускающее сервер к которому можно отправлять различные ниже пречисленные http запросы для изменения облачной базы данных firestore

## Подготовка к запуску
__Приватный ключ__ необходимо помеcтить по пути __util/serviceAccount.json__

Установить требуемые пакеты:
* cors
* express
* firebase-admin
* nodemod (only for dev "npm run dev")

>http://localhost:8080/api - базовый адрес, к которому будем добавлять перечисленные ниже прибавочные


  ## Tables - столы
    {
      "id": "id",
      "number": number,
      "countSeats": number
    }

   >Number стола должен быть уникальным, если в базе уже есть такой номер, то не получится добавить/изменить номер стола.

__Требуемые поля:__
 * create POST [/table](http://localhost:8080/api/table) Body `{ number, countSeats }`
 * getAll GET [/tables](http://localhost:8080/api/tables) 
 * get GET [/table/id](http://localhost:8080/api/table/id)
 * update PUT [/table](http://localhost:8080/api/table) Body `{ id, ...изменяемый/(-е) параметр(-ы) }`
 * delete DEL [/table/id](http://localhost:8080/api/table/id)

 ## Users - пользователи
    {
      "id": "id",
      "login": "login",
      "password": "password",
      "phone": "+7XXXXXXXXXX"
    }

__Требуемые поля:__
 * create POST [/user](http://localhost:8080/api/user) Body `{ number, countSeats }`
 * getAll GET [/users](http://localhost:8080/api/users) 
 * get GET [/user/id](http://localhost:8080/api/user/id)
 * update PUT [/user](http://localhost:8080/api/user) Body `{ id, ...изменяемый/(-е) параметр(-ы) }`
 * delete DEL [/user/id](http://localhost:8080/api/user/id)

##  Reservation - бронирования
    {
      "id": "Id",
      "tableId": "tableId",
      "userId": "userId",
      "bookingStartDate": "dateInISO",
      "bookingEndDate": "dateInISO"
    }

__Требуемые поля:__
 * create POST [/reservation](http://localhost:8080/api/reservation) Body `{ tableId, userId, bookingStartDate, bookingEndDate }`
 * getAll GET [/reservations](http://localhost:8080/api/reservations)
 * get GET [/reservation/id](http://localhost:8080/api/reservation/id)
 * update PUT [/reservation](http://localhost:8080/api/reservation) Body `{ id, ...изменяемый/(-е) параметр(-ы) }`
 * delete DEL [/reservation/id](http://localhost:8080/api/reservation/id)
