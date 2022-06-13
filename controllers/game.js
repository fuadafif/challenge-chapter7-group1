const db = require("../models");
let i = 0;
const game = async (req, res) => {
  try {
    const { choiceP1, choiceP2 } = req.body;

    // fungsi dapatkan result
    function getResult(player1, player2) {
      if (player1 == player2) return "DRAW!";
      if (player1 == "scissors") return player2 == "paper" ? "YOU WIN!" : "YOU LOSE!";
      if (player1 == "paper") return player2 == "scissors" ? "YOU LOSE!" : "YOU WIN!";
      if (player1 == "rock") return player2 == "scissors" ? "YOU WIN!" : "YOU LOSE!";
      return "salah input";
    }

    const dataRoom = await db.user_game_room.findOne({
      where: { nama_room: req.body.nama_room },
    });

    // check data room jika tidak ada
    if (!dataRoom) {
      res.json({ message: "room belum di buat", room: "room kosong" });
    }

    // pemrosesan data player 1
    if (choiceP1) {
      const choiceP1Array = (await dataRoom.choiceP1) || [];
      choiceP1Array.push(choiceP1);

      const dataRoomchoice = await db.user_game_room.update(
        {
          choiceP1: choiceP1Array,
        },
        { where: { nama_room: req.body.nama_room } }
      );

      // tolak jika player1 menginput lebih dari tiga kali
      if (dataRoom.choiceP1.length >= 3) res.json({ message: "kamu sudah menginput 3" });

      res.json(dataRoom);
    }

    // pemrosesan data player 2
    if (choiceP2) {
      // ambil choiceP2 dan simpan kedalam variable
      const choiceP2Array = dataRoom.choiceP2 || [];
      choiceP2Array.push(choiceP2);

      // mengisi choiceP2 --> update
      let dataRoomchoice = await db.user_game_room.update(
        {
          choiceP2: choiceP2Array,
        },
        { where: { nama_room: req.body.nama_room } }
      );

      const dataFight = await db.user_game_history.findOne({
        where: { id_user: req.user.id },
      });

      // cari data fight
      // jika kosong tulis
      if (!dataFight) {
        let resultP1 = [];
        let resultP2 = [];
        resultP1.push(getResult(dataRoom.choiceP1[i], choiceP2));
        resultP2.push(getResult(choiceP2, dataRoom.choiceP1[i]));

        const resultFight = await db.user_game_history.create({
          resultP1: resultP1,
          resultP2: resultP2,
          id_user: req.user.id,
        });
      } else if (dataFight) {
        let resultP1 = dataFight.resultP1;
        let resultP2 = dataFight.resultP2;
        resultP1.push(getResult(dataRoom.choiceP1[i], choiceP2));
        resultP2.push(getResult(choiceP2, dataRoom.choiceP1[i]));

        const updateFight = await db.user_game_history.update(
          {
            resultP1,
            resultP1,
            resultP2,
            resultP2,
          },
          {
            where: { id_user: req.user.id },
          }
        );
      }
      i++;

      // jika player menginput lebih dari tiga kali tolak
      if (dataRoom.choiceP2.length >= 3) res.json({ message: "kamu sudah menginput 3" });

      res.json({ message: "data berresult di tambah" });
    }
  } catch (err) {
    res.json({ message: "terjadi error", err });
  }
};

module.exports = { game };
