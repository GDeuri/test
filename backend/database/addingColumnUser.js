import mongoose from 'mongoose';
import { User } from '../models/userModel.js'; // Adjust the path if necessary

const DATABASE_URL = process.env.MONGO_URL || 'mongodb+srv://gyanjyotideuri8:Gyan1234@cluster0.cyeyv.mongodb.net/';

mongoose.connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('Connected to MongoDB');

    // Update all existing users to include the `age` field with a default value
    await User.updateMany({}, { $set: { registrationId: null } });

    console.log('Added age field to all existing documents');
    mongoose.connection.close();
  })
  .catch(err => {
    console.error('Error connecting to MongoDB', err);
  });