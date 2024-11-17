const mongoose = require('mongoose');
const {Schema} = mongoose;

const PromocionSchema = new Schema({
    fechaInicio: {type: Date, default: Date.now, required: false},
    fechaFin: {type: Date, default: Date.now, required: false},
    descripcion: {type: String, required: false},
    descuento: {type: Number, required: false, default: 0},
    productos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Producto', required: false}]
})

module.exports = mongoose.model.Promocion || mongoose.model('Promocion', PromocionSchema);