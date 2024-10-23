# Floww.ai

This project is a basic API built using **Node.js**, **Express**, and **MongoDB** for managing authentication and financial transactions. It includes user registration, login, and the ability to create, view, update, and delete transactions. Transactions can be categorized, filtered, and summarized with various reports.

## Features
- **User Authentication**: Register and login users using **JWT**.
- **Transaction Management**: Add, view, edit, and delete transactions.
- **Reports**: Generate monthly transaction reports and view a summary of income, expenses, and balance.
- **Pagination**: Fetch paginated results for large datasets.

## Prerequisites

- **Node.js**: Make sure you have Node.js installed. You can download it from [here](https://nodejs.org/).
- **MongoDB**: You will need a running MongoDB instance. You can use a local MongoDB server or MongoDB Atlas.
- **Git**: Git must be installed to clone this repository.

## Getting Started

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Amrutha-avidi/floww.ai
2. Navigate into the project directory: 
    ``` bash 
    cd floww.ai
3. Install the node_modules
    ``` bash
    npm install
The server will start on http://localhost:3001

## API Endpoints

### Authentication Routes

#### 1. Register a new user

- **URL**: `/api/auth/register`
- **Method**: POST
- **Description**: Registers a new user with a name and password.

   ##### Request Body
   {
     "name": "your_name",
     "password": "your_password"
   }
   
   #### Response Body
   {
     "message": "User registered successfully"
   }
   #### Possible Errors
   - **400:** User already exists.
   - **500:** Error registering user.

#### 2. Login the Registered User

   - **URL**: `/api/auth/login`
   - **Method**: POST
   - **Description**: Registers a new user with a name and password.
   
   ##### Request Body
   {
     "name": "your_registered_name",
     "password": "your_registered_password"
   }

   
   #### Response Body
   {
     "message": "Login successful",
     "token": "your_jwt_token"
   }
   #### Possible Errors
   - **400:** Invalid credentials.
   - **500:** Error logging in.
     
### Transaction Routes
  #### 3. Create a transaction
   - **URL:** /api/transactions
   - **Method:** POST
   - **Description:** Adds a new transaction for the authenticated user.

   ##### Request Body
     {
        "amount": 100,
        "type": "income",
        "category": "salary",
        "date": "2024-10-20"
      }
   #### Response Body
   {
     "_id": "64f3bfc8dfb0a9159cbf7a28",
     "amount": 100,
     "type": "income",
     "category": "salary",
     "date": "2024-10-20T00:00:00.000Z",
     "user": "64f3bfc8dfb0a9159cbf7a26",
     "__v": 0
   }

   #### Possible Errors
   - **400:** Invalid input data.
   - **500:** Internal server error.

 #### 4. Get all transactions with pagination
   - **URL:** /api/transactions
   - **Method:** GET
   - **Description:** Retrieves all transactions with pagination.
      #### Query Parameters
     - **page:** (optional) The page number to retrieve, default is 1.
     - **limit:** (optional) The number of transactions per page, default is 10.
   ##### Response Example
    {
     "transactions": [
       {
         "_id": "64f3bfc8dfb0a9159cbf7a28",
         "amount": 100,
         "type": "income",
         "category": "salary",
         "date": "2024-10-20T00:00:00.000Z",
         "user": "64f3bfc8dfb0a9159cbf7a26"
       }
     ],
     "totalPages": 3,
     "currentPage": 1
   }


   #### Possible Errors
   - **500:** Internal server error.
     
 #### 5. Get a specific transaction
   - **URL:** /api/transactions/:id
   - **Method:** GET
   - **Description:** Retrieves a specific transaction by its ID.
      #### URL Parameters
     - **id:** The unique identifier of the transaction.

   ##### Response Example
    {
     "_id": "64f3bfc8dfb0a9159cbf7a28",
     "amount": 100,
     "type": "income",
     "category": "salary",
     "date": "2024-10-20T00:00:00.000Z",
     "user": "64f3bfc8dfb0a9159cbf7a26"
   }



   #### Possible Errors
   - **500:** Internal server error.
- **GET /api/transactions/my:** Get all transactions for the logged-in user with pagination.
- **GET /api/transactions/summary:** Get a summary of transactions based on filters (e.g., date range, category).
- **GET /api/transactions/month-wise-report:** Generate a report of transactions grouped by month and category.
- **GET /api/transactions/:**  Get a specific transaction by ID.
- **PUT /api/transactions/:** Update a transaction by ID.
- **DELETE /api/transactions/:** Delete a transaction by ID.

### Middleware
- **Authentication:** All routes related to transactions are protected and require a valid JWT token.

## Authentication 
The API uses **JWT tokens** for authentication. Each authenticated request must include a valid token.You can obtain the token by logging in via the `/api/auth/login` endpoint.

## Models

### User
 
   {
     name: String,
     password: String
   }

### Transaction
 
   {
     amount: Number,
     type: String (e.g., "income" or "expense"),
     category: String,
     date: Date,
     user: ObjectId (reference to the User)
   }

### Category
 
   {
     name: String,
     password: String
   }

## Technologies Used
- **Node.js:** Backend runtime environment.
- **Express:** Web framework for building the API.
- **MongoDB:** NoSQL database.
- **Mongoose:** ODM for MongoDB.
- **JWT:** Token-based authentication.
- **Bcrypt.js:** Password hashing.

### Author
AVIDI AMRUTHAVALLI - https://github.com/Amrutha-avidi
