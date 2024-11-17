const bcrypt = require("bcrypt");
const authCtrl = {};
const Usuario = require("../models/usuario");
const generateToken = require("../utils/generateToken");
const StatusCodes = require("http-status-codes");

authCtrl.login = async (req, res) => {
  if (!req.body.email && !req.body.contrasenia) {
    res.status(400).send({ ok: 0, message: "Bad Request" });
    return;
  }
  try {
    const usuario = await Usuario.findOne({ email: req.body.email });
    if (!usuario) {
      res.status(400).send({ ok: 0, message: "Wrong Credentials" });
      return;
    }
    const match = await bcrypt.compare(
      req.body.contrasenia,
      usuario.contrasenia
    );
    if (match) {
      const token = generateToken(JSON.stringify(usuario));
      res
        .cookie("token", token, {
          //domain: "https://localhost:4200",
          httpOnly: true,
        })
        .send(usuario)
        .status(200);
        return;
    }
    res.send({ok: 0, message: "Wrong Credentials"});
  } catch (err) {
    res
      .status(500)
      .send({ ok: 0, message: "Internal Server Error", error: err.message });
  }
};

authCtrl.logout = async (req, res) => {
  res.clearCookie("token");
  res.send({ message: "Logged out" });
};

authCtrl.register = async (req, res) => {
  if (!req.body) {
    res.status(400).send({ ok: 0, message: "Bad Request" });
    return;
  }
  try {
    const usuarioExistente = Usuario.findOne({ email: req.body.email });
    if (!usuarioExistente) {
      res.status(409).send({ ok: 0, message: "Usuario ya existe" });
      return;
    }
    const usuarioNuevo = new Usuario(req.body);
    usuarioNuevo.save();
    const token = generateToken(JSON.stringify(usuarioNuevo));
    res
      .cookie("token", token, {
        //domain: "http://localhost:4200",
        httpOnly: true,
      })
      .send(usuarioNuevo)
      .status(200);
    return;
  } catch (err) {
    res.status(500).send({ ok: 0, message: "Internal Server Error", error: err.message });
  }
};

module.exports = authCtrl;
