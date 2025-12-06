const express = require("express");

const cors = require("cors");

const bookRoutes = require("./routes/bookRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/books", bookRoutes);

app.listen(5000, () => {
  console.log("server running in 5000 ");
});
