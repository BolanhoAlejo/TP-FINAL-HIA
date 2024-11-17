const Producto = require('../../models/producto');

function updatePromocion(promocion, body){
    if(body.fechaInicio){
        promocion.fechaInicio = new Date(body.fechaInicio)
    }
    if(body.fechaFin){
        promocion.fechaFin = new Date(body.fechaFin)
    }
    if(body.descuento){
        promocion.descuento = body.descuento
    }
    if(body.descripcion){
        promocion.descripcion = body.descripcion
    }
}

/**
 * Adds the given product IDs to the promocion with the specified ID, updating the product's promocion field.
 *
 * @param {string} promocionId - The ID of the promocion to add products to.
 * @param {Array<ObjectId>} promocionProds - The array of product IDs already associated with the promocion.
 * @param {Array<string>} productos - The array of product IDs to add to the promocion.
 */
async function addProductosPromocion(promocionId, promocionProds, productos){
    if(promocionProds){
        promocionProds.splice(0, promocionProds.length)
    }
    for(const id of productos){
        let prod = await Producto.findById(id);
        promocionProds.push(prod._id);
        prod.promocion = promocionId;
        await prod.save();
    }
}
module.exports = {updatePromocion, addProductosPromocion}