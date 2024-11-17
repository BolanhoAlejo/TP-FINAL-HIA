const promocionCtrl = require("../controllers/promocion.controller");

const { Router } = require("express");
const router = Router();

router.get('/getPromociones', promocionCtrl.getPromociones);
router.post('/postPromocion', promocionCtrl.postPromocion);
router.get('/getPromocion/:id', promocionCtrl.getPromocion);
router.put('/putPromocion/:id', promocionCtrl.putPromocion);
router.delete('/deletePromocion/:id', promocionCtrl.deletePromocion);

module.exports = router;