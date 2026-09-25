// Must be used AFTER authMiddleware, so req.user already exists
const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Admin access denied" });
  }
};

module.exports = adminOnly;
