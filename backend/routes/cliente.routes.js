const validarUsuario = require("../middleware/userValidationMiddleware");
const usuarioRegistroSchema  = require("../schemas/userSchemas");
const clienteCtrl = require("../controllers/cliente.controller");

const express = require("express");

const clienteRouter = express.Router();

clienteRouter.get("/getClienteById/:id", clienteCtrl.getClienteById);

clienteRouter.post("/postCliente", validarUsuario(usuarioRegistroSchema), clienteCtrl.postCliente);

clienteRouter.delete("/deleteCliente/:id", clienteCtrl.deleteCliente);

clienteRouter.put("/putCliente/:id", validarUsuario(usuarioRegistroSchema), clienteCtrl.putCliente);

clienteRouter.get("/getAll", clienteCtrl.getAllClientes);

module.exports = clienteRouter;
