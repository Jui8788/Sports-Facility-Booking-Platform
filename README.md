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
- **User Management**: Users can sign up and log in.
- **Facility Management**: Admin users can create, update, view, and soft delete facilities.
- **Booking Management**: Users can check availability, create bookings, view their bookings, and cancel bookings.
- **Admin Features**: Admin users can view all bookings.
- **Error Handling**: Proper error handling with detailed error responses.
- **Authentication & Authorization**: JWT-based authentication and role-based access control.
- **Validation**: Input validation using Zod.

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

## Environment Variables
Create a .env file in the root directory and add the following environment variables:
```
PORT=5000
DATABASE_URL=your_mongodb_url
BCRYPT_SALT_ROUNDS=your_bcrypt_salt_rounds
JWT_ACCESS_SECRET=your_jwt_access_secret
JWT_REFRESH_SECRET=your_jwt_refresh_secret
JWT_ACCESS_EXPIRES_IN=your_jwt_access_expires_in
JWT_REFRESH_EXPIRES_IN=your_jwt_refresh_expires_in
```

## Running the Application
Start the development server:
```
npm run start:dev
```
Start the production server:
```
npm run start:prod
```

### API Documentation

#### User Routes
1. **User Sign Up**
*   **Route**: `POST /api/auth/signup`
*   **Request Body**:

```json
{
  "name": "Programming",
  "email": "web@programming.com",
  "password": "programming",
  "phone": "01322901105",
  "role": "admin", // or 'user'
  "address": "Level-4, 34, Awal Centre, Banani, Dhaka"
}
```

* **Response:**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "User registered successfully",
  "data": {
    "_id": "60d9c4e4f3b4b544b8b8d1c4",
    "name": "Programming",
    "email": "web@programming.com",
    "role": "admin",
    "phone": "01322901105",
    "address": "Level-4, 34, Awal Centre, Banani, Dhaka"
  }
}
```
2. **User Login**
*   **Route**: `POST /api/auth/login`
*   **Request Body**:

```json
{
  "email": "web@programming.com",
  "password": "programming"
}
```

* **Response:**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "User logged in successfully",
  "token": "JWT_TOKEN",
  "data": {
    "_id": "60d9c4e4f3b4b544b8b8d1c4",
    "name": "Programming",
    "email": "web@programming.com",
    "role": "admin",
    "phone": "01322901105",
    "address": "Level-4, 34, Awal Centre, Ban Myeni, Dhaka"
  }
}
```

#### Facility Routes

3. **Create a Facility (Admin Only)**
*   **Route**: `POST /api/facility`
*   **Headers**:

```plain
Authorization: Bearer JWT_TOKEN
```

```json
{
  "name": "Tennis Court",
  "description": "Outdoor tennis court with synthetic surface.",
  "pricePerHour": 30,
  "location": "456 Sports Ave, Springfield"
}
```

```json
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
```

4. **Update a Facility (Admin Only)**
*   **Route**: `PUT /api/facility/:id`
*   **Headers**:

```plain
Authorization: Bearer JWT_TOKEN
```

```json
{
  "name": "Updated Tennis Court",
  "description": "Updated outdoor tennis court with synthetic surface.",
  "pricePerHour": 35,
  "location": "789 Sports Ave, Springfield"
}
```

* **Response**
```json
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
```

5. **Delete a Facility - Soft Delete (Admin Only)**
*   **Route**: `DELETE /api/facility/:id`
*   **Headers**:

```plain
      Authorization: Bearer JWT_TOKEN
```

*   **Response**:

```json
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

```

**6\. Get All Facilities**

*  **Route**: `GET /api/facility`
*  **Response**:

```json
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
```

#### Booking Routes

### 7\. Check Availability

Check the availability of time slots for booking on a specific date.

*   **Route**: `GET /api/check-availability`

#### Query Parameters

*   **date** (`string`, optional): The date for which availability is to be checked. Format: `YYYY-MM-DD`. If not provided, today's date will be used by default.

#### Response

  *   **success** (`boolean`): Indicates whether the request was successful.
  *   **statusCode** (`number`): HTTP status code of the response.
  *   **message** (`string`): Descriptive message indicating the outcome of the request.
  *   **data** (`Array` of `Object`): Array containing information about available time slots.

##### Time Slot Object

  *   **startTime** (`string`): The start time of the available slot.
  *   **endTime** (`string`): The end time of the available slot.

#### Example Request

```sql
GET /api/check-availability?date=2024-06-15
```

#### Example Response

```json
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
```

  

**Hints**:

*   Parse the optional `date` query parameter from the request URL. If not provided, use today's date.
*   Retrieve bookings for the specified date from your database using Mongoose.
*   Define a function to find available time range based on the bookings retrieved. Compare booked time range to the total available time slots for the day.
*   Return a response containing the available time slots in the specified format. Use `res.json()` to send the response.


**8\. Create a Booking (User Only)**

  *   **Route**: `POST /api/bookings`
  *   **Headers**:

```plain
Authorization: Bearer JWT_TOKEN
```

```json
{
  "facility": "60d9c4e4f3b4b544b8b8d1c5",
  "date": "2024-06-15",
  "startTime": "10:00",
  "endTime": "13:00"
}
```
* **Response:**
```json
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
```

`If the facility is unavailable during the requested time slot, an error response is returned.`

**9\. View All Bookings (Admin Only)**

  *   **Route**: `GET /api/bookings`
  *   **Headers**:

```plain
Authorization: Bearer JWT_TOKEN
```

* **Response:**
```json
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
        "name": "Programming",
        "email": "programming@example.com",
        "phone": "+1234567890",
        "role": "user",
        "address": "456 Elm Street"
      },
      "payableAmount": 90,
      "isBooked": " confirmed"
    }
  ]
}
```

**10\. View Bookings by User (User Only)**

  *   **Route**: `GET /api/bookings/user`
  *   **Headers**:

```plain
Authorization: Bearer JWT_TOKEN
```

```json
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
      "isBooked": " confirmed"
    }
  ]
}
```

**11\. Cancel a Booking (User Only)**

  *   **Route**: `DELETE /api/bookings/:id`
  *   **Headers**:

```plain
Authorization: Bearer JWT_TOKEN
```

```json
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
```

## Bonus Features

### No Data Found
When retrieving data, if the database collection is empty or no matching data is found, the following response is returned:

```json
{
  "success": false,
  "statusCode": 404,
  "message": "No Data Found",
  "data":[]
}
```

### Error Handling
Implement proper error handling throughout the application. Use global error handling middleware to catch and handle errors, providing appropriate error responses with error messages.

**Error Response Object Should include the following properties:**

*   success → false
*   message → Error Type → Validation Error, Cast Error, Duplicate Entry
*   errorMessages
*   stack

  

**Sample Error Response**

```json
   {
    "success": false,
    "message": "E11000 duplicate key error collection: univerity-management.students index: email_1 dup key: { email: \\"user2@gmail.com\\" }",
    "errorMessages": [
        {
            "path": "",
            "message": "E11000 duplicate key error collection: project index: email_1 dup key: { email: \\"user2@gmail.com\\" }"
        }
    ],
    "stack": "MongoServerError: E11000 duplicate key error collection: project index: email_1 dup key: { email: \\"user2@gmail.com\\" }\\n    at H:\\\\next-level-development\\\\project-management-auth-service\\\\node_modules\\\\mongodb\\\\src\\\\operations\\\\insert.ts:85:25\\n    at H:\\\\next-level-development\\\\university-management-auth-service\\\\node_modules\\\\mongodb\\\\src\\\\cmap\\\\connection_pool.ts:574:11\\n    at H:\\\\next-level-development\\\\university-writeOrBuffer (node:internal/streams/writable:391:12)"
}
```

### **4\. Authentication Middleware:**

Implement an Authentication Middleware to authenticate your application. Ensures that only user  and admin can access their own accessible routes.

```json
{
  "success": false,
  "statusCode": 401,
  "message": "You have no access to this route",
}
```

### **3\. Not Found Route:**

Implement a global "Not Found" handler for unmatched routes. When a route is not found, respond with a generic message: "Not Found.”

```json
{
  "success": false,
  "statusCode": 404,
  "message": "Not Found",
}
```
### **5\. Zod Validation:**
The API employs Zod for input validation, ensuring data consistency. When validation fails, a 400 Bad Request status code is returned, accompanied by detailed error messages specifying the erroneous fields and reasons.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any changes.

## License
This project is licensed under the License.







