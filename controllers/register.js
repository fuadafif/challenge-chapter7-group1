//
const db = require("../models");

const register = async (req, res) => {
    const data = db.user_game.create(
        {
            email: req.body.email,
            password: req.body.password,
            role: req.body.role,

            // biodata user
            user_game_biodatum: {
                name: req.body.name,
            },
        },
        {
            include: {
                model: user_game_biodata,
            },
        }
    );

    res.status(401).json({ message: "User is added successful", data });
};
