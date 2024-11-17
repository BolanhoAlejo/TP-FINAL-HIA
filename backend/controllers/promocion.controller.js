const Promocion = require('../models/promocion');
const { updatePromocion, addProductosPromocion,  } = require('../utils/Handlers/promocionHandler');
const { addReferenciaPromocion, deleteReferenciaPromocion, validatePromocion } = require('../utils/Handlers/productoHandler');
const promocionCtrl = {}

promocionCtrl.getPromociones = async (req, res) => {
    let promociones = await Promocion.find().populate('productos');
    res.status(200).json(promociones);
}

promocionCtrl.getPromocion = async (req, res) => {
    try {
        const promocion = await Promocion.findById(req.params.id).populate('productos');
        res.status(200).json(promocion);
    } catch (error) {
        res.status(404).json({
            'status': '0',
            'msg': 'Error procesando la operacion',
            "error": error.message
        })
    }
}

promocionCtrl.postPromocion = async (req, res) => {
    try {
        let promocion = new Promocion(req.body);
        if(await validatePromocion(promocion.productos, req.body.productos)){
            await addProductosPromocion(promocion._id, promocion.productos, req.body.productos)
        } else {
            return res.status(400).json({
                'status': '0',
                'msg': 'No se puede agregar dos promociones a un mismo proyecto',
            })
        }
        await promocion.save();
        await addReferenciaPromocion(promocion._id, promocion.productos)
        res.status(201).json({
            'status': '1',
            'msg': 'Promocion guardada.'
        })
    } catch (error) {
        res.status(500).json({
        'status': '0',
        'msg': 'Error procesando operacion.',
        "error": error.message
        })
    }
}

promocionCtrl.putPromocion = async (req, res) => {
    try {
        let promocion = await Promocion.findById(req.params.id)
        if(req.body.productos){
            if(await validatePromocion(promocion.productos, req.body.productos)){
                await deleteReferenciaPromocion(promocion.productos)
                await  addProductosPromocion(promocion._id, promocion.productos, req.body.productos)
            } else {
                return res.status(400).json({
                    'status': '0',
                    'msg': 'No se puede agregar dos promociones a un mismo producto',
                })
            }
        }
        updatePromocion(promocion, req.body)
        await promocion.save()
        res.status(200).json({
            'status': '1',
            'msg': 'Promocion updated'
        })
    } catch (error) {
        res.status(500).json({
            'status': '0',
            'msg': 'Error procesando la operacion',
            "error": error.message
        })
    }
}

promocionCtrl.deletePromocion = async (req, res)=>{
    try {
        let promocion = await Promocion.findById(req.params.id);
        await deleteReferenciaPromocion(promocion.productos)
        await Promocion.findByIdAndDelete(req.params.id);
        res.status(200).json({
            status: '1',
            msg: 'Promocion removed'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando la operacion',
            'error': error.message
        })
    }
}

module.exports = promocionCtrl;