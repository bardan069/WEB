# Gift Shop Backend API

A comprehensive backend API for the Heart & Hues Gift Shop, built with Node.js, Express, and MongoDB.

## Features

- **Gift Management**: CRUD operations for gift products
- **User Authentication**: JWT-based authentication for customers and admins
- **Order Management**: Complete order processing and tracking
- **Shopping Cart**: Add, remove, and manage cart items
- **File Upload**: Image upload for gift products
- **Admin Dashboard**: Comprehensive admin interface

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **File Upload**: Multer
- **Security**: Helmet, XSS protection, CORS
- **Testing**: Mocha with Supertest

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd giftshop_backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
NODE_ENV=development
PORT=3000
LOCAL_DATABASE_URI=mongodb://127.0.0.1:27017/giftshop_db
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRE=30d
JWT_COOKIE_EXPIRE=30
```

4. Start the development server:
```bash
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/v1/customers/register` - Register a new customer
- `POST /api/v1/customers/login` - Customer login
- `POST /api/v1/customers/logout` - Customer logout
- `GET /api/v1/customers/me` - Get current customer profile

### Gifts
- `GET /api/v1/gifts` - Get all gifts
- `GET /api/v1/gifts/:id` - Get gift by ID
- `POST /api/v1/gifts` - Create new gift (admin only)
- `PUT /api/v1/gifts/:id` - Update gift (admin only)
- `DELETE /api/v1/gifts/:id` - Delete gift (admin only)

### Orders
- `POST /api/v1/orders` - Create new order
- `GET /api/v1/orders` - Get user orders
- `GET /api/v1/orders/:id` - Get order by ID
- `GET /api/v1/orders/admin/all` - Get all orders (admin only)

### Cart
- `POST /api/v1/cart/add` - Add item to cart
- `DELETE /api/v1/cart/remove/:id` - Remove item from cart
- `GET /api/v1/cart` - Get cart items

## Database Schema

### Gift Model
```javascript
{
  name: String,
  brand: String,
  category: String,
  description: String,
  price: Number,
  originalPrice: Number,
  discount: Number,
  images: [String],
  stock: Number,
  isAvailable: Boolean,
  isFeatured: Boolean,
  rating: Number,
  numReviews: Number,
  tags: [String],
  shippingInfo: Object
}
```

### Customer Model
```javascript
{
  fname: String,
  lname: String,
  email: String,
  password: String,
  phone: String,
  role: String (default: 'customer'),
  createdAt: Date
}
```

### Order Model
```javascript
{
  customer: ObjectId,
  items: [{
    gift: ObjectId,
    quantity: Number,
    price: Number
  }],
  shippingAddress: Object,
  paymentMethod: String,
  subtotal: Number,
  tax: Number,
  shippingCost: Number,
  totalAmount: Number,
  orderStatus: String,
  notes: String
}
```

## Testing

Run the test suite:
```bash
npm test
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| NODE_ENV | Environment mode | development |
| PORT | Server port | 3000 |
| LOCAL_DATABASE_URI | MongoDB connection string | mongodb://127.0.0.1:27017/giftshop_db |
| JWT_SECRET | JWT signing secret | - |
| JWT_EXPIRE | JWT expiration time | 30d |
| JWT_COOKIE_EXPIRE | JWT cookie expiration | 30 |

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## License

MIT License - see LICENSE file for details
