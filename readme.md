
# Authenticate-assignment

## Description
This project is a RESTful API built using Node.js and Express.js for managing users, contacts, spam numbers, and performing search operations.

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Dmusketeer/Authenticate9-assignment.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   Create a `.env` file in the root directory and define the following variables:
   ```
  
   PORT=<port_number>
   TOKEN_SECRET=<TOKEN_SECRET>
   DB_NAME=<database_name>
   DB_USERNAME=<database_user>
   DB_PASSWORD=<database_password>
   DB_HOST=<database_host>
   ```

## Usage
To start the server, run the following command:
```bash
npm start
```
The server will start listening on the specified port.

### Endpoints
- **GET /api/v1/user**: Get all users
- **POST /api/v1/user/register**: Register a new user
- **POST /api/v1/user/login**: Log in user
- **GET /api/v1/contact/allcontacts**: Get all contacts
- **POST /api/v1/contact/addcontact**: Add a new contact
- **GET /api/v1/spam/allspamnumbers**: Get all spam numbers
- **POST /api/v1/spam/addspam**: Add a new spam number
- **POST /api/v1/spam/allspamreportedbyuser**: all spam number reported by user
- **GET /api/v1/search/searchbyname**: Search contacts by name
- **GET /api/v1/search/searchbynumber**: Search contacts by number

## Technologies Used
- Node.js
- Express.js
- Sequelize
- PostgreSQL

