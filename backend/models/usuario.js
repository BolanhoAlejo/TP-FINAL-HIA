const mongoose = require('mongoose');
const {Schema} = mongoose;
const bcrypt = require("bcrypt");

const UsuarioSchema = new Schema({
    nombre: {
        type: String,
    },
    apellido: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    telefono: {
        type: String,
        unique: true,
    },
    nombreUsuario: {
        type: String,
        required: true,
    },
    contrasenia:  {
        type: String,
        required: true,
    },
    favoritos: { type: mongoose.Schema.Types.ObjectId, ref: 'Favorito', default: null, required: false},

		rol: {
			type: String,
			default: "cliente", 
		}
})

UsuarioSchema.pre('save', async function(next) {
  const contraseniaEncriptada = await bcrypt.hashSync(this.contrasenia, 10);
  this.contrasenia = contraseniaEncriptada;
  next()
})

module.exports =  mongoose.model('Usuario', UsuarioSchema);
