const express = require("express");
const mysql = require("mysql2");
const app = express();
const bodyParser = require("body-parser");
const port = 5000;
const cors = require("cors");

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "quizify",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Mysql connected");
});

app.get("/categories", (req, res) => {
  const query = "SELECT * FROM categories";
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
    console.log(results);
  });
});

app.get("/categories/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);

  if (isNaN(id)) {
    return res.status(400).json({ error: "Geçersiz kategori ID'si" });
  }
  const query = `SELECT * FROM quiz_questions WHERE categoryId = ?`;

  db.query(query, [id], (err, results) => {
    if (err) {
      console.error("SQL Error:", err);
      return res.status(500).json({ error: err.message });
    }

    if (results.length === 0) {
      return res
        .status(404)
        .json({ error: "Bu kategoriye ait soru bulunamadı" });
    }

    res.json(results);
  });
});

app.get("/myQuizes/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);

  if (isNaN(id)) {
    console.log("Invalid ID received");
    return res.status(400).json({ error: "Geçersiz Quiz id'si" });
  }

  const query = `SELECT * FROM myquizes WHERE id=?`;

  console.log("Executing SQL Query:", query); // Debugging log

  db.query(query, [id], (err, results) => {
    if (err) {
      console.error("SQL Error:", err);
      return res.status(500).json({ error: err.message });
    }

    console.log("Query Results:", results); // Debugging log

    if (results.length === 0) {
      return res.status(404).json({ error: "Bu quize ait soru bulunamadı" });
    }

    res.json(results);
  });

  console.log("Query Sent to Database"); // Debugging log
});

app.get("/myQuizes", (req, res) => {
  const query = "SELECT title,id FROM myquizes";
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
    console.log(results);
  });
});

app.listen(port, () => {
  console.log(`server running on ${port}`);
});
