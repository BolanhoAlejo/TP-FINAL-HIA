const z = require("zod");

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

const usuarioRegistroSchema = z.object({
  nombre: z.string().max(15),
  apellido: z.string().max(15),
  email: z.string().email(),
  telefono: z.string().regex(phoneRegex, 'Invalid Phone Number'),
  nombreUsuario: z.string().max(20),
  contrasenia: z.string().min(8)
});

module.exports = usuarioRegistroSchema;
