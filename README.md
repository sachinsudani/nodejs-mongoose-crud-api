# nodejs-mongoose-crud-api

This is a simple CRUD API for posts with user authentication and JWT token. The user can register and login to the system. The user can create, read, update and delete posts. The user can only perform actions on their own posts.

## Features

- User registration
- User login with passport JWT token
- Create post with title, body, active/inactive, latitude and longitude
- Read post of the authenticated user
- Update post of the authenticated user
- Delete post of the authenticated user
- Get count of active and inactive posts

## Technologies

- Node.js
- Express.js
- MongoDB
- Mongoose
- Passport
- JWT
- Bcrypt
- Zod (for validation)
- Nodemon (for development)
- Typescript (for type checking)
- Dotenv (for environment variables)

## Setup

1. Clone the repository
2. Install dependencies

```bash
npm install
```

3. Create a `.env` file in the root directory and add the following environment variables

```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/express_mongodb
JWT_SECRET=secret
```

4. Start the server

```bash
npm start
```

The server will start at `http://localhost:3000`

## API Endpoints

### User

- POST `/api/users/auth/register/v1` - Register a new user
- POST `/api/users/auth/login/v1` - Login user and get JWT token

### Post

- POST `/api/posts` - Create a new post
- GET `/api/posts` - Get all posts of the authenticated user
- PUT `/api/posts/:id` - Update a post
- DELETE `/api/posts/:id` - Delete a post

### Dashboard

- GET `/api/posts/dashboard` - Get count of active and inactive posts
