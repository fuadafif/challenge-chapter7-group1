// import jwt
const jwt = require('jsonwebtoken');

// import konfigurasi
const jwtConfig = require('../config/jwt');

// middleware verifikasi & ambil data user dari token jwt
// akan dipasang di route yang ingin di proteksi
const jwtAuthorization = (req, res, next) => {
  // baca token dari header dengan nama 'Authorization'
  const token = req.headers['authorization'];

  // jika tidak ada token, beri response error
  if (!token) {
    return res.status(401).json({
      message: 'Token tidak ditemukan',
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
      message: 'Token tidak valid',
    });
  }
}

module.exports = {
  jwtAuthorization,
}