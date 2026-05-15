const express = require("express");

const categoryRoutes = require("./routes/categoryRoutes");

const productRoutes = require("./routes/productRoutes");

const authRoutes = require("./routes/authRoutes");

const app = express();

const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("E-commerce API is running");
});

app.use("/categories", categoryRoutes);

app.use("/products", productRoutes);

app.use("/", authRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});