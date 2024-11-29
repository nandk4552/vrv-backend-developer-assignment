# **RBAC Assignment for Backend Developer**

This project implements **Role-Based Access Control (RBAC)** with features like user registration, email verification via OTP, login, and role-specific functionalities for Admins, Users, and Moderators.

---

## **Setup Instructions**

### **Prerequisites**

- Node.js installed (v14+ recommended)
- MongoDB installed locally or access to MongoDB Atlas
- Postman or any other API testing tool
- A Gmail account to configure email services

---

### **Step 1: Clone the Repository**

```bash
git clone https://github.com/nandk4552/vrv-backend-developer-assignment
cd vrv-backend-developer-assignment
```

---

### **Step 2: Install Dependencies**

```bash
npm install
```

---

### **Step 3: Environment Variables**

Create a `.env` file in the root directory and configure the following variables:

```env
PORT = 8080
MONGO_URI = mongodb connection url
JWT_SECRET= jwt secret password
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
EMAIL=your gmail
PASSWORD= gmail app password for enabling the smptp services
```

- Replace `MONGO_URI` with your MongoDB connection string.
- Replace `EMAIL` and `PASSWORD` with your Gmail credentials or App Password (for accounts with 2FA enabled).

---

### **Step 4: Start the Server**

```bash
npm start or npm run dev 
```

Server will run at: [http://localhost:8080](http://localhost:8080)

---

## **API Endpoints**

### **Auth Routes**

1. **Register User**  
   **POST** `/api/v1/auth/register`  
   Registers a new user and sends an OTP to their valid email.

   **Request Body**:
   ```json
   {
     "name": "John Doe",
     "email": "john.doe@example.com",
     "password": "password123",
     "role": "User"
   }
   ```

   **Response**:
   ```json
   {
     "success": true,
     "message": "User registered successfully. Please verify your email.",
     "user": {
       "id": "user_id_here",
       "name": "John Doe",
       "email": "john.doe@example.com",
       "isVerified": false
     }
   }
   ```

2. **Verify User**  
   **POST** `/api/v1/auth/verify`  
   Verifies the user using OTP.

   **Request Body**:
   ```json
   {
     "email": "john.doe@example.com",
     "otp": "123456"
   }
   ```

   **Response**:
   ```json
   {
     "success": true,
     "message": "Email verified successfully. You can now log in."
   }
   ```

3. **Login User**  
   **POST** `/api/v1/auth/login`  
   Logs in the user after verifying email.

   **Request Body**:
   ```json
   {
     "email": "john.doe@example.com",
     "password": "password123"
   }
   ```

   **Response**:
   ```json
   {
     "success": true,
     "token": "jwt_token_here",
     "message": "Login successful"
   }
   ```

---

### **Admin Routes**

1. **List All Users**  
   **GET** `/api/v1/admin/users`  
   Lists all users (Admin only).  

   **Response**:
   ```json
   [
     {
       "id": "user_id_here",
       "name": "John Doe",
       "email": "john.doe@example.com",
       "role": "User"
     }
   ]
   ```

2. **Assign Role to User**  
   **POST** `/api/v1/admin/assign-role`  
   Assigns a role to a user (Admin only).

   **Request Body**:
   ```json
   {
     "userId": "user_id_here",
     "role": "Moderator"
   }
   ```

   **Response**:
   ```json
   {
     "success": true,
     "message": "Role assigned successfully."
   }
   ```

---

### **User Routes**

1. **View Profile**  
   **GET** `/api/v1/user/profile`  
   Fetches the logged-in user's profile.

   **Response**:
   ```json
   {
     "id": "user_id_here",
     "name": "John Doe",
     "email": "john.doe@example.com",
     "role": "User"
   }
   ```

2. **Update Profile**  
   **PUT** `/api/v1/user/update`  
   Updates the logged-in user's name or password.

   **Request Body**:
   ```json
   {
     "name": "Updated Name",
     "password": "newpassword123"
   }
   ```

   **Response**:
   ```json
   {
     "success": true,
     "message": "Profile updated successfully."
   }
   ```

---

### **Moderator Routes**

1. **List Users by Role (User Only)**  
   **GET** `/api/v1/moderator/users`  
   Lists all users with the role `User` (Moderator only).

   **Response**:
   ```json
   [
     {
       "id": "user_id_here",
       "name": "John Doe",
       "email": "john.doe@example.com",
       "role": "User"
     }
   ]
   ```

---

## **Testing in Postman**

1. **Import Postman Collection**:
   - Create a Postman collection for the API endpoints.
   - Set the base URL as: `http://localhost:8080`.

2. **Authentication**:
   - Use the token returned from the `/api/v1/auth/login` endpoint in the `Authorization` header for protected routes:
     ```json
     {
       "Authorization": "Bearer jwt_token_here"
     }
     ```

3. **Test Scenarios**:
   - Register a user and verify the email using OTP.
   - Attempt to log in without verification (should fail).
   - Log in after verification (should succeed).
   - Use Admin routes for managing users.
   - Test access control for different roles (Admin, User, Moderator).

---

## **Error Handling**

- **404 Not Found**:
  - Returned for undefined routes.
- **500 Internal Server Error**:
  - Returned for unexpected server issues.

---

## **Directory Structure**

```
vrv-security-backend/
├── controllers/       # API logic
├── middlewares/       # Middleware functions
├── models/            # MongoDB schemas
├── routes/            # API route handlers
├── utils/             # Helper functions (email, OTP)
├── config/            # Database connection
├── .env               # Environment variables
├── server.js          # Entry point of the application
└── README.md          # Documentation
```

---

## **Conclusion**

This backend implements a robust RBAC system with email verification and role-specific access. It can be extended to support additional features like dynamic permissions or advanced logging.

Let me know if you have any questions or need assistance!