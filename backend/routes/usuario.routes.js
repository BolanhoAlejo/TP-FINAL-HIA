const express = require("express");
const validarUsuario = require("../middleware/userValidationMiddleware");
const usuarioRegistroSchema  = require("../schemas/userSchemas");
const usuarioCtrl = require("../controllers/usuario.controller");
const verifyToken = require("../middleware/authValidationMiddleware");

const usuarioRouter = express.Router();

usuarioRouter.get("/getUsuarioById/:id", usuarioCtrl.getUsuarioById);

usuarioRouter.post("/postUsuario", validarUsuario(usuarioRegistroSchema), usuarioCtrl.postUsuario);

usuarioRouter.delete("/deleteUsuario/:id", usuarioCtrl.deleteUsuario);

usuarioRouter.put("/putUsuario/:id", validarUsuario(usuarioRegistroSchema), usuarioCtrl.putUsuario);

usuarioRouter.get("/getAll", verifyToken, usuarioCtrl.getAllUsuarios);

module.exports = usuarioRouter;
