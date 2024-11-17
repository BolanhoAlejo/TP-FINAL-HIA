const { Payment, MercadoPagoConfig }= require("mercadopago");
require("dotenv").config();

class PaymentController {
	constructor(suscribtionService) {
		this.suscribtionService = suscribtionService;
		this.getPaymentLink = this.getPaymentLink.bind(this);
	}

	async getPaymentLink(req, res) {
		try {
			const pedido = req.body;
			const payment = await this.suscribtionService.createPayment(pedido);
			return res.json(payment);
		} catch (error) {
			console.log(error);
			return res.status(500).json({ ok: 0, message: "Internal Server Error", error: error.message });
		}
	}

	async recibirConfirmacionDePago(req, res) {
		try {
			const payment_result = req.query;
			if(payment_result.type === "payment") {
				console.log(payment_result);
				const client = new MercadoPagoConfig({ accessToken: process.env.ACCESS_TOKEN });
				const payment = new Payment(client);
				const paymentData = await payment.get({
					id: payment_result['data.id'],
				});
				console.log(paymentData.metadata);
				// Update Estado Producto and Stock
				paymentData.metadata.productos.map( async (producto) => {
					const requestOptions = {
						method: 'PUT',
					}
					await fetch(`http://localhost:${process.env.EXPRESS_SERVER_PORT}/api/v1/pedido/putPedidoEstado/${paymentData.metadata.pedido_id}`, requestOptions).then(response => response.json()).then(result => console.log(result));

					await fetch(`http://localhost:${process.env.EXPRESS_SERVER_PORT}/api/v1/producto/putProductoStock/${producto.producto_id}?cantidad=${producto.cantidad}`, requestOptions).then(response => response.json()).then(result => console.log(result));

				})
			}
			res.sendStatus(204);
		} catch(err) {
			res.status(400).send({ok: 0, message: "Internal Server Error", error: err.message});
		}
	}
}

module.exports = PaymentController;


