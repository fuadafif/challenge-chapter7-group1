const db = require("../models");

const room = async (req, res) => {
  try {
    const dataCheck = await db.user_game_room.findOne({
      where: { nama_room: req.body.nama_room },
    });

    // jika data kosong
    if (!dataCheck) {
      const data = await db.user_game_room.create({
        nama_room: req.body.nama_room,
        player1: req.body.player1,
        id_P1: req.user.id,
        id_user: req.user.id,
      });
      res.json({ message: "Room berhasil dibuat!" });
    }

    // jika player 1 sudah input tampilkan sudah daftar
    if (dataCheck.id_P1 == req.user.id) {
      res.json({ message: "Player 1 telah masuk ke dalam room" });
    }

    //    jika player dua kosong input data
    if (!dataCheck.player2) {
      const data = await db.user_game_room.update(
        {
          id_P2: req.user.id,
        },
        {
          where: { nama_room: req.body.nama_room },
        }
      );

      res.json({ message: "Player 2 telah masuk ke dalam room", data });
    }

    if (dataCheck.player2 && dataCheck.player1) res.json({ message: "Room sudah penuh!" });
  } catch (err) {
    res.json({ message: "data kosong" });
  }
};

module.exports = { room };

// jika room sudah ada
