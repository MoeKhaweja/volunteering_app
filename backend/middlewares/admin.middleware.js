const User = require("../models/user.model");

const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email }).select(
      "-password"
    );
    req.user = user;

    if (req.user.role == "admin") {
      next();
    } else {
      return res.status(400).json({ error: "Forbidden" });
    }
  } catch {
    return res.status(400).json({ error: "Forbidden" });
  }
};

module.exports = {
  isAdmin,
};
