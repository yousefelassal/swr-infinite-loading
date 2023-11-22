import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

console.log('connecting to', MONGODB_URI);

async function connectDB() {
    try {
        await mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('connected to MongoDB');
    } catch (error) {
        console.log('error connecting to MongoDB:', error.message);
    }
}

export default connectDB;