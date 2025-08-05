import express from "express";
import dotenv from "dotenv";
import { dbConnection } from "./src/config/dbConnection.js";
import userRoutes from "./src/routes/userRoutes.js";
import productRoutes from "./src/routes/productRoutes.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
const PORT = process.env.PORT;


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(express.json());

dbConnection();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use("/user", userRoutes);
app.use("/product", productRoutes);

app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
