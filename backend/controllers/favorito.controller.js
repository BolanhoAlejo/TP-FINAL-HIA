const Favorito = require("../models/favorito")

const favoritoCtrl = {};

favoritoCtrl.getFavoritos = async function (req, res) {
  try {
    const favorito = await Favorito.findById(req.params.id).populate('productos');
    res.status(200).send(favorito);
  } catch (e) {
    console.log(e);
    res.status(500).send({ok: 0, msg: "Internal Server Error", error: e});
  }
};

favoritoCtrl.putFavorito = async function (req, res) {
  if (!req.body) {
    res.status(400).send({ ok: 0, msg: "Bad Request"});
  }
  try {
    const favoritos = await Favorito.findById(req.params.id);
    favoritos.productos = []
    let aviso = "Productos agregados a favoritos"
    for(const prod of req.body.productos){
      if(!favoritos.productos.includes(prod)){
        favoritos.productos.push(prod);
      } else {
        aviso = "Omitidos algunos productos incluidos previamente"
      }
    }
    await favoritos.save(); 
    res.status(200).send({ ok: 1, message: "updated successfully", aviso: aviso});
  } catch (e) {
    console.log(e);
    res.status(500).send({ok: 0, msg: "Internal Server Error", error: e.message});
  }
};

module.exports = favoritoCtrl;
