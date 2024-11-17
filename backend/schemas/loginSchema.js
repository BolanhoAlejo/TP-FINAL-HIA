const z = require("zod");

const loginSchema = z.object({
  email: z.string().email(),
  contrasenia: z.string().min(8)
});

module.exports = loginSchema;

