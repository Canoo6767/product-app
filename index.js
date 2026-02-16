import dotenv from "dotenv";
import express from "express";
import connectDB from "./db.js";
import { register, login } from "./controllers/authController.js";
import {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct
} from "./controllers/productController.js";
import { protect } from "./middleware/authMiddleware.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

// Conexión a la base de datos
connectDB();

// Middleware para parsear JSON
app.use(express.json());

// Rutas de autenticación
app.post("/register", register);
app.post("/login", login);

// Rutas de productos (protegidas con JWT)
app.post("/products", protect, createProduct);
app.get("/products", protect, getProducts);
app.put("/products/:id", protect, updateProduct);
app.delete("/products/:id", protect, deleteProduct);

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("Servidor conectado a MongoDB 🚀");
});

// Levantar servidor
app.listen(port, () => console.log(`Server running on port ${port}`));

export default app; // Export para pruebas con Jest
