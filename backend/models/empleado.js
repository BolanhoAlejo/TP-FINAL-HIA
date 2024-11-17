const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");

const EmpleadoSchema = new Schema({
  nombre: {
    type: String,
    required: true,
  },
  apellido: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
		unique: true,
  },
  telefono: {
    type: String,
    required: true,
    unique: true,
  },
  nombreUsuario: {
    type: String,
    required: true,
		unique: true,
  },
  contrasenia: {
    type: String,
    required: true,
  },
});

EmpleadoSchema.pre('save', async function(next) {
  const contraseniaEncriptada = await bcrypt.hash(this.contrasenia, 10);
  this.contrasenia = contraseniaEncriptada;
  next();
})

module.exports = mongoose.model("Empleado", EmpleadoSchema);
