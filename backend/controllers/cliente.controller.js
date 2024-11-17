const Cliente = require('../models/cliente');
const { updateCliente } = require('../utils/Handlers/clienteHandler');

const clienteCtrl = {}

clienteCtrl.getAllClientes = async function(req, res) {
    const clientes = await Cliente.find({});
    res.status(200).send(clientes);
}

clienteCtrl.getClienteById = async function (req, res) {
  if (!req.params.id) {
    res.status(400).send({ ok: 0, msg: "Bad Request"});
  }
  try {
    const cliente = await Cliente.findById(req.params.id);
    res.status(200).send(cliente);
  } catch (e) {
    console.log(e);
    res.status(500).send({ok: 0, msg: "Internal Server Error", error: e});
  }
};

clienteCtrl.postCliente = async function (req, res) {
  if (!req.body) {
    res.status(400).send({ ok: 0, msg: "Bad Request"});
  }
  try {
    const cliente = new Cliente(req.body);
    await cliente.save();
    res.status(201).send(cliente);
  } catch (e) {
    console.log(e);
    res.status(500).send({ok: 0, msg: "Internal Server Error", error: e});
  }
};

clienteCtrl.deleteCliente = async function (req, res) {
  if (!req.params.id) {
    res.status(400).send({ ok: 0, msg: "Bad Request"});
  }
  try {
    await Cliente.findByIdAndDelete(req.params.id);
    res.status(200).send({ ok: 1, message: "deleted successfully" });
  } catch (e) {
    console.log(e);
    res.status(500).send({ok: 0, msg: "Internal Server Error", error: e});
  }
};

clienteCtrl.putCliente = async function (req, res) {
  if (!req.body || !req.params.id) {
    res.status(400).send({ ok: 0, msg: "Bad Request"});
  }
  try {
    const cliente = await Cliente.findById(req.params.id);
    updateCliente(cliente, req.body);
    await cliente.save()
    res.status(200).send({ ok: true, message: "updated successfully" });
  } catch (e) {
    console.log(e);
    res.status(500).send({ok: 0, msg: "Internal Server Error", error: e});
  }
};

module.exports = clienteCtrl;
