import mongoose from "mongoose";

let isConnected = false;

export const connectDB = async () => {
  mongoose.set("strict", true);

  if (!process.env.MONGODB_URL) {
    return console.log("url not found");
  }

  if (isConnected) {
    return console.log("connected");
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL);

    isConnected = true;

    console.log("COnnected");
  } catch (error) {
    console.log(error);
  }
};
