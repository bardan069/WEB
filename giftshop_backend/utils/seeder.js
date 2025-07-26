const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Gift = require("../models/Gift");
const Customer = require("../models/Customer");

// Load env vars
console.log("Loading environment variables...");
dotenv.config({ path: "./config/config.env" });
console.log("Connecting to MongoDB:", process.env.LOCAL_DATABASE_URI);

// Connect to DB
mongoose.connect(process.env.LOCAL_DATABASE_URI).then(() => {
  console.log("Connected to MongoDB");
}).catch(err => {
  console.error("MongoDB connection error:", err);
});

// Sample gift data
const gifts = [
  {
    name: "Teddy Bear",
    brand: "GiftCo",
    category: "Toys",
    description: "A soft and cuddly teddy bear, perfect for all ages.",
    price: 19.99,
    originalPrice: 24.99,
    discount: 20,
    images: ["teddy_bear.jpg"],
    stock: 50,
    isAvailable: true,
    isFeatured: true,
    rating: 4.8,
    numReviews: 45,
    tags: ["teddy", "bear", "soft toy"],
    shippingInfo: { weight: 0.5, dimensions: "20x15x10cm", shippingCost: 2.99 }
  },
  {
    name: "Flower Bouquet",
    brand: "FloraGifts",
    category: "Flowers",
    description: "A beautiful bouquet of fresh flowers to brighten anyone's day.",
    price: 29.99,
    originalPrice: 34.99,
    discount: 14,
    images: ["flower_bouquet.jpg"],
    stock: 30,
    isAvailable: true,
    isFeatured: true,
    rating: 4.9,
    numReviews: 60,
    tags: ["flowers", "bouquet", "fresh"],
    shippingInfo: { weight: 0.7, dimensions: "40x20x20cm", shippingCost: 4.99 }
  },
  {
    name: "Personalized Mug",
    brand: "MugMagic",
    category: "Personalized",
    description: "A custom mug with your own message or photo.",
    price: 14.99,
    originalPrice: 19.99,
    discount: 25,
    images: ["personalized_mug.jpg"],
    stock: 100,
    isAvailable: true,
    isFeatured: false,
    rating: 4.7,
    numReviews: 32,
    tags: ["mug", "personalized", "custom"],
    shippingInfo: { weight: 0.3, dimensions: "10x10x10cm", shippingCost: 1.99 }
  },
  {
    name: "Chocolate Box",
    brand: "SweetTreats",
    category: "Chocolates",
    description: "A box of assorted premium chocolates.",
    price: 24.99,
    originalPrice: 29.99,
    discount: 17,
    images: ["chocolate_box.jpg"],
    stock: 40,
    isAvailable: true,
    isFeatured: false,
    rating: 4.6,
    numReviews: 28,
    tags: ["chocolate", "sweets", "box"],
    shippingInfo: { weight: 0.4, dimensions: "15x15x5cm", shippingCost: 2.49 }
  }
];

// Sample admin user
const adminUser = {
  fname: "Admin",
  lname: "User",
  phone: 1234567890,
  email: "admin@admin.com",
  password: "admin123",
  role: "admin"
};

// Import data
const importData = async () => {
  try {
    console.log("Deleting existing gifts and customers...");
    await Gift.deleteMany();
    await Customer.deleteMany({ email: adminUser.email });
    console.log("Inserting admin user...");
    const admin = new Customer(adminUser);
    await admin.save();
    console.log("Inserting gifts...");
    await Gift.create(gifts);
    console.log("Data imported successfully");
    process.exit();
  } catch (error) {
    console.error("Error importing data:", error);
    process.exit(1);
  }
};

// Delete data
const destroyData = async () => {
  try {
    console.log("Deleting all gifts and customers...");
    await Gift.deleteMany();
    await Customer.deleteMany();
    console.log("Data destroyed successfully");
    process.exit();
  } catch (error) {
    console.error("Error destroying data:", error);
    process.exit(1);
  }
};

// Handle command line arguments
if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
} 