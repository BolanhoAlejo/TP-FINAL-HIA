const mongoose = require('mongoose');
const {Schema} = mongoose;

const ProductoSchema = new Schema({
    codProducto: {type:Number, required: false},
    nombre: {type:String, required: false},
    descripcion: {type:String, required: false},
    imagenURL: {type:String, required: false},
    precio: {type:Number, required: false},
    stock: {type:Number, required: false},
    promocion: {type: mongoose.Schema.Types.ObjectId, ref: 'Promocion', required: false, default: null}
})

module.exports = mongoose.model.Producto || mongoose.model('Producto', ProductoSchema);