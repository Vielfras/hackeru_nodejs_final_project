// User.js

const mongoose = require("mongoose");
const { addressSchema, imageSchema, nameSchema } = require("./common");


const userSchema = new mongoose.Schema(
  {
    name: nameSchema,
    phone: String,
    email: { type:String, unique:true },
    password: String,
    image: imageSchema,
    address: addressSchema,
    isAdmin: Boolean,
    isBusiness: Boolean,
    
    loginAttempts: { type: Number, default: 0 },
    isBlocked: { type: Boolean, default: false },
    blockExpires: { type: Date, default: null },
  },
  {
    timestamps: true,
  }
);


const User = mongoose.model("User", userSchema);

module.exports = User;
