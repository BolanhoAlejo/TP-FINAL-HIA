const express = require('express');
const cors = require('cors');
const { mongoose } = require('./database');
const cookieParser = require("cookie-parser");
require("dotenv").config();
var app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
	cors({ origin: `http://localhost:${process.env.FRONTEND_SERVER_PORT}`, credentials: true },
	     { origin: `https://localhost:${process.env.FRONTEND_SERVER_PORT}`, credentials: true })
);

app.use('/api/v1/producto', require('./routes/producto.routes.js'));
app.use("/api/v1/cliente", require("./routes/cliente.routes"));
app.use("/api/v1/empleado", require("./routes/empleado.routes"));
app.use('/api/v1/producto', require('./routes/producto.routes.js'));
app.use('/api/v1/pedido', require('./routes/pedido.routes.js'));
app.use('/api/v1/promocion', require('./routes/promocion.routes.js'));
app.use("/api/v1/usuario", require('./routes/usuario.routes.js'));
app.use('/api/v1/favoritos', require('./routes/favoritos.routes.js'));
app.use("/api/v1", require("./routes/auth.routes.js"));
app.use('/api/v1/payment', require('./routes/index.js'));

app.set("port", process.env.EXPRESS_SERVER_PORT || 3000);

app.listen(app.get('port'), () => {
	console.log(`Server started on port`, app.get('port'));
});
