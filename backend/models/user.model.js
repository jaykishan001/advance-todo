import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from 'crypto'
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    avatar: {
      type: {
        url: String,
        localpath: String,
      },
      default: {
        url: "http://placehold.com/600x400",
        localpath: "",
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    fullname: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    refreshToken: {
      type: String,
    },
    forgotPasswordToken: {
      type: String,
    },
    forgotPasswordExpiry: {
      type: Date,
    },
    emailVerificationToken: {
      type: String,
    },
    emailVerificationExpiry: {
      type: Date,
      // optional: to auto-delete document after expiry
      // expires: 300  // Uncomment if you want auto-expiry by MongoDB TTL index
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = async function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.ACCESS_TOKEN_EXPIRY,
    }
  );
};
userSchema.methods.generateRefreshToken = async function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.REFRESH_TOKEN_EXPIRY,
    }
  );
};

userSchema.methods.generateVerificationToken = async function(){
  const unhashedToken = crypto.randomBytes(20).toString("hex")
  const hashedToken = crypto.createHash("sha256").update(unhashedToken).digest("hex")
  const tokenExpiry = Date.now() + (20*60*1000) //20min
  return {unhashedToken, hashedToken, tokenExpiry}
}

export const User = mongoose.model("User", userSchema);
