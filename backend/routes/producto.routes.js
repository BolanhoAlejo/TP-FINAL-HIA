const productoCtrl = require("../controllers/producto.controller");

const { Router } = require("express");
const router = Router();

router.get('/getProductos', productoCtrl.getProductos);
router.post('/postProducto', productoCtrl.postProducto);
router.get('/getProducto/:id', productoCtrl.getProductoById);
router.get('/getProductoByCod/:codProducto', productoCtrl.getProductoByCodProducto);
router.put('/putProducto/:id', productoCtrl.putProducto);
router.put('/putProductoStock/:id', productoCtrl.putProductoStock);
router.delete('/deleteProducto/:id', productoCtrl.deleteProducto);

module.exports = router;