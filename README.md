# REST-API-Table-Reservation
CRUD приложение к которому можно отправлять различные ниже пречисленные HTTP запросы для 
изменения облачной базы данных Firestore.

## Подготовка к запуску
__Приватный ключ__ необходимо помеcтить по пути `util/serviceAccount.json`.

__Установить требуемые пакеты:__
* cors
* express
* firebase-admin
* _nodemod (only for dev "npm run dev")_

>http://localhost:8080/api - базовый адрес, к которому будем добавлять перечисленные ниже прибавочные

 ## Users - пользователи
> [/users](http://localhost:8080/api/users) - прибавочный адрес для базы пользователей

    {
      "id": "id",
      "login": "login",
      "password": "password",
      "phone": "+7XXXXXXXXXX"
    }

__Требуемые поля:__
 * __Создать__, метод запроса: POST, требуется тело содержащее `{ login, password, phone }`
 * __Получить всех__, метод запроса: GET
 * __Получить по id__, метод запроса: GET, требуется параметр [/id](http://localhost:8080/api/users/id)
 * __Обновить__, метод запроса: PUT, требуется тело содержащее `{ id, ...изменяемый/(-е) параметр(-ы) }`
 * __Удалить__, метод запроса:  DEL, требуется параметр [/id](http://localhost:8080/api/users/id)

##  Reservation - бронирования
> [/reservations](http://localhost:8080/api/reservations) - прибавочный адрес для базы пользователей
> 
    {
      "id": "Id",
      "tableId": "tableId",
      "userId": "userId",
      "bookingStartDate": "dateInISO",
      "bookingEndDate": "dateInISO",
      "phone": "phone",
      "login": "login",
      "isDeleted": false/true
    }

__Требуемые поля:__
 * __Создать__ POST Body `{ tableId, userId, bookingStartDate, bookingEndDate }`
также опциональные (необязательные) поля `{ phone, login }`, isDeleted по умолчанию false
 * __Получить всех__, метод запроса: GET
 * __Получить по id__, метод запроса: GET, требуется параметр [/id](http://localhost:8080/api/reservations/id)
 * __Получить всех по userId__, метод запроса: GET, требуется параметр ``id`` [/user/id](http://localhost:8080/api/reservations/user/id)
 * __Получить всех по phone__, метод запроса: GET, требуется параметр ``phone`` [/phone/phone](http://localhost:8080/api/reservations/user/id)
 * __Получить всех по login__, метод запроса: GET, требуется параметр ``login`` [/login/login](http://localhost:8080/api/reservations/user/id)
 * __Получить всех по tableId__, метод запроса: GET, требуется параметр ``id`` [/table/id](http://localhost:8080/api/reservations/user/id)
 * __Обновить__, метод запроса: PUT, требуется тело содержащее `{ id, ...изменяемый/(-е) параметр(-ы) }`
 * __Удалить__, метод запроса:  DEL, требуется параметр [/id](http://localhost:8080/api/reservations/id)
