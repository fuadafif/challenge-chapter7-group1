// import jwt
const jwt = require("jsonwebtoken");

// import konfigurasi
const jwtConfig = require("../config/jwt");

// import data user
const db = require("../models");

// fungsi login
const login = async (req, res) => {
    const data = await db.user_game.findOne({
        where: { username: req.body.username },
    });

    // jika user dan password tidak sesuai
    if (!data.username == req.body.nama && data.password == req.body.password) {
        return res
            .status(401)
            .json({ messase: "username or password is incorrect" });
    }

    const tokenPayload = {
        id: data.id,
        nama: data.nama,
        role: data.role,
    };

    const token = jwt.sign(tokenPayload, jwtConfig.JWT_SECRET);

    res.json({
        message: "token berhasil",
        token: token,
    });
};

module.exports = login;
