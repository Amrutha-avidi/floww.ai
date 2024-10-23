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
    ```

2. Navigate into the project directory: 
    ```bash
    cd floww.ai
    ```

3. Install the node_modules:
    ```bash
    npm install
    ```

   The server will start on `http://localhost:3001`.

## API Endpoints

### Authentication Routes

#### 1. Register a new user
- **URL**: `/api/auth/register`
- **Method**: POST
- **Description**: Registers a new user with a name and password.

  #### Request Body
    ```json
    {
      "name": "your_name",
      "password": "your_password"
    }
    ```
  #### Response Body
    ```json
    {
      "message": "User registered successfully"
    }
    ```
  #### Possible Errors
   - **400:** User already exists.
   - **500:** Error registering user.!
     
  #### API Result
  ![1 Register](https://github.com/user-attachments/assets/026738b9-9fa3-49eb-b8dc-ccc040e31b0a)



#### 2. Login the Registered User
   - **URL**: `/api/auth/login`
   - **Method**: POST
   - **Description**: Logs in a registered user with their name and password.
   
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

   #### API Result
   ![2 Login](https://github.com/user-attachments/assets/e13af417-9380-4cf8-9736-4a07d6be5bb3)
   ![3 Login Invalid](https://github.com/user-attachments/assets/9b95fdca-f1d8-43da-b953-55cd59396ca2)


### Transaction Routes

#### 3. Create a transaction
   - **URL**: `/api/transactions`
   - **Method**: POST
   - **Description**: Adds a new transaction for the authenticated user.

   #### Request Body
      
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
   #### API Result
   ![4  Posting New Transaction](https://github.com/user-attachments/assets/f79162c5-ceb9-4e39-9762-878fe098e88c)


#### 4. Get all transactions with pagination
  - **URL**: `/api/transactions`
  - **Method**: GET
  - **Description**: Retrieves all transactions with pagination.

    #### Query Parameters
      - **page**: (optional) The page number to retrieve, default is 1.
      - **limit**: (optional) The number of transactions per page, default is 10.

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
      
    #### API Result
    ![5  Get all transactions with pagination](https://github.com/user-attachments/assets/5c949440-d018-4e3d-8c61-65ca6ffe3ed2)

#### 5. Get a specific transaction
  - **URL**: `/api/transactions/:id`
  - **Method**: GET
  - **Description**: Retrieves a specific transaction by its ID.

  #### URL Parameters
  - **id**: The unique identifier of the transaction.

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

  #### API Result
  ![6  Get transaction by Id](https://github.com/user-attachments/assets/a891521d-751d-4945-8e54-141042d7cee4)


#### 6. Get summary of transactions
  - **URL**: `/api/transactions/summary`
  - **Method**: GET
  - **Description**: Retrieves a summary of all transactions (total income, total expenses, balance) within a date range.

    #### Query Parameters
      - **startDate**: (optional) Start of the date range.
      - **endDate**: (optional) End of the date range.
      - **category**: (optional) Filter by category.

        ##### Response Example
          
            {
              "totalIncome": 3000,
              "totalExpenses": 1200,
              "balance": 1800
            }
          

        #### Possible Errors
      - **400:** Invalid Date format.
      - **500:** Internal server error.
    #### API Result
    ![9  Transaction Summary](https://github.com/user-attachments/assets/2e94c6bd-6712-48c4-b598-ef84cdf46b65)


#### 7. Generate monthly report by category
  - **URL**: `/api/transactions/month-wise-report`
  - **Method**: GET
  - **Description**: Retrieves monthly transactions grouped by category.
      
    ##### Response Example
        
        [
          {
            "_id": {
              "month": 10,
              "category": "salary"
            },
            "totalAmount": 3000
          },
          {
            "_id": {
              "month": 10,
              "category": "groceries"
            },
            "totalAmount": 400
          }
        ]
        

    #### Possible Errors
   - **500:** Internal server error.

#### 8. Get Transactions for a Specific User
  - **URL**: `/api/transactions/user/:userId`
  - **Method**: GET
  - **Description**: Retrieves all transactions for a specific user identified by their user ID.
         
    ##### URL Parameters
      - **userId**: The unique identifier of the user whose transactions are being retrieved..
    #### Request Header
    `GET /user/64f3bfc8dfb0a9159cbf7a26`
        
      ##### Response Example (Success)
          
          [
              {
                "_id": "64f3bfc8dfb0a9159cbf7a28",
                "amount": 100,
                "type": "income",
                "category": "salary",
                "date": "2024-10-20T00:00:00.000Z",
                "user": "64f3bfc8dfb0a9159cbf7a26"
              },
              {
                "_id": "64f3bfc8dfb0a9159cbf7a29",
                "amount": 50,
                "type": "expense",
                "category": "groceries",
                "date": "2024-10-21T00:00:00.000Z",
                "user": "64f3bfc8dfb0a9159cbf7a26"
              }
            ]

      #### Response Fields:
       - **_id:** The unique identifier of the transaction.
       - **amount:** The amount of the transaction.
       - **type:** The type of transaction (e.g., "income" or "expense").
       - **category:** The category of the transaction (e.g., "salary", "groceries").
       - **date:** The date when the transaction occurred.
       - **user:** The ID of the user who owns the transaction.    

      #### Possible Errors
    - **404:** No transactions found for the given user ID.
    - **500:** Internal server error.

    #### API Result
    ![Screenshot (158)](https://github.com/user-attachments/assets/40ae7022-6238-4b58-8b22-b8699327ec87)



        
#### 9. Update a Specific Transaction by transaction_id
  - **URL**: `/api/transactions/:id`
  - **Method**: PUT
  - **Description**: Updates a specific transaction by its transaction_id.
        
    ##### URL Parameters
      - **id**: The unique identifier of the transaction.
    #### Request Header
    `Authorization: Bearer <your-jwt-token>`
      
      ##### Request Example 
          
          {
            "type": "income",
            "category": "Freelancing",
            "amount": "1500",
            "description": "Payment for freelance work"
          }
        
      #### Response Example
      
        {
          "message": "Updated transaction successfully"
        }
      
        
      #### Possible Errors
        - **404:** Transaction not found
        - **400:** Invalid input.
        - **500:** Internal server error
     #### API Result
    ![8  Updating Transaction By Id](https://github.com/user-attachments/assets/7b136a00-79c3-439a-8a02-43d23f48e831)

    
#### 10. Delete a Specific Transaction by transaction_id
  - **URL**: `/api/transactions/:id`
  - **Method**: DELETE
  - **Description**: Deletes a specific transaction by its transaction_id.
      
    ##### URL Parameters
      - **id**: The unique identifier of the transaction.

      #### Request Header
      `Authorization: Bearer <your-jwt-token>`
      
      #### Response Example
        
        {
          "message": "Transaction deleted successfully"
        }
      
      
      #### Possible Errors
      - **404:** Transaction not found
      - **500:** Internal server error.
      - 
     #### API Result
    ![7  Delete Transaction BY ID](https://github.com/user-attachments/assets/afb8b694-a1c3-420d-a7cf-a3690b43c489)


### Middleware
- **Authentication**: All routes related to transactions are protected and require a valid JWT token.

## Authentication 
The API uses **JWT tokens** for authentication. Each authenticated request must include a valid token. You can obtain the token by logging in via the `/api/auth/login` endpoint.

## Models

### User
  {
    name: String,
    password: String
  }

### Transaction
  {
    amount: Number,
    type: String ( "income" or "expense"),
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
