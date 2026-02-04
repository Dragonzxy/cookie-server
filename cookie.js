import mongoose from 'mongoose';

const cookieSchema = new mongoose.Schema({
  url: String,          // The page URL
  ua: String,           // User agent
  name: String,
  value: String,
  domain: String,
  path: String,
  expirationDate: Number,
  secure: Boolean,
  httpOnly: Boolean,
  sameSite: String,
  
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Cookie', cookieSchema);
