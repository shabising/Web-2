const db = require("../db");

exports.getAllProducts = (req, res) => {
  const sql = `
    SELECT products.*, categories.name AS category_name
    FROM products
    JOIN categories
    ON products.category_id = categories.id
  `;

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Error getting products",
      });
    }

    res.json(result);
  });
};

exports.getProductById = (req, res) => {
  const sql = "SELECT * FROM products WHERE id=?";

  db.query(sql, [req.params.id], (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Error",
      });
    }

    res.json(result[0]);
  });
};

exports.createProduct = (req, res) => {
  const { name, price, category_id } = req.body;

  if (!name || !price || !category_id) {
    return res.status(400).json({
      message: "Missing fields",
    });
  }

  const sql =
    "INSERT INTO products(name, price, category_id) VALUES (?, ?, ?)";

  db.query(sql, [name, price, category_id], (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Error creating product",
      });
    }

    res.json({
      message: "Product created",
    });
  });
};

exports.updateProduct = (req, res) => {
  const { name, price, category_id } = req.body;

  const sql =
    "UPDATE products SET name=?, price=?, category_id=? WHERE id=?";

  db.query(
    sql,
    [name, price, category_id, req.params.id],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Error updating product",
        });
      }

      res.json({
        message: "Product updated",
      });
    }
  );
};

exports.deleteProduct = (req, res) => {
  const sql = "DELETE FROM products WHERE id=?";

  db.query(sql, [req.params.id], (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Error deleting product",
      });
    }

    res.json({
      message: "Product deleted",
    });
  });
};