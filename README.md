# Sports Facility Booking Platform

## Overview
The Sports Facility Booking Platform is a backend application that allows users to book sports facilities hassle-free. Built using TypeScript, Express.js, and Mongoose, this platform provides essential functionalities like user authentication, facility management, and booking operations. Admin users have enhanced capabilities to manage facilities and view all bookings.

## Table of Contents
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [User Routes](#user-routes)
- [Facility Routes](#facility-routes)
- [Booking Routes](#booking-routes)
- [Bonus Features](#bonus-features)
- [Error Handling](#error-handling)
- [Authentication Middleware](#authentication-middleware)
- [Not Found Route](#not-found-route)
- [Validation](#validation)
- [Contributing](#contributing)
- [License](#license)

## Features
- User Management: Users can sign up and log in.
- Facility Management: Admin users can create, update, view, and soft delete facilities.
- Booking Management: Users can check availability, create bookings, view their bookings, and cancel bookings.
- Admin Features: Admin users can view all bookings.
- Error Handling: Proper error handling with detailed error responses.
- Authentication & Authorization: JWT-based authentication and role-based access control.
- Validation: Input validation using Zod.

## Technology Stack
- **Programming Language**: TypeScript
- **Web Framework**: Express.js
- **ODM & Validation Library**: Mongoose for MongoDB
- **Validation**: Zod

## Installation
Clone the repository:

```
git clone https://github.com/Shabbir8788/Sports-Facility-Booking-Platform.git
cd sports-facility-booking
```

## Install dependencies:
```
npm install
```
Environment Variables
Create a .env file in the root directory and add the following environment variables:

makefile
Copy code
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
Running the Application
Start the development server:

sh
Copy code
npm run start:dev

Start the production server:

sh
Copy code
npm run start:prod
API Documentation
User Routes
Sign Up
Route: POST /api/auth/signup
Request Body:
json
Copy code
{
  "name": "Programming Hero",
  "email": "web@programming-hero.com",
  "password": "programming-hero",
  "phone": "01322901105",
  "role": "admin",
  "address": "Level-4, 34, Awal Centre, Banani, Dhaka"
}
Response:
json
Copy code
{
  "success": true,
  "statusCode": 200,
  "message": "User registered successfully",
  "data": {
    "_id": "60d9c4e4f3b4b544b8b8d1c4",
    "name": "Programming Hero",
    "email": "web@programming-hero.com",
    "role": "admin",
    "phone": "01322901105",
    "address": "Level-4, 34, Awal Centre, Banani, Dhaka"
  }
}
Login
Route: POST /api/auth/login
Request Body:
json
Copy code
{
  "email": "web@programming-hero.com",
  "password": "programming-hero"
}
Response:
json
Copy code
{
  "success": true,
  "statusCode": 200,
  "message": "User logged in successfully",
  "token": "JWT_TOKEN",
  "data": {
    "_id": "60d9c4e4f3b4b544b8b8d1c4",
    "name": "Programming Hero",
    "email": "web@programming-hero.com",
    "role": "admin",
    "phone": "01322901105",
    "address": "Level-4, 34, Awal Centre, Banani, Dhaka"
  }
}
Facility Routes
Create a Facility (Admin Only)
Route: POST /api/facility
Headers: Authorization: Bearer JWT_TOKEN
Request Body:
json
Copy code
{
  "name": "Tennis Court",
  "description": "Outdoor tennis court with synthetic surface.",
  "pricePerHour": 30,
  "location": "456 Sports Ave, Springfield"
}
Response:
json
Copy code
{
  "success": true,
  "statusCode": 200,
  "message": "Facility added successfully",
  "data": {
    "_id": "60d9c4e4f3b4b544b8b8d1c5",
    "name": "Tennis Court",
    "description": "Outdoor tennis court with synthetic surface.",
    "pricePerHour": 30,
    "location": "456 Sports Ave, Springfield",
    "isDeleted": false
  }
}
Update a Facility (Admin Only)
Route: PUT /api/facility/:id
Headers: Authorization: Bearer JWT_TOKEN
Request Body:
json
Copy code
{
  "name": "Updated Tennis Court",
  "description": "Updated outdoor tennis court with synthetic surface.",
  "pricePerHour": 35,
  "location": "789 Sports Ave, Springfield"
}
Response:
json
Copy code
{
  "success": true,
  "statusCode": 200,
  "message": "Facility updated successfully",
  "data": {
    "_id": "60d9c4e4f3b4b544b8b8d1c5",
    "name": "Updated Tennis Court",
    "description": "Updated outdoor tennis court with synthetic surface.",
    "pricePerHour": 35,
    "location": "789 Sports Ave, Springfield",
    "isDeleted": false
  }
}
Delete a Facility - Soft Delete (Admin Only)
Route: DELETE /api/facility/:id
Headers: Authorization: Bearer JWT_TOKEN
Response:
json
Copy code
{
  "success": true,
  "statusCode": 200,
  "message": "Facility deleted successfully",
  "data": {
    "_id": "60d9c4e4f3b4b544b8b8d1c5",
    "name": "Updated Tennis Court",
    "description": "Updated outdoor tennis court with synthetic surface.",
    "pricePerHour": 35,
    "location": "789 Sports Ave, Springfield",
    "isDeleted": true
  }
}
Get All Facilities
Route: GET /api/facility
Response:
json
Copy code
{
  "success": true,
  "statusCode": 200,
  "message": "Facilities retrieved successfully",
  "data": [
    {
      "_id": "60d9c4e4f3b4b544b8b8d1c5",
      "name": "Tennis Court",
      "description": "Outdoor tennis court with synthetic surface.",
      "pricePerHour": 30,
      "location": "456 Sports Ave, Springfield",
      "isDeleted": false
    }
  ]
}
Booking Routes
Check Availability
Route: GET /api/check-availability
Query Parameters: date (optional, format: YYYY-MM-DD)
Response:
json
Copy code
{
  "success": true,
  "statusCode": 200,
  "message": "Availability checked successfully",
  "data": [
    {
      "startTime": "08:00",
      "endTime": "10:00"
    },
    {
      "startTime": "14:00",
      "endTime": "16:00"
    }
  ]
}
Create a Booking (User Only)
Route: POST /api/bookings
Headers: Authorization: Bearer JWT_TOKEN
Request Body:
json
Copy code
{
  "facility": "60d9c4e4f3b4b544b8b8d1c5",
  "date": "2024-06-15",
  "startTime": "10:00",
  "endTime": "13:00"
}
Response:
json
Copy code
{
  "success": true,
  "statusCode": 200,
  "message": "Booking created successfully",
  "data": {
    "_id": "60d9c4e4f3b4b544b8b8d1c6",
    "facility": "60d9c4e4f3b4b544b8b8d1c5",
    "date": "2024-06-15",
    "startTime": "10:00",
    "endTime": "13:00",
    "user": "60d9c4e4f3b4b544b8b8d1c4",
    "payableAmount": 90,
    "isBooked": "confirmed"
  }
}
View All Bookings (Admin Only)
Route: GET /api/bookings
Headers: Authorization: Bearer JWT_TOKEN
Response:
json
Copy code
{
  "success": true,
  "statusCode": 200,
  "message": "Bookings retrieved successfully",
  "data": [
    {
      "_id": "60d9c4e4f3b4b544b8b8d1c6",
      "facility": {
        "_id": "60d9c4e4f3b4b544b8b8d1c5",
        "name": "Tennis Court",
        "description": "Outdoor tennis court with professional-grade surface.",
        "pricePerHour": 30,
        "location": "123 Main Street",
        "isDeleted": false
      },
      "date": "2024-06-15",
      "startTime": "10:00",
      "endTime": "13:00",
      "user": {
        "_id": "60d9c4e4f3b4b544b8b8d1c4",
        "name": "Programming Hero",
        "email": "programming.hero@example.com",
        "phone": "+1234567890",
        "role": "user",
        "address": "456 Elm Street"
      },
      "payableAmount": 90,
      "isBooked": "confirmed"
    }
  ]
}
View Bookings by User (User Only)
Route: GET /api/bookings/user
Headers: Authorization: Bearer JWT_TOKEN
Response:
json
Copy code
{
  "success": true,
  "statusCode": 200,
  "message": "Bookings retrieved successfully",
  "data": [
    {
      "_id": "60d9c4e4f3b4b544b8b8d1c6",
      "facility": {
        "_id": "60d9c4e4f3b4b544b8b8d1c5",
        "name": "Tennis Court",
        "description": "Outdoor tennis court with professional-grade surface.",
        "pricePerHour": 30,
        "location": "123 Main Street",
        "isDeleted": false
      },
      "date": "2024-06-15",
      "startTime": "10:00",
      "endTime": "13:00",
      "user": "60d9c4e4f3b4b544b8b8d1c4",
      "payableAmount": 90,
      "isBooked": "confirmed"
    }
  ]
}
Cancel a Booking (User Only)
Route: DELETE /api/bookings/:id
Headers: Authorization: Bearer JWT_TOKEN
Response:
json
Copy code
{
  "success": true,
  "statusCode": 200,
  "message": "Booking cancelled successfully",
  "data": {
    "_id": "60d9c4e4f3b4b544b8b8d1c6",
    "facility": {
      "_id": "60d9c4e4f3b4b544b8b8d1c5",
      "name": "Tennis Court",
      "description": "Outdoor tennis court with professional-grade surface.",
      "pricePerHour": 30,
      "location": "123 Main Street",
      "isDeleted": false
    },
    "date": "2024-06-15",
    "startTime": "10:00",
    "endTime": "13:00",
    "user": "60d9c4e4f3b4b544b8b8d1c4",
    "payableAmount": 90,
    "isBooked": "canceled"
  }
}
Bonus Features
No Data Found
When retrieving data, if the database collection is empty or no matching data is found, the following response is returned:

json
Copy code
{
  "success": false,
  "statusCode": 404,
  "message": "No Data Found",
  "data": []
}
Error Handling
Implement proper error handling throughout the application. Use global error handling middleware to catch and handle errors, providing appropriate error responses with error messages.

Error Response
json
Copy code
{
  "success": false,
  "message": "E11000 duplicate key error collection: univerity-management.students index: email_1 dup key: { email: \"user2@gmail.com\" }",
  "errorMessages": [
    {
      "path": "",
      "message": "E11000 duplicate key error collection: project index: email_1 dup key: { email: \"user2@gmail.com\" }"
    }
  ],
  "stack": "MongoServerError: E11000 duplicate key error collection: project index: email_1 dup key: { email: \"user2@gmail.com\" } at ..."
}
Authentication Middleware
Implement an Authentication Middleware to authenticate your application, ensuring that only users and admins can access their own routes.

Unauthorized Access Response
json
Copy code
{
  "success": false,
  "statusCode": 401,
  "message": "You have no access to this route"
}
Not Found Route
Implement a global "Not Found" handler for unmatched routes. When a route is not found, respond with a generic message.

Not Found Response
json
Copy code
{
  "success": false,
  "statusCode": 404,
  "message": "Not Found"
}
Validation
Use Zod for input validation, ensuring data consistency. When validation fails, a 400 Bad Request status code is returned, accompanied by detailed error messages specifying the erroneous fields and reasons.

Contributing
Contributions are welcome! Please open an issue or submit a pull request for any changes.

License
This project is licensed under the License.







