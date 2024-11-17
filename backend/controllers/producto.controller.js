const Producto = require('../models/producto');
const { updateProducto } = require('../utils/Handlers/productoHandler');
const productoCtrl = {}

productoCtrl.getProductos = async (req, res) => {
    let productos = await Producto.find();
    res.status(200).json(productos);
}

productoCtrl.getProductoById = async (req, res) => {
    try {
        const producto = await Producto.findById(req.params.id);
        res.json(producto);
    } catch (error) {
        res.status(404).json({
            'status': '0',
            'msg': 'Error procesando la operacion'
        })
    }
}

productoCtrl.getProductoByCodProducto = async (req, res) => {
    try {
        const producto = await Producto.findOne({'codProducto': req.params.codProducto});
        res.json(producto);
    } catch (error) {
        res.status(404).json({
            'status': '0',
            'msg': 'Error procesando la operacion'
        })
    }
}

productoCtrl.postProducto = async (req, res) => {
    let producto = new Producto(req.body)
    try {
        let aux = await Producto.findOne({'codProducto' : req.body.codProducto})
        if(aux === null){
            await producto.save()
            res.status(201).json({
            'status': '1',
            'msg': 'Producto guardado.'})
        } else {
            res.status(400).json({
                'status': '0',
                'msg': 'Ya existe el producto.'
            })
        }
    } catch (error) {
        res.status(500).json({
        'status': '0',
        'msg': 'Error procesando operacion.',
        "error": error.message
        })
    }
}

productoCtrl.putProducto = async (req, res) => {
    try {
        let producto = await Producto.findById(req.params.id);
        if (!producto) {
            return res.status(404).json({
                'status': '0',
                'msg': 'Producto no encontrado'
            });
        }
        if(req.body.codProducto && producto.codProducto != req.body.codProducto){
            let aux = await Producto.findOne({'codProducto' : req.body.codProducto});
            if(aux != null){
                return res.status(400).json({
                    'status': '0',
                    'msg': 'No puede guardar un producto con ese Cod. de Producto'
                });
            }
            producto.codProducto = req.body.codProducto;
        }
        await updateProducto(producto, req.body);
        await producto.save();
        res.status(200).json({
            'status': '1',
            'msg': 'Producto actualizado',
            'producto': producto
        });
    } catch (error) {
        res.status(500).json({
            'status': '0',
            'msg': 'Error procesando la operación',
            "error": error.message
        });
    }
};

productoCtrl.putProductoStock = async (req, res) => {
    try {
        let producto = await Producto.findById(req.params.id);
        if (!producto) {
            return res.status(404).json({
                'status': '0',
                'msg': 'Producto no encontrado'
            });
        }
        if(producto.stock < req.query.cantidad){
            return res.status(400).json({
                'status': '0',
                'msg': 'La cantidad a disminuir no puede ser mayor al stock actual',
                'stock actual': producto.stock,
                'cantidad a disminuir': req.query.cantidad
            });
        }
        producto.stock -= req.query.cantidad
        await producto.save();
        res.status(200).json({
            'status': '1',
            'msg': 'Stock de producto actualizado',
            'nuevo stock': producto.stock
        });
    } catch (error) {
        res.status(500).json({
            'status': '0',
            'msg': 'Error procesando la operación',
            "error": error.message
        });
    }
};

productoCtrl.deleteProducto = async (req, res)=>{
    try {
        await Producto.findByIdAndDelete(req.params.id);
        res.status(200).json({
            status: '1',
            msg: 'Producto removed'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando la operacion'
        })
    }
}

module.exports = productoCtrl;