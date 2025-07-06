# Heart & Hues Backend API

A systematic and well-organized Express.js backend API for the Heart & Hues gift shop application.

## 🏗️ Project Structure

```
backend/
├── config/                 # Configuration files
│   ├── database.js        # Database connection
│   ├── constants.js       # Application constants
│   └── index.js           # Config exports
├── controllers/           # Route controllers
│   └── authController.js  # Authentication controller
├── middleware/            # Custom middleware
│   └── auth.js           # Authentication middleware
├── models/               # Database models
│   ├── User.js
│   ├── Product.js
│   └── Order.js
├── routes/               # API routes
│   ├── auth.js
│   ├── products.js
│   ├── orders.js
│   └── users.js
├── services/             # Business logic layer
│   └── authService.js    # Authentication service
├── utils/                # Utility functions
│   ├── asyncHandler.js   # Async error handler
│   ├── responseHandler.js # Standardized responses
│   ├── validation.js     # Validation utilities
│   └── index.js          # Utils exports
├── validators/           # Input validation schemas
│   ├── auth.js          # Auth validation
│   └── index.js         # Validator exports
├── server.js            # Main application file
└── package.json
```

## 🚀 Features

### ✅ **Systematic Organization**
- **Separation of Concerns**: Clear separation between routes, controllers, services, and models
- **Modular Structure**: Each component has a specific responsibility
- **Scalable Architecture**: Easy to add new features and maintain existing code

### ✅ **Enhanced Authentication**
- **JWT-based Authentication**: Secure token-based authentication
- **Role-based Authorization**: Support for different user roles (user, admin, moderator)
- **Refresh Tokens**: Automatic token refresh mechanism
- **Password Security**: Strong password validation and bcrypt hashing

### ✅ **Input Validation**
- **Express-validator**: Comprehensive input validation
- **Custom Validation**: Business logic validation
- **Sanitization**: Input sanitization for security

### ✅ **Error Handling**
- **Global Error Handler**: Centralized error handling
- **Standardized Responses**: Consistent API response format
- **Async Error Handling**: Automatic error catching for async functions

### ✅ **Security Features**
- **Helmet**: Security headers
- **Rate Limiting**: Protection against brute force attacks
- **CORS Configuration**: Secure cross-origin requests
- **Input Sanitization**: Protection against XSS attacks

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp env.example .env
   ```
   
   Configure your `.env` file:
   ```env
   NODE_ENV=development
   PORT=5002
   MONGODB_URI=mongodb://localhost:27017/heart-hues
   JWT_SECRET=your-super-secret-jwt-key
   JWT_EXPIRE=7d
   JWT_REFRESH_EXPIRE=30d
   FRONTEND_URL=http://localhost:5173
   ```

4. **Start the server**
   ```bash
   # Development
   npm run dev
   
   # Production
   npm start
   ```

## 📡 API Endpoints

### Authentication Routes (`/api/auth`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| POST | `/signup` | Register new user | Public |
| POST | `/login` | User login | Public |
| POST | `/refresh` | Refresh access token | Public |
| POST | `/verify` | Verify token | Public |
| GET | `/me` | Get user profile | Private |
| PUT | `/profile` | Update user profile | Private |
| PUT | `/change-password` | Change password | Private |
| POST | `/logout` | User logout | Private |

### Product Routes (`/api/products`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| GET | `/` | Get all products | Public |
| GET | `/:id` | Get product by ID | Public |
| POST | `/` | Create product | Admin |
| PUT | `/:id` | Update product | Admin |
| DELETE | `/:id` | Delete product | Admin |

### Order Routes (`/api/orders`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| GET | `/` | Get user orders | Private |
| GET | `/:id` | Get order by ID | Private |
| POST | `/` | Create order | Private |
| PUT | `/:id` | Update order status | Admin |

### User Routes (`/api/users`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| GET | `/` | Get all users | Admin |
| GET | `/:id` | Get user by ID | Admin |
| PUT | `/:id` | Update user | Admin |
| DELETE | `/:id` | Delete user | Admin |

## 🔐 Authentication

### JWT Token Structure
```javascript
{
  "id": "user_id",
  "iat": "issued_at",
  "exp": "expiration_time"
}
```

### Authorization Headers
```javascript
Authorization: Bearer <jwt_token>
```

### Role-based Access
- **User**: Basic access to products and orders
- **Admin**: Full access to all resources
- **Moderator**: Limited admin access

## 📝 Response Format

### Success Response
```javascript
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

### Error Response
```javascript
{
  "success": false,
  "message": "Error description",
  "errors": [...] // Validation errors (if any)
}
```

### Paginated Response
```javascript
{
  "success": true,
  "message": "Data retrieved successfully",
  "data": [...],
  "pagination": {
    "currentPage": 1,
    "totalPages": 5,
    "totalItems": 50,
    "itemsPerPage": 10,
    "hasNextPage": true,
    "hasPrevPage": false
  }
}
```

## 🛠️ Development

### Adding New Routes

1. **Create Controller** (`controllers/newController.js`)
   ```javascript
   const asyncHandler = require('../utils/asyncHandler');
   const { successResponse } = require('../utils/responseHandler');
   
   const newFunction = asyncHandler(async (req, res) => {
     // Your logic here
     successResponse(res, 200, 'Success message', data);
   });
   
   module.exports = { newFunction };
   ```

2. **Create Validation** (`validators/new.js`)
   ```javascript
   const { body } = require('express-validator');
   
   const newValidation = [
     body('field').notEmpty().withMessage('Field is required')
   ];
   
   module.exports = { newValidation };
   ```

3. **Create Route** (`routes/new.js`)
   ```javascript
   const express = require('express');
   const router = express.Router();
   const { newFunction } = require('../controllers/newController');
   const { newValidation } = require('../validators/new');
   const { protect } = require('../middleware/auth');
   
   router.post('/', protect, newValidation, newFunction);
   
   module.exports = router;
   ```

4. **Register Route** (`server.js`)
   ```javascript
   const newRoutes = require('./routes/new');
   app.use('/api/new', newRoutes);
   ```

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | `development` |
| `PORT` | Server port | `5002` |
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/heart-hues` |
| `JWT_SECRET` | JWT secret key | `your-secret-key` |
| `JWT_EXPIRE` | JWT expiration time | `7d` |
| `JWT_REFRESH_EXPIRE` | Refresh token expiration | `30d` |
| `FRONTEND_URL` | Frontend URL for CORS | `http://localhost:5173` |

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch
```

## 📊 Monitoring

### Health Check
```bash
GET /api/health
```

Response:
```javascript
{
  "success": true,
  "message": "Heart & Hues API is running",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "environment": "development",
  "version": "1.0.0"
}
```

## 🔒 Security Considerations

- **Rate Limiting**: Prevents brute force attacks
- **Input Validation**: Prevents injection attacks
- **JWT Security**: Secure token handling
- **CORS Configuration**: Controlled cross-origin access
- **Helmet**: Security headers
- **Input Sanitization**: XSS protection

## 📈 Performance

- **Async/Await**: Non-blocking operations
- **Database Indexing**: Optimized queries
- **Response Caching**: Reduced server load
- **Error Handling**: Graceful error recovery

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License. 