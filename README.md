Login System with Next.js, Prisma, and MySQL
This is a simple login and registration system built using Next.js (App Directory), Prisma ORM, and MySQL. It securely hashes passwords using bcrypt and verifies them during login.

Features
User registration with email and password.
Password hashing for security using bcrypt.
Login functionality with hashed password verification.
Fully functional API built using the Next.js app directory structure.
Integration with a MySQL database.
Prerequisites
Ensure you have the following installed on your system:

Node.js (version 18 or later recommended)
MySQL database server
Prisma CLI (npm install prisma --save-dev)
Installation

1. Clone the Repository
   bash
   Code kopiëren
   git clone <repository-url>
   cd <repository-folder>
2. Install Dependencies
   Run the following command to install required dependencies:

bash
Code kopiëren
npm install 3. Set Up the Database
Create a MySQL database named loginsystem (or use your preferred name).
Update the .env file with your MySQL database credentials:
makefile
Code kopiëren
DATABASE_URL="mysql://username:password@localhost:3306/loginsystem"
Replace username, password, and loginsystem with your MySQL credentials and database name. 4. Generate Prisma Client
Run the following command to generate the Prisma client and sync the schema with your database:

bash
Code kopiëren
npx prisma generate 5. Apply Database Migrations
Run the following command to apply migrations to the database:

bash
Code kopiëren
npx prisma migrate dev
Running the Application
Development Server
To start the development server, run:

bash
Code kopiëren
npm run dev
Open your browser and navigate to http://localhost:3000 to view the app.

API Endpoints
Signup - POST /api/signup
Registers a new user with an email and hashed password.

Request Body:

json
Code kopiëren
{
"email": "user@example.com",
"password": "yourpassword"
}
Response:

Success: 201 Created
Failure: 400 Bad Request or 500 Internal Server Error
Login - POST /api/signin
Logs in an existing user by verifying the password.

Request Body:

json
Code kopiëren
{
"email": "user@example.com",
"password": "yourpassword"
}
Response:

Success: 200 OK
Failure: 401 Unauthorized or 404 Not Found
Common Issues & Solutions
MySQL Connection Errors
Ensure your MySQL server is running and the credentials in .env are correct.

Prisma Schema Mismatch
If you change the prisma/schema.prisma file, run the following commands to apply changes:

bash
Code kopiëren
npx prisma generate
npx prisma migrate dev
Environment Variables Not Loaded
Ensure .env exists in the project root and restart the server after making changes.

FAQ
Can I use a different database?
Yes, you can use any database supported by Prisma (e.g., PostgreSQL, SQLite). Update the provider in prisma/schema.prisma and DATABASE_URL in .env.

Is password hashing secure?
Yes, bcrypt is a robust and widely used library for password hashing.
