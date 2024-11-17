const mongoose = require('mongoose');
const {Schema} = mongoose;

const PedidoSchema = new Schema({
    fecha: {type: Date, default: Date.now},
    totalSinImpuestos: {type: Number, required: false, default: 0},
    totalConImpuestos: {type: Number, required: false, default: 0},
    impuesto: {type: Number, required: true, default: 0},
    estado: {type: Boolean, required: false, default: false},
    detalles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Detalle', required: true}]
})

module.exports = mongoose.model.Pedido || mongoose.model('Pedido', PedidoSchema);