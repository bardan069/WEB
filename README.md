# Heart & Hues - Innovative E-commerce Gift Platform

## 🎁 Project Overview

**Heart & Hues** is a cutting-edge e-commerce platform that revolutionizes the gift-giving experience through innovative features and modern technology. Built with React frontend and Node.js backend, this platform offers unique solutions that set it apart from traditional e-commerce sites.

### 🌟 Novel Features & Distinct Solutions

1. **AI-Powered Gift Recommendations** - Advanced algorithm that considers occasion, recipient type, budget, and personal preferences
2. **Gift Registry System** - Collaborative gift-giving for special events with real-time tracking
3. **Subscription Gift Boxes** - Curated monthly/quarterly gift deliveries with personalized themes
4. **Smart Personalization Engine** - Dynamic product customization with real-time preview
5. **Social Gifting** - Group gift contributions and shared experiences
6. **Intelligent Inventory Management** - Predictive stock management with automated alerts

## 🛠 Technology Stack

### Frontend
- **React 18** - Modern UI framework with hooks and context
- **Vite** - Fast build tool and development server
- **React Router** - Client-side routing
- **CSS3** - Modern styling with custom design system
- **React Icons** - Comprehensive icon library

### Backend
- **Node.js** - Server-side JavaScript runtime
- **Express.js** - Web application framework
- **PostgreSQL** - Relational database
- **Sequelize ORM** - Database abstraction layer
- **JWT** - Stateless authentication
- **bcryptjs** - Password hashing
- **express-validator** - Input validation

### Database
- **PostgreSQL** - Robust relational database
- **Advanced indexing** for performance
- **JSON fields** for flexible data storage

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL (v12 or higher)
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

4. **Set up PostgreSQL database**
   ```bash
   # Create database
   createdb heart_and_hues
   
   # Or using psql
   psql -U postgres
   CREATE DATABASE heart_and_hues;
   \q
   ```

5. **Configure environment variables**
   ```bash
   cd backend
   cp env.example .env
   ```
   
   Edit `.env` file with your database credentials:
   ```env
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=heart_and_hues
   DB_USER=postgres
   DB_PASSWORD=your_password
   JWT_SECRET=your-super-secret-jwt-key
   ```

6. **Seed the database**
   ```bash
   cd backend
   npm run seed
   ```

7. **Start the backend server**
   ```bash
   cd backend
   npm run dev
   ```

8. **Start the frontend development server**
   ```bash
   # In a new terminal
   npm run dev
   ```

9. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000
   - API Health Check: http://localhost:5000/api/health
   - API Documentation: http://localhost:5000/api/docs

## 📁 Project Structure

```
react100/
├── src/                    # Frontend source code
│   ├── components/         # React components
│   │   ├── layout/        # Layout components
│   │   ├── pages/         # Page components
│   │   └── ui/            # Reusable UI components
│   ├── context/           # React context providers
│   ├── constants/         # Application constants
│   ├── styles/            # Global styles
│   └── utils/             # Utility functions
├── backend/               # Backend source code
│   ├── config/           # Configuration files
│   ├── models/           # Database models
│   ├── routes/           # API routes
│   ├── middleware/       # Custom middleware
│   └── scripts/          # Database scripts
├── public/               # Static assets
└── README.md            # Project documentation
```

## 🔧 Available Scripts

### Frontend
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Backend
```bash
npm run dev          # Start development server with nodemon
npm start            # Start production server
npm run seed         # Seed database with sample data
npm run test         # Run tests
npm run migrate      # Run database migrations
```

## 🎯 Core Features

### 1. AI-Powered Gift Recommendations
- **Smart Algorithm**: Considers occasion, recipient type, budget, and preferences
- **Real-time Scoring**: Dynamic product ranking based on multiple factors
- **Personalized Reasoning**: Explains why each recommendation was chosen
- **Feedback Loop**: Improves recommendations based on user feedback

### 2. Gift Registry System
- **Event Management**: Create registries for weddings, birthdays, baby showers
- **Collaborative Gifting**: Multiple contributors can purchase items
- **Real-time Tracking**: Live updates on purchased vs. remaining items
- **Privacy Controls**: Public or private registry options

### 3. Subscription Gift Boxes
- **Themed Curations**: Monthly/quarterly boxes with specific themes
- **Personalization**: Custom preferences and recipient profiles
- **Flexible Scheduling**: Pause, resume, or cancel subscriptions
- **Quality Assurance**: Curated by gift experts

### 4. Advanced User Management
- **Secure Authentication**: JWT-based with bcrypt password hashing
- **Role-based Access**: User, Moderator, and Admin roles
- **Account Security**: Rate limiting, account locking, CSRF protection
- **Profile Customization**: Extensive user preferences and settings

### 5. Product Management
- **Rich Product Data**: Comprehensive product information and metadata
- **Smart Categorization**: Multi-level category system with tags
- **Inventory Management**: Real-time stock tracking with low-stock alerts
- **Personalization Options**: Text, images, colors, and engraving

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user profile
- `PUT /api/auth/profile` - Update user profile
- `PUT /api/auth/password` - Change password

### Products
- `GET /api/products` - Get all products with filtering
- `GET /api/products/featured` - Get featured products
- `GET /api/products/:id` - Get single product
- `GET /api/products/categories` - Get all categories

### Recommendations
- `POST /api/recommendations/generate` - Generate AI recommendations
- `GET /api/recommendations/:userId` - Get user recommendations
- `POST /api/recommendations/feedback` - Provide feedback

### Gift Registry
- `POST /api/registry/create` - Create gift registry
- `GET /api/registry/:registryId` - Get registry details
- `POST /api/registry/:registryId/contribute` - Contribute to registry
- `GET /api/registry/user/:userId` - Get user's registries

### Subscriptions
- `POST /api/subscriptions/create` - Create subscription
- `GET /api/subscriptions/:userId` - Get user subscriptions
- `PUT /api/subscriptions/:id/pause` - Pause subscription
- `PUT /api/subscriptions/:id/resume` - Resume subscription

## 🛡 Security Features

- **JWT Authentication** with secure token management
- **Password Hashing** using bcrypt with 12 rounds
- **Rate Limiting** to prevent abuse
- **Input Validation** and sanitization
- **CORS Protection** for cross-origin requests
- **Helmet.js** for security headers
- **Account Locking** after failed login attempts
- **CSRF Protection** for state-changing operations

## 📊 Database Schema

### Core Tables
- **users** - User accounts and profiles
- **products** - Product catalog with rich metadata
- **orders** - Order management and tracking
- **order_items** - Individual items in orders
- **gift_registries** - Registry management
- **registry_items** - Items in registries
- **subscriptions** - Subscription gift boxes
- **subscription_deliveries** - Delivery tracking

### Advanced Features
- **JSON fields** for flexible data storage
- **Comprehensive indexing** for performance
- **Foreign key relationships** for data integrity
- **Timestamps** for audit trails

## 🎨 Design System

### Color Palette
- **Primary**: #FF6B6B (Coral Red)
- **Secondary**: #4ECDC4 (Turquoise)
- **Accent**: #45B7D1 (Sky Blue)
- **Neutral**: #F7F7F7 (Light Gray)
- **Text**: #2C3E50 (Dark Blue Gray)

### Typography
- **Headings**: Modern sans-serif with bold weights
- **Body**: Clean, readable font with optimal line height
- **Responsive**: Scales appropriately across devices

### Components
- **Consistent spacing** and padding
- **Smooth animations** and transitions
- **Accessible design** with proper contrast
- **Mobile-first** responsive design

## 🚀 Deployment

### Frontend Deployment
```bash
npm run build
# Deploy dist/ folder to your hosting service
```

### Backend Deployment
```bash
# Set NODE_ENV=production
npm start
# Deploy to your server or cloud platform
```

### Database Deployment
- Use managed PostgreSQL service (AWS RDS, Google Cloud SQL, etc.)
- Set up proper backups and monitoring
- Configure connection pooling for production

## 🧪 Testing

### Frontend Testing
```bash
npm run test
```

### Backend Testing
```bash
cd backend
npm run test
```

### API Testing
- Use Postman or similar tool
- Test all endpoints with various scenarios
- Verify error handling and validation

## 📈 Performance Optimization

### Frontend
- **Code splitting** for faster initial load
- **Lazy loading** for components and routes
- **Image optimization** with proper formats
- **Caching strategies** for static assets

### Backend
- **Database indexing** for query optimization
- **Connection pooling** for database efficiency
- **Compression middleware** for response size
- **Rate limiting** to prevent abuse

## 🔮 Future Enhancements

1. **Mobile App** - Native iOS and Android applications
2. **Payment Integration** - Stripe, PayPal, and other gateways
3. **Email Marketing** - Automated campaigns and notifications
4. **Analytics Dashboard** - Advanced reporting and insights
5. **Multi-language Support** - Internationalization
6. **Advanced AI** - Machine learning for better recommendations
7. **Social Features** - User reviews, ratings, and sharing
8. **Inventory Automation** - Smart reordering and supplier integration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Team

- **Frontend Developer**: React, Vite, Modern JavaScript
- **Backend Developer**: Node.js, Express, PostgreSQL
- **UI/UX Designer**: Modern, accessible design system
- **DevOps**: Deployment and infrastructure management

## 📞 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the API documentation at `/api/docs`

---

**Heart & Hues** - Making gift-giving magical through technology and innovation! 🎁✨
