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
- **POST /api/auth/register:** Register a new user.
