import mongoose from 'mongoose';

export const connectDb = async () => {
  mongoose.set('strictQuery', true);
  mongoose.set('strictPopulate', true);
  let isConnected = false;
  if (isConnected) {
    console.log('MongoDb is connected');
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO);
    isConnected = true;
    console.log('Mongo Db is Connected.');
  } catch (error) {
    console.log(error);
  }
};
