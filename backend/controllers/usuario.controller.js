const Favorito = require('../models/favorito');
const Usuario = require('../models/usuario');

const usuarioCtrl = {}

usuarioCtrl.getAllUsuarios = async function(req, res) {
    const usuarios = await Usuario.find({});
    res.status(200).send(usuarios);
}


usuarioCtrl.getUsuarioById = async function (req, res) {
  if (!req.params.id) {
    res.status(400).send({ ok: 0, msg: "Bad Request"});
  }
  try {
    const usuario = await Usuario.findById(req.params.id);
    res.status(200).send(usuario);
  } catch (e) {
    console.log(e);
    res.status(500).send({ok: 0, msg: "Internal Server Error", error: e});
  }
};

usuarioCtrl.postUsuario = async function (req, res) {
  if (!req.body) {
    res.status(400).send({ ok: 0, msg: "Bad Request"});
  }
  try {
    const usuario = new Usuario(req.body);
    const favoritos = new Favorito()
    favoritos.save()
    usuario.favoritos = favoritos._id
    await usuario.save();
    res.status(201).send(usuario);
  } catch (e) {
    console.log(e);
    res.status(500).send({ok: 0, msg: "Internal Server Error", error: e});
  }
};

usuarioCtrl.deleteUsuario = async function (req, res) {
  if (!req.params.id) {
    res.status(400).send({ ok: 0, msg: "Bad Request"});
  }
  try {
    await Usuario.findByIdAndDelete(req.params.id);
    res.status(200).send({ ok: 1, message: "deleted successfully" });
  } catch (e) {
    console.log(e);
    res.status(500).send({ok: 0, msg: "Internal Server Error", error: e});
  }
};

usuarioCtrl.putUsuario = async function (req, res) {
  try {
    if (!req.body) {
      return res.status(400).send({ ok: 0, msg: "Bad Request" });
    }

    const usuario = await Usuario.findByIdAndUpdate(req.body._id, req.body, { new: true });

    if (!usuario) {
      return res.status(404).send({ ok: 0, msg: "Usuario no encontrado" });
    }

    res.status(200).send({ ok: 1, msg: "Usuario actualizado exitosamente", usuario });
  } catch (e) {
    console.error("Error al actualizar usuario:", e);
    res.status(500).send({ ok: 0, msg: "Error interno del servidor", error: e });
  }
};

module.exports = usuarioCtrl;
