const { MercadoPagoConfig, Preference } = require("mercadopago");
require("dotenv").config();
// TODO: create pedido on database

class PaymentService {
    async createPayment(pedido) {
        // TODO: APPLY PROMOCIONES
        const client = new MercadoPagoConfig({ accessToken: process.env.ACCESS_TOKEN });
        const preference = new Preference(client);
        const items = pedido.detalles.map((detalle) => ({
            id: pedido._id,
            title: detalle.producto.nombre,
            description: detalle.producto.descripcion,
            picture_url: detalle.producto.imagenURL,
            quantity: detalle.cantidad,
            unit_price: detalle.precioUnitario,
            currency_id: "ARS",
        }))

        const productos = pedido.detalles.map((detalle) => ({
            producto_id: detalle.producto,
            cantidad: detalle.cantidad,
        }));

        try {
            const response = await preference.create({
                body: {
                    items: items,
                    notification_url: `https://${process.env.NGROK_SERVER_URL}/api/v1/payment/done`,
                    back_urls: {
                        success: `http://localhost:${process.env.FRONTEND_SERVER_PORT}/exito`,
                        failure: `http://localhost:${process.env.FRONTEND_SERVER_PORT}/rechazado`
                    },
                    metadata: {
                        pedido_id: pedido._id,
                        productos: productos,
                    }
                }
            });
            //console.log(response);
            return response;

        } catch (err) {
            return { ok: 0, message: "Internal Server Error", error: err.message }
        }
    }
}

module.exports = PaymentService;
