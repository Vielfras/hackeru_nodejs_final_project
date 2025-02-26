# BCards
##### HackerU Node.js Final Project 


## General Overview
This project involves creating a **REST API** using **Node.js** to enhance understanding of code, modules, files, and directories that constitute such a project.

### Key Technologies and Libraries
- **Database**: MongoDB
- **Framework**: Express.js
- **Libraries**: mongoose, bcryptjs, joi, jsonwebtoken, config, morgan, cors, chalk

## Getting Started
1. Clone repo
2. Run `npm install`
3. Create a `logs` folder.
4. Create an .env file with the following fields:
```
IP="<desired_ipv4>"
#Port must be a number in range 1025 - 65535
PORT = <desired_port> 

LOG_FILE_PATH = "your_file_path"

JWT_SECRET = "secret_here"
JWT_EXPIRES_IN = "10m" 

# Example:
# MONGODB_URI_DEV = "mongodb://localhost:27017/bcards_01"
MONGODB_URI_DEV = "mongodb://<path_to_your_db>"
MONGODB_URI_PROD = "mongodb://<path_to_your_db>"
```

5. **[OPTIONAL]** Seed you project by running `node seed.js` with data found in `./data/data.js`
   - This may require setting ENV VARIABLE manually or updating packages.json with seed.js instead of server.js and then running the next step.
6. To start the server run:
`npm run dev` for development environment or `npm run prod` for production environment.

---

## Server API

### 1. User Endpoints
- **Register User**: `POST /users`
- **Login User**: `POST /users/login` (3 failed attempts will block User for 24h)
- **Get All Users**: `GET /users` (Admin only)
- **Get User by ID**: `GET /users/:id` (Admin or User)
- **Edit User**: `PUT /users/:id` (Registered User)
- **Change Business Status**: `PATCH /users/:id` (Admin or User)
- **Delete User**: `DELETE /users/:id` (Admin or the user)

### 2. Cards Endpoints
- **Get All Cards**: `GET /cards`
- **Get User Cards**: `GET /cards/my-cards` (Registered User)
- **Get Card by ID**: `GET /cards/:id`
- **Create New Card**: `POST /cards` (Business User)
- **Edit Card**: `PUT /cards/:id` (Admin or card creator)
- **Like Card**: `PATCH /cards/:id` (Registered User)
- **Delete Card**: `DELETE /cards/:id` (Admin or card creator)

<br>

---

# Version 1.0.0:

## 1. User Endpoints
1. **Register User**:
   - [X] Create a POST route `/users` for user registration.
   - [X] Encrypt the user's password before saving.

2. **Login User**:
   - [X] Create a POST route `/users/login` for user login.
   - [X] Validate the user's password and generate a JWT token.

3. **Get All Users**:
   - [X] Create a GET route `/users` to fetch all users **(Admin access only)**.

4. **Get User by ID**:
   - [X] Create a GET route `/users/:id` to fetch a user by ID (accessible by the user or admin).

5. **Edit User**:
   - [X] Create a PUT route `/users/:id` to edit user details (accessible by the user).

6. **Change Business Status**:
   - [X] Create a PATCH route `/users/:id` to change business status (accessible by the user).

7. **Delete User**:
   - [X] Create a DELETE route `/users/:id` to delete a user (accessible by the user or admin).

## 2. Cards Endpoints
1. **Get All Cards**:
   - [X] Create a GET route `/cards` to fetch all cards.

2. **Get User Cards**:
   - [X] Create a GET route `/cards/my-cards` to fetch cards created by the logged-in user.

3. **Get Card by ID**:
   - [X] Create a GET route `/cards/:id` to fetch a card by ID.

4. **Create New Card**:
   - [X] Create a POST route `/cards` for business users to create new cards.
   - [X] Prevent duplicate cards from being created.

5. **Edit Card**:
   - [X] Create a PUT route `/cards/:id` to edit a card (accessible by the card creator).

6. **Like Card**:
   - [X] Create a PATCH route `/cards/:id` to like a card (accessible by registered users).

7. **Delete Card**:
   - [X] Create a DELETE route `/cards/:id` to delete a card (accessible by the card creator or admin).

### 3. Logger
- [X] Implement a logger using `morgan` to log all HTTP requests with detailed information.
   - Request method, URL, status, and response time.

### 4. Chalk
- [X] Use `chalk` to add colors to console outputs for better readability.

### 5. CORS
- [X] Enable CORS to allow requests from specific origins.

### 6. JSON Handling
- [X] Ensure the application can handle JSON in HTTP requests.

### 7. Public Directory
- [X] Route unhandled requests to the public directory and return a 404 error for missing files.

### 8. Environments
- [X] Configure the application to support both local and cloud (MongoDB Atlas) environments.

### 9. Error Handling
- [X] Implement error handling to return appropriate HTTP status and error messages.

### 10. Joi Validation
- [X] Use `joi` to validate incoming objects from the client and handle validation errors.

### 11. Bcryptjs
- [X] Encrypt passwords using `bcryptjs` before storing them and verify passwords during login.

### 12. JWT Token
- [X] Use `jsonwebtoken` to create and validate JWT tokens containing user information.

### 13. Initial Data
- [X] Seed the database with initial data including three user types and three business cards.

### 14. Mongoose Models
- [X] Create `Users` and `Cards` models using `mongoose` with the appropriate schema.

<br>

---

### Bonus Tasks
1. **Admin Change Business Number**:
   - [ ] Allow admins to change business numbers ensuring they are unique.

2. **File Logger**:
   - [ ] Create a file logger for requests with status codes 400 and above.
   - [ ] A new file should be created for every day, with the name of the file the date.

3. **Google API Integration**:
   - [ ] Allow Google API-based registration and login for non-admin and non-business users.

4. **User Blocking**:
   - [X] Implement a mechanism to block users for 24 hours after three failed login attempts with incorrect password.



### Final Requirements Before Submitting:
- [X] Remove redundant comments
- [X] Remove redundant console.logs
- [X] Refactor where relevant
