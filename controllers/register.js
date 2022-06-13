// import models
const db = require("../models");
// import konfigurasi
const jwtConfig = require("../config/jwt");

const register = async (req, res) => {
  // user should input "rolekey" to json to register as Admin
  const rolekey = req.body.rolekey;

  // apabila rolekey kosong maka : register as USER
  if (!rolekey) {
    const data = await db.user_game.create({
      email: req.body.email,
      password: req.body.password,
      role: "user",
    });
    return res.json({ message: "Anda berhasil terdaftar sebagai User", data });
  } else {
    // apabila rolekey salah maka : ulangi register
    if (rolekey != jwtConfig.ROLEKEY_SECRET) {
      return res.json({ message: "Rolekey yang anda berikan salah!" });
      // apabila rolekey benar maka : register as ADMIN
    } else {
      const data = await db.user_game.create({
        email: req.body.email,
        password: req.body.password,
        role: "admin",
      });
      return res.json({ message: "Anda berhasil terdaftar sebagai Admin", data });
    }
  }
};

module.exports = { register };
