# Node.js Project Summary

## General Overview
This project involves creating a **REST API** using **Node.js** to enhance understanding of code, modules, files, and directories that constitute such a project.

## Key Technologies and Libraries
- **Database**: MongoDB
- **Framework**: Express.js
- **Libraries**: mongoose, bcryptjs, joi, jsonwebtoken, config, morgan, cors, chalk

## Project Submission
- Upload the project to Git without `node_modules`.
- Include a `ReadMe.md` file explaining the project, its content, functionality, and usage.

## General Requirements
- Maintain clean and organized code by removing unnecessary `console.log` and comments.
- Write meaningful function and variable names.
- Break the project into modules, each containing no more than 200 lines of code.
- Adhere to code conventions.

## Technical Requirements

### 1. User Endpoints
- **Register User**: `POST /users`
- **Login User**: `POST /users/login`
- **Get All Users**: `GET /users` (Admin only)
- **Get User by ID**: `GET /users/:id` (Admin or the user)
- **Edit User**: `PUT /users/:id` (The user)
- **Change Business Status**: `PATCH /users/:id` (The user)
- **Delete User**: `DELETE /users/:id` (Admin or the user)

### 2. Cards Endpoints
- **Get All Cards**: `GET /cards`
- **Get User Cards**: `GET /cards/my-cards` (The user)
- **Get Card by ID**: `GET /cards/:id`
- **Create New Card**: `POST /cards` (Business user)
- **Edit Card**: `PUT /cards/:id` (The card creator)
- **Like Card**: `PATCH /cards/:id` (Registered user)
- **Delete Card**: `DELETE /cards/:id` (Admin or the card creator)

### 3. Logger
- Use `morgan` to log all requests with details including request method, URL, status, and response time.

### 4. Chalk
- Use `chalk` to colorize console prints.

### 5. CORS
- Allow requests from authorized HTTP origins using `cors`.

### 6. JSON
- Allow handling of JSON requests.

### 7. Public Directory
- Route requests not handled by the application to the public directory and return a 404 error if the file is not found.

### 8. Environments
- Support local and cloud environments using MongoDB Atlas.

### 9. Error Handling
- Return appropriate HTTP status and error messages for unauthorized access or invalid data.

### 10. Joi
- Validate client-side objects using `joi` and return status and error messages for invalid objects.

### 11. Bcryptjs
- Encrypt user passwords before storing them in MongoDB and validate during login.

### 12. Jsonwebtoken
- Generate a JWT token containing user information such as `_id`, `isBusiness`, and `isAdmin`.

### 13. Initial Data
- Create initial data with three user types: regular user, business user, and admin, along with three business cards.

### 14. Mongoose
- Use `mongoose` to create models for `Users` and `Cards` with appropriate schema as outlined in the appendices.

## Bonus Features
1. Allow admins to change business numbers ensuring uniqueness.
2. Create a file logger for requests with status code 400+ logging date, status code, and error message.
3. Integrate Google API for non-admin and non-business user registration and login.
4. Block users for 24 hours after three failed login attempts with incorrect password.

---

# Actionable Tasks

## User Endpoints
1. **Register User**:
   - Create a POST route `/users` for user registration.
   - Encrypt the user's password before saving.

2. **Login User**:
   - Create a POST route `/users/login` for user login.
   - Validate the user's password and generate a JWT token.

3. **Get All Users**:
   - Create a GET route `/users` to fetch all users (Admin access only).

4. **Get User by ID**:
   - Create a GET route `/users/:id` to fetch a user by ID (accessible by the user or admin).

5. **Edit User**:
   - Create a PUT route `/users/:id` to edit user details (accessible by the user).

6. **Change Business Status**:
   - Create a PATCH route `/users/:id` to change business status (accessible by the user).

7. **Delete User**:
   - Create a DELETE route `/users/:id` to delete a user (accessible by the user or admin).

## Cards Endpoints
1. **Get All Cards**:
   - Create a GET route `/cards` to fetch all cards.

2. **Get User Cards**:
   - Create a GET route `/cards/my-cards` to fetch cards created by the logged-in user.

3. **Get Card by ID**:
   - Create a GET route `/cards/:id` to fetch a card by ID.

4. **Create New Card**:
   - Create a POST route `/cards` for business users to create new cards.

5. **Edit Card**:
   - Create a PUT route `/cards/:id` to edit a card (accessible by the card creator).

6. **Like Card**:
   - Create a PATCH route `/cards/:id` to like a card (accessible by registered users).

7. **Delete Card**:
   - Create a DELETE route `/cards/:id` to delete a card (accessible by the card creator or admin).

### Logger
- Implement a logger using `morgan` to log all HTTP requests with detailed information.

### Chalk
- Use `chalk` to add colors to console outputs for better readability.

### CORS
- Enable CORS to allow requests from specific origins.

### JSON Handling
- Ensure the application can handle JSON in HTTP requests.

### Public Directory
- Route unhandled requests to the public directory and return a 404 error for missing files.

### Environments
- Configure the application to support both local and cloud (MongoDB Atlas) environments.

### Error Handling
- Implement error handling to return appropriate HTTP status and error messages.

### Joi Validation
- Use `joi` to validate incoming objects from the client and handle validation errors.

### Bcryptjs
- Encrypt passwords using `bcryptjs` before storing them and verify passwords during login.

### JWT Token
- Use `jsonwebtoken` to create and validate JWT tokens containing user information.

### Initial Data
- Seed the database with initial data including three user types and three business cards.

### Mongoose Models
- Create `Users` and `Cards` models using `mongoose` with the appropriate schema.

### Bonus Tasks
1. **Admin Change Business Number**:
   - Allow admins to change business numbers ensuring they are unique.

2. **File Logger**:
   - Create a file logger for requests with status codes 400 and above.

3. **Google API Integration**:
   - Allow Google API-based registration and login for non-admin and non-business users.

4. **User Blocking**:
   - Implement a mechanism to block users for 24 hours after three failed login attempts with incorrect password.
