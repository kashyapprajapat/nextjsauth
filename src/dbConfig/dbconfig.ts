import mongoose from "mongoose";

export async function connectDB() {
  try {
    mongoose.connect(process.env.MONGODB_URL!);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("MongoDB Connected Sucessfully..");
    });

    connection.on("error", (err) => {
      console.log(
        "mongodb connection error,please make sure db is up & running" + err
      );
      process.exit();
    });
  } catch (error) {
    console.error(error);
    console.log("Error to connect database.");
  }
}
