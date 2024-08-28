import mongoose from "mongoose";
const DB_NAME = "tooodooo";




const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGO_DB_URI}/${DB_NAME}`
    );
    console.log(
      `\n MONGO DB CONNECTED !! DB HOST : ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("MONGO_DB CONNECTION ERROR", error);
    process.exit(1);
  }
};

connectDB()

const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Todo =  mongoose.model("Todo", todoSchema);
