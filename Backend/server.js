import express from "express";
import dotenv from "dotenv";
import { dbConnection } from "./src/config/dbConnection.js";
import userRoutes from "./src/routes/userRoutes.js";
import productRoutes from "./src/routes/productRoutes.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT;
app.use(express.json());
dbConnection();

app.use("/user", userRoutes);
app.use("/product", productRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
