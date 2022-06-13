// import jwt config
const jwtConfig = require("../config/jwt");

const jwt = require("jsonwebtoken");

const db = require("../models");

const login = async (req, res) => {
  const data = await db.user_game.findOne({
    where: { email: req.body.email },
  });

  if (!data.email == req.body.username && data.password == req.body.password) {
    res.json({ messase: "username atau password mungkin salah" });
  }

  const tokenPayload = {
    id: data.id,
    email: data.email,
    username: data.username,
    role: data.role,
  };

  const token = jwt.sign(tokenPayload, jwtConfig.JWT_SECRET);

  res.json({
    message: "token berhasil",
    token: token,
  });
};

module.exports = { login };
