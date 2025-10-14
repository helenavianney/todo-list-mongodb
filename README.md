# Todo List API

RESTful API untuk aplikasi Todo List menggunakan Node.js, Express.js, dan MongoDB dengan fitur authentication dan authorization.

## Features
- ✅ User Registration & Login
- ✅ JWT Authentication
- ✅ Password Hashing (bcrypt)
- ✅ CRUD Operations untuk Todos
- ✅ User Assignment untuk Todos
- ✅ Proper HTTP Status Codes
- ✅ Error Handling

## Installation

```bash
npm install
npm start
```

## Base URL
```
http://localhost:3000
```

## API Endpoints

### Users

#### Create User (Register)
- **POST** `/api/users`
- **Authentication:** Not Required
- **Body:**
```json
{
  "username": "lily_flower",
  "password": "password123"
}
```
- **Response (201):**
```json
{
  "message": "User created successfully",
  "data": {
    "_id": "user_id",
    "username": "lily_flower"
  }
}
```

#### Login
- **POST** `/api/users/login`
- **Authentication:** Not Required
- **Body:**
```json
{
  "username": "lily_flower",
  "password": "password123"
}
```
- **Response (200):**
```json
{
  "message": "Login successful",
  "data": {
    "token": "jwt_token_here",
    "user": {
      "_id": "user_id",
      "username": "lily_flower"
    }
  }
}
```

#### Get All Users
- **GET** `/api/users`
- **Authentication:** Required
- **Response (200):**
```json
{
  "message": "get all users",
  "data": [
    {
      "_id": "user_id",
      "username": "lily_flower"
    }
  ]
}
```

#### Get User by ID
- **GET** `/api/users/:id`
- **Authentication:** Required
- **Response (200):**
```json
{
  "message": "get user by id",
  "data": {
    "_id": "user_id",
    "username": "lily_flower"
  }
}
```

### Todos

#### Get All Todos
- **GET** `/api/todos`
- **Authentication:** Required
- **Response (200):**
```json
{
  "message": "get all todos",
  "data": [
    {
      "_id": "todo_id",
      "title": "Complete project",
      "isCompleted": false,
      "assignedTo": {
        "_id": "user_id",
        "username": "lily_flower"
      },
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

#### Create Todo
- **POST** `/api/todos`
- **Authentication:** Required
- **Body:**
```json
{
  "title": "Complete project",
  "isCompleted": false,
  "assignedTo": "user_id"
}
```
- **Response (201):**
```json
{
  "message": "Todo created successfully",
  "data": {
    "_id": "todo_id",
    "title": "Complete project",
    "isCompleted": false,
    "assignedTo": "user_id",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### Get Todo by ID
- **GET** `/api/todos/:id`
- **Authentication:** Required
- **Response (200):**
```json
{
  "message": "get todo by id",
  "data": {
    "_id": "todo_id",
    "title": "Complete project",
    "isCompleted": false,
    "assignedTo": {
      "_id": "user_id",
      "username": "lily_flower"
    },
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### Update Todo
- **PUT** `/api/todos/:id`
- **Authentication:** Required
- **Body:**
```json
{
  "title": "Updated title",
  "isCompleted": true,
  "assignedTo": "user_id"
}
```
- **Response (200):**
```json
{
  "message": "Todo updated successfully",
  "data": {
    "_id": "todo_id",
    "title": "Updated title",
    "isCompleted": true,
    "assignedTo": {
      "_id": "user_id",
      "username": "lily_flower"
    },
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T12:00:00.000Z"
  }
}
```

#### Delete Todo
- **DELETE** `/api/todos/:id`
- **Authentication:** Required
- **Response (200):**
```json
{
  "message": "Todo deleted successfully",
  "data": {
    "_id": "todo_id",
    "title": "Deleted todo",
    "isCompleted": false,
    "assignedTo": "user_id"
  }
}
```

#### Delete All Todos
- **DELETE** `/api/todos`
- **Authentication:** Required
- **Response (200):**
```json
{
  "message": "All todos deleted successfully",
  "data": {
    "deletedCount": 5
  }
}
```

## Authentication

All endpoints except `/api/users` (register) and `/api/users/login` require authentication.

**Header Required:**
```
Authorization: Bearer <jwt_token>
```

## Usage Example

1. **Register a new user:**
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"username":"lily_flower","password":"password123"}'
```

2. **Login to get token:**
```bash
curl -X POST http://localhost:3000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"username":"lily_flower","password":"password123"}'
```

3. **Create a todo (with token):**
```bash
curl -X POST http://localhost:3000/api/todos \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your_jwt_token>" \
  -d '{"title":"Complete project","isCompleted":false}'
```

## Error Responses

### 400 Bad Request
```json
{
  "message": "Title is required"
}
```

### 401 Unauthorized
```json
{
  "message": "Access denied. No token provided."
}
```

### 404 Not Found
```json
{
  "message": "Todo not found"
}
```

### 409 Conflict
```json
{
  "message": "Username already exists"
}
```

### 500 Server Error
```json
{
  "message": "Server error",
  "error": "Error details"
}
```

## Response Status Codes

- **200** - Success (GET, PUT, DELETE)
- **201** - Created (POST)
- **400** - Bad Request (Missing required fields)
- **401** - Unauthorized (Invalid/missing token)
- **404** - Not Found (Resource not found)
- **409** - Conflict (Username already exists)
- **500** - Internal Server Error

## Database Schema

### User Schema
```javascript
{
  username: { type: String, required: true },
  password: { type: String, required: true }
}
```

### Todo Schema
```javascript
{
  title: { type: String, required: true },
  isCompleted: { type: Boolean, default: false },
  assignedTo: { type: ObjectId, ref: 'Users' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}
```

## Dependencies
- express: ^5.1.0
- mongoose: ^8.19.1
- cors: ^2.8.5
- jsonwebtoken: ^9.0.2
- bcryptjs: ^2.4.3
- nodemon: ^3.1.10 (dev)