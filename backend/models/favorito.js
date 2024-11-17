const mongoose = require('mongoose');
const {Schema} = mongoose;

const FavoritoSchema = new Schema({

    productos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Producto'}]
})

module.exports = mongoose.model.Favorito || mongoose.model('Favorito', FavoritoSchema);
