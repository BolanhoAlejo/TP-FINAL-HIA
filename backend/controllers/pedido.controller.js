const Pedido = require('../models/pedido');
const { convertToSchema } = require('../utils/Handlers/detalleHandler')
const { updateDisminuirStock } = require('../utils/Handlers/productoHandler')
const pedidoCtrl = {}

pedidoCtrl.getPedidos = async (req, res) => {
    let pedidos = await Pedido.find().populate('detalles');
    res.status(200).json(pedidos);
}

pedidoCtrl.getPedido = async (req, res) => {
    try {
        const pedido = await Pedido.findById(req.params.id).populate('detalles');
        res.json(pedido);
    } catch (error) {
        res.status(404).json({
            'status': '0',
            'msg': 'Error procesando la operacion',
            "error": error.message
        })
    }
}

pedidoCtrl.postPedido = async (req, res) => {
    let pedido = new Pedido();
    try {
        if(req.body.fecha){
            pedido.fecha = req.body.fecha
        }
        if(req.body.impuesto){
            pedido.impuesto = req.body.impuesto
        }
        pedido.detalles = []
        pedido.totalSinImpuestos = 0
        for (const el of req.body.detalles) {
            let det = await convertToSchema(el)
            await det.save()
            pedido.totalSinImpuestos += det.totalSinDescuento
            pedido.detalles.push(det._id)
        }
        pedido.totalConImpuestos = pedido.totalSinImpuestos + (pedido.totalSinImpuestos * pedido.impuesto / 100)
        await pedido.save();
        res.status(201).json({
        'status': '1',
        'msg': 'Pedido guardado.',
        'totalSinImpuesto': pedido
        })
    } catch (error) {
        res.status(400).json({
        'status': '0',
        'msg': 'Error procesando operacion.',
        "error": error.message
        })
    }
}

pedidoCtrl.putPedido = async (req, res) => {
    try {
        const pedido = await Pedido.findById(req.params.id)
        if(req.body.detalles){
            pedido.detalles = []
            pedido.totalSinImpuestos = 0
            for (const el of req.body.detalles) {
                let det = await convertToSchema(el)
                await det.save()
                pedido.detalles.push(det._id)
                pedido.totalSinImpuestos += det.totalSinDescuento
            }
            pedido.totalConImpuestos = pedido.totalSinImpuestos + (pedido.totalSinImpuestos * pedido.impuesto / 100)
        }
        if(req.body.impuesto){
            pedido.impuesto = req.body.impuesto
            pedido.totalConImpuestos = pedido.totalSinImpuestos + (pedido.totalSinImpuestos * pedido.impuesto / 100)
        }
        res.status(200).json({
            'status': '1',
            'msg': 'Pedido updated'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando la operacion',
            "error": error.message
        })
    }
}

pedidoCtrl.putPedidoEstado = async (req, res) => {
    try {
        const pedido = await Pedido.findById(req.params.id)
        pedido.estado = !pedido.estado
        await pedido.save()
        res.status(200).json({
            'status': '1',
            'msg': 'Estado del pedido updated'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando la operacion',
            "error": error.message
        })
    }
}

pedidoCtrl.deletePedido = async (req, res)=>{
    try {
        await Pedido.findByIdAndDelete(req.params.id);
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

module.exports = pedidoCtrl;