const db = require("../models");

const jwt = require("jsonwebtoken");

// import konfigurasi
const jwtConfig = require("../config/jwt");

// function history

// function middleware
const jwtAuthorization = (req, res, next) => {
  // baca token dari header dengan nama 'Authorization'
  const token = req.headers["authorization"];

  // jika tidak ada token, beri response error
  if (!token) {
    return res.status(401).json({
      message: "Token tidak ditemukan",
    });
  }

  // jika ada token
  try {
    // coba validasi & baca payload
    const decoded = jwt.verify(token, jwtConfig.JWT_SECRET);

    // jika cocok, simpan data user dari token ke property req.user
    req.user = decoded;

    next();
  } catch (err) {
    // jika tidak cocok, beri response error
    return res.status(401).json({
      message: "Token tidak valid",
    });
  }
};

const history = async (req, res) => {
  // jika bukan admin tolak
  if (req.user.role !== "admin") {
    res.json({ message: "Anda belum memiliki akses" });
  }

  try {
    const getDataHistoryAll = await db.user_game_history.findAll();

    res.json({ getDataHistoryAll });
  } catch (error) {}
};

module.exports = { jwtAuthorization, history };
