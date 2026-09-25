const express = require("express");
const cors = require("cors");
const path = require("path");

const authRoutes = require("./routes/authRoutes");
const bookRoutes = require("./routes/bookRoutes");
const libraryRoutes = require("./routes/libraryRoutes");
const userRoutes = require("./routes/userRoutes");
const contactRoutes = require("./routes/contactRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/books-pdfs", express.static(path.join(__dirname, "public/books-pdfs")));

app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/library", libraryRoutes);
app.use("/api/users", userRoutes);
app.use("/api/contact", contactRoutes);

// M6 needs this: liveness/readiness check + commit SHA
app.get("/health", (req, res) => {
  res.json({ status: "ok", commit: process.env.GIT_COMMIT || "unknown" });
});

// M6 needs this: Prometheus scrapes this endpoint
let requestCount = 0;
app.use((req, res, next) => { requestCount += 1; next(); });
app.get("/metrics", (req, res) => {
  res.set("Content-Type", "text/plain");
  res.send(`# HELP http_requests_total Total HTTP requests received\n# TYPE http_requests_total counter\nhttp_requests_total ${requestCount}\n`);
});

app.use((req, res) => res.status(404).json({ message: "Route not found" }));
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong on the server" });
});

module.exports = app;