const express = require("express");
const router = express.Router();
const controller = require("../controllers/bookController");

// GET /api/books
router.get("/", controller.getBooks);
router.post("/", controller.createBook);

module.exports = router;
