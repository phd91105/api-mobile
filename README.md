# Notes Management APIs Node.js
## Demo
### Sign Up new account
```
  POST https://api-mobile-app.herokuapp.com/api/signup
```
Body:
```json
  { "email": "example@email.com", "password": "yourpassword" }
```
### Sign in account
```
  POST https://api-mobile-app.herokuapp.com/api/signin
```
Body:
```json
  { "email": "example@email.com", "password": "yourpassword" }
```
### Forgot password
```
  POST https://api-mobile-app.herokuapp.com/api/resetpass
```
Body:
```json
  { "email": "example@email.com" }
```
### Create new note
```
  POST https://api-mobile-app.herokuapp.com/api/note
```
Headers:
```
Authorization: Bearer {your_login_token}
```
Body:
```json
  { "category": "", "title": "", "body": "", "expires_at": null, "status": 1 }
```
### Get all note
```
  GET https://api-mobile-app.herokuapp.com/api/notes
```
Headers:
```
Authorization: Bearer {your_login_token}
```
### Get by category
```
  GET https://api-mobile-app.herokuapp.com/api/notes?category={cate}
```
Headers:
```
Authorization: Bearer {your_login_token}
```
### Get note by id
```
  GET https://api-mobile-app.herokuapp.com/api/note/{id}
```
Headers:
```
Authorization: Bearer {your_login_token}
```
### Update note by id
```
  PUT https://api-mobile-app.herokuapp.com/api/note/{id}
```
Headers:
```
Authorization: Bearer {your_login_token}

```
Body:
```json
  { "category": "", "title": "", "body": "", "expires_at": null, "status": 1 }
```
### Delete note by id
```
  DELETE https://api-mobile-app.herokuapp.com/api/note/{id}
```
Headers:
```
Authorization: Bearer {your_login_token}
```
