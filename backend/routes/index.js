const express = require('express');
const router = express.Router();

const PaymentController = require('../controllers/payments.controllers');
const PaymentService = require('../services/payments.services');
const PaymentInstance = new PaymentController(new PaymentService());
const receiveWebHook = require("../services/payments.services")

router.post("/payment", function(req, res) {
	if(!req.body) {
		res.send(400).send({ok: 0, message: "bad_request"});
	}
  PaymentInstance.getPaymentLink(req, res);
});

router.post("/done", PaymentInstance.recibirConfirmacionDePago);

module.exports = router;
