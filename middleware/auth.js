const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const token = req.header.authorization.split(" ")[1];
    const decode = jwt.verify(token, "147qer");

    req.user = decode;
    next();
  } catch (error) {
    res.json({
      msg: "Authentication Fails",
      error,
    });
  }
};

module.exports = auth;
