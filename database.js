import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(`mongodb+srv://thedragonboyz79:ZTv68sMCW6CIo3aV@cluster0.dldrd1j.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`, {

    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

export default connectDB;
 