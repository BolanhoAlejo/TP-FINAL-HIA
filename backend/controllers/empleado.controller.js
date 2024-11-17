const Empleado = require("../models/empleado");
// const { updateEmpleado } = require("../utils/Handlers/empleadoHandler");

const empleadoCtrl = {};

empleadoCtrl.getAllEmpleados = async function(req, res) {
    const empleados = await Empleado.find({});
    res.status(200).send(empleados);
}

empleadoCtrl.getEmpleadoById = async function (req, res) {
  if (!req.params.id) {
    res.status(400).send({ ok: 0, msg: "Bad Request"});
  }
  try {
    const empleado = await Empleado.findById(req.params.id);
    res.status(200).send(empleado);
  } catch (e) {
    console.log(e);
    res.status(500).send({ok: 0, msg: "Internal Server Error", error: e});
  }
};

empleadoCtrl.postEmpleado = async function (req, res) {
  if (!req.body) {
    res.status(400).send({ ok: 0, msg: "Bad Request"});
  }
  try {
    const empleado = new Empleado(req.body);
    await empleado.save();
    res.status(201).send(empleado);
  } catch (e) {
    console.log(e);
    res.status(500).send({ok: 0, msg: "Internal Server Error", error: e});
  }
};

empleadoCtrl.deleteEmpleado = async function (req, res) {
  if (!req.params.id) {
    res.status(400).send({ ok: 0, msg: "Bad Request"});
  }
  try {
    await Empleado.findByIdAndDelete(req.params.id);
    res.status(200).send({ ok: 1, message: "deleted successfully" });
  } catch (e) {
    console.log(e);
    res.status(500).send({ok: 0, msg: "Internal Server Error", error: e});
  }
};

empleadoCtrl.putEmpleado = async function (req, res) {
  try {
    if (!req.body) {
      return res.status(400).send({ ok: 0, msg: "Bad Request" });
    }

    const empleado = await Empleado.findByIdAndUpdate(req.body._id, req.body, { new: true });

    if (!empleado) {
      return res.status(404).send({ ok: 0, msg: "Empleado no encontrado" });
    }

    res.status(200).send({ ok: 1, msg: "Empleado actualizado exitosamente", empleado });
  } catch (e) {
    console.error("Error al actualizar empleado:", e);
    res.status(500).send({ ok: 0, msg: "Error interno del servidor", error: e });
  }
};


module.exports = empleadoCtrl;
