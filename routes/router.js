const express = require("express");
const router = express.Router();

// memanggil file route
const index = require("../controllers/index");

// membaca route
router.get("/", index.index);

// modul ekspor
module.exports = router;
