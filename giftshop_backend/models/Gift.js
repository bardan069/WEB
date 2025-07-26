const mongoose = require("mongoose");

const giftSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: true,
      trim: true 
    },
    brand: { 
      type: String, 
      trim: true 
    },
    category: { 
      type: String, 
      required: true, 
      enum: ["Toys", "Flowers", "Personalized", "Accessories", "Home Decor", "Chocolates", "Greeting Cards", "Other"] 
    },
    description: { 
      type: String, 
      required: true 
    },
    price: { 
      type: Number, 
      required: true,
      min: 0 
    },
    originalPrice: { 
      type: Number,
      min: 0 
    },
    discount: { 
      type: Number, 
      default: 0,
      min: 0,
      max: 100 
    },
    images: [{ 
      type: String, 
      required: true 
    }],
    stock: { 
      type: Number, 
      required: true, 
      default: 0,
      min: 0 
    },
    isAvailable: { 
      type: Boolean, 
      default: true 
    },
    isFeatured: { 
      type: Boolean, 
      default: false 
    },
    rating: { 
      type: Number, 
      default: 0,
      min: 0,
      max: 5 
    },
    numReviews: { 
      type: Number, 
      default: 0 
    },
    tags: [{ 
      type: String 
    }],
    shippingInfo: {
      weight: { type: Number },
      dimensions: { type: String },
      shippingCost: { type: Number, default: 0 }
    }
  },
  { 
    timestamps: true 
  }
);

giftSchema.index({ name: 'text', description: 'text' });

module.exports = mongoose.model("Gift", giftSchema); 