import express from "express";
import apiRoute, { apiProtected } from "./routes/api.js";
import mongoose from "mongoose";
import { connectDB } from "./utils/constant.js";
import AuthMiddleware from "./middlewares/AuthMiddleware.js";
import cors from 'cors';
const app = express();

const PORT = 7000;

//middleware to parse

mongoose.connect(connectDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors());
app.use(express.json());
app.use("/api/", apiRoute);
app.use('/api',AuthMiddleware,apiProtected);

app.listen(PORT, () => {
  console.log("Server started at port 7000");
});
