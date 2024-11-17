const pedidoCtrl = require("../controllers/pedido.controller");

const { Router } = require("express");
const router = Router();

router.get('/getPedidos', pedidoCtrl.getPedidos);
router.post('/postPedido', pedidoCtrl.postPedido);
router.get('/getPedido/:id', pedidoCtrl.getPedido);
router.put('/putPedido/:id', pedidoCtrl.putPedido);
router.put('/putPedidoEstado/:id', pedidoCtrl.putPedidoEstado);
router.delete('/deletePedido/:id', pedidoCtrl.deletePedido);

module.exports = router;