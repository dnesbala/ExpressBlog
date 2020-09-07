const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRoutes");

const app = express();

const PORT = process.env.PORT || 3000;
const dbURI =
  "YOUR_DB_URI";
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(app.listen(PORT))
  .catch((err) => console.log(err));

app.set("view engine", "ejs");

app.use(express.static("public"));
// app.use(morgan("dev"));

// Body parser
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

// Blog Routes
app.use("/blogs", blogRoutes);

app.use((req, res) => {
  res.status(404).render("404", { title: "Page not found" });
});
