const validarUsuario = require("../middleware/userValidationMiddleware");
const usuarioRegistroSchema = require("../schemas/userSchemas");

const empleadoCtrl = require("../controllers/empleado.controller");

const express = require("express");

const empleadoRouter = express.Router();

empleadoRouter.get("/getEmpleadoById/:id", empleadoCtrl.getEmpleadoById);

empleadoRouter.post("/postEmpleado", validarUsuario(usuarioRegistroSchema), empleadoCtrl.postEmpleado);

empleadoRouter.delete("/deleteEmpleado/:id", empleadoCtrl.deleteEmpleado);

empleadoRouter.put("/putEmpleado/:id", validarUsuario(usuarioRegistroSchema), empleadoCtrl.putEmpleado);

empleadoRouter.get("/getAll", empleadoCtrl.getAllEmpleados);

module.exports = empleadoRouter;
