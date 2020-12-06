# Notes Management APIs Node.js

#### Sign Up new account
```
  POST https://api-mobile-app.herokuapp.com/api/signup
```
```json
  { "email": "example@email.com", "password": "yourpassword" }
```
#### Sign in account
```
  POST https://api-mobile-app.herokuapp.com/api/signin
```
#### Create new note
```
  POST https://api-mobile-app.herokuapp.com/api/note
```
#### Get all note
```
  GET https://api-mobile-app.herokuapp.com/api/notes
```
#### Get note by id
```
  GET https://api-mobile-app.herokuapp.com/api/note/{id}
```
#### Update note by id
```
  PUT https://api-mobile-app.herokuapp.com/api/note/{id}
```
#### Delete note by id
```
  DELETE https://api-mobile-app.herokuapp.com/api/note/{id}
```
