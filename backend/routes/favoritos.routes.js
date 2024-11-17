const express = require("express");
const favoritosCtrl = require("../controllers/favorito.controller");

const router = express.Router();

router.get("/getFavoritos/:id", favoritosCtrl.getFavoritos);

router.put("/putFavorito/:id", favoritosCtrl.putFavorito);

module.exports = router;