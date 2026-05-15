const db = require("../db");

exports.getAllCategories = (req, res) => {
  const sql = "SELECT * FROM categories";

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Error getting categories",
      });
    }

    res.json(result);
  });
};

exports.createCategory = (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({
      message: "Name is required",
    });
  }

  const sql = "INSERT INTO categories(name) VALUES (?)";

  db.query(sql, [name], (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Error creating category",
      });
    }

    res.json({
      message: "Category created",
    });
  });
};

exports.updateCategory = (req, res) => {
  const { name } = req.body;

  const sql = "UPDATE categories SET name=? WHERE id=?";

  db.query(sql, [name, req.params.id], (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Error updating category",
      });
    }

    res.json({
      message: "Category updated",
    });
  });
};

exports.deleteCategory = (req, res) => {
  const sql = "DELETE FROM categories WHERE id=?";

  db.query(sql, [req.params.id], (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Error deleting category",
      });
    }

    res.json({
      message: "Category deleted",
    });
  });
};