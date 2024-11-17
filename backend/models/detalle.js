const mongoose = require('mongoose');
const {Schema} = mongoose;

const DetalleSchema = new Schema({
    cantidad: {type: Number, required: true},
    descuento: {type: Number, required: true, default: 0},
    totalSinDescuento: {type: Number, required: true},
    totalConDescuento: {type: Number, required: true},
    precioUnitario: {type: Number, required: true},
    producto: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto', required: true}
})

module.exports = mongoose.model.Detalle || mongoose.model('Detalle', DetalleSchema);
