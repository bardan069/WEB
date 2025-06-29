# Heart & Hues - Gift Shop Application

A beautiful and modern gift shop application built with React frontend and Node.js backend.

## Features

### Frontend Features
- 🎨 Modern, responsive UI with beautiful design
- 🔐 User authentication (login/signup)
- 🛒 Shopping cart functionality
- 📱 Mobile-friendly design
- 🎯 Product browsing and filtering
- ⭐ Product reviews and ratings
- 👤 User profile management
- 💳 Checkout process
- 🔍 Search functionality
- 📋 Order history

### Backend Features
- 🔐 JWT-based authentication
- 🗄️ MongoDB database with Mongoose ODM
- 📦 RESTful API endpoints
- ✅ Input validation and sanitization
- 🔒 Role-based access control (Admin/User)
- 📊 Order management system
- 🛡️ Security middleware (Helmet, CORS, Rate limiting)
- 📝 Comprehensive error handling
- 🎯 Product management with categories
- 👥 User management system

## Tech Stack

### Frontend
- **React 19** - UI library
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **React Hot Toast** - Notifications
- **React Icons** - Icon library
- **Vite** - Build tool

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **express-validator** - Input validation
- **Helmet** - Security middleware
- **CORS** - Cross-origin resource sharing

## Project Structure

```
react100/
├── src/                          # Frontend source code
│   ├── components/               # React components
│   │   ├── HomePage.jsx         # Main homepage
│   │   ├── LoginPage.jsx        # Login form
│   │   ├── SignupPage.jsx       # Registration form
│   │   ├── ProductPage.jsx      # Product details
│   │   ├── CartPage.jsx         # Shopping cart
│   │   └── ProfilePage.jsx      # User profile
│   ├── context/                 # React context providers
│   │   ├── AuthContext.jsx      # Authentication state
│   │   └── CartContext.jsx      # Shopping cart state
│   ├── App.jsx                  # Main app component
│   └── main.jsx                 # App entry point
├── backend/                     # Backend source code
│   ├── models/                  # Database models
│   │   ├── User.js             # User model
│   │   ├── Product.js          # Product model
│   │   └── Order.js            # Order model
│   ├── routes/                 # API routes
│   │   ├── auth.js             # Authentication routes
│   │   ├── products.js         # Product routes
│   │   ├── orders.js           # Order routes
│   │   └── users.js            # User management routes
│   ├── middleware/             # Custom middleware
│   │   └── auth.js             # Authentication middleware
│   ├── server.js               # Express server
│   ├── package.json            # Backend dependencies
│   └── env.example             # Environment variables template
├── package.json                # Frontend dependencies
└── README.md                   # This file
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd react100
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

4. **Set up environment variables**
   ```bash
   cd backend
   cp env.example .env
   ```
   
   Edit the `.env` file with your configuration:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/heart-hues
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   JWT_EXPIRE=7d
   FRONTEND_URL=http://localhost:5173
   ```

5. **Start MongoDB**
   - If using local MongoDB: `mongod`
   - If using MongoDB Atlas: Update the connection string in `.env`

6. **Start the backend server**
   ```bash
   cd backend
   npm run dev
   ```

7. **Start the frontend development server**
   ```bash
   # In a new terminal, from the root directory
   npm run dev
   ```

8. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000
   - API Health Check: http://localhost:5000/api/health

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update user profile
- `POST /api/auth/change-password` - Change password

### Products
- `GET /api/products` - Get all products (with filtering/pagination)
- `GET /api/products/featured` - Get featured products
- `GET /api/products/categories` - Get all categories
- `GET /api/products/:id` - Get single product
- `POST /api/products/:id/reviews` - Add product review
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders` - Get user orders
- `GET /api/orders/:id` - Get single order
- `PUT /api/orders/:id/status` - Update order status (Admin)
- `POST /api/orders/:id/cancel` - Cancel order

### Users (Admin)
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user
- `POST /api/users/:id/wishlist` - Add to wishlist
- `DELETE /api/users/:id/wishlist/:productId` - Remove from wishlist
- `GET /api/users/:id/wishlist` - Get user wishlist

## Usage

### For Users
1. **Browse Products**: Visit the homepage to see featured products
2. **Create Account**: Sign up for a new account
3. **Add to Cart**: Click "Add to Cart" on any product
4. **Checkout**: Go to cart and complete the checkout process
5. **Track Orders**: View order history in your profile

### For Admins
1. **Manage Products**: Add, edit, or delete products
2. **Manage Orders**: Update order status and track shipments
3. **Manage Users**: View and manage user accounts
4. **Analytics**: Monitor sales and user activity

## Development

### Frontend Development
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint
```

### Backend Development
```bash
# Start development server with nodemon
npm run dev

# Start production server
npm start
```

### Database Seeding
To populate the database with sample data, you can create a seeding script:

```javascript
// backend/scripts/seed.js
const mongoose = require('mongoose');
const Product = require('../models/Product');
const User = require('../models/User');

// Add sample products and users
// Run with: node scripts/seed.js
```

## Deployment

### Frontend Deployment
1. Build the project: `npm run build`
2. Deploy the `dist` folder to your hosting service (Vercel, Netlify, etc.)

### Backend Deployment
1. Set up environment variables on your hosting platform
2. Deploy to platforms like Heroku, Railway, or DigitalOcean
3. Ensure MongoDB connection is configured

## Security Features

- JWT token authentication
- Password hashing with bcrypt
- Input validation and sanitization
- CORS protection
- Rate limiting
- Helmet security headers
- Role-based access control

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please open an issue in the repository or contact the development team.

---

**Heart & Hues** - Making every gift special! 🎁
