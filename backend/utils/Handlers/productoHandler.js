const Promocion = require('../../models/promocion');
const Producto = require('../../models/producto');
const Detalle = require('../../models/detalle');

async function updateProducto(producto, body){
    if(body.promocion){
        let promocion = await Promocion.findById(body.promocion);
        promocion.productos.push(producto._id);
        await promocion.save();
        producto.promocion = promocion._id;
    }
    if(body.nombre){
        producto.nombre = body.nombre;
    }
    if(body.descripcion){
        producto.descripcion = body.descripcion;
    }
    if(body.imagenURL){
        producto.imagenURL = body.imagenURL;
    }
    if(body.precio){
        producto.precio = body.precio;
    }
    if(body.stock){
        producto.stock = body.stock;
    }
}

//Explicar al profe si pregunta qué podemos implementar a futuro si crece la base de datos
/*async function validatePromocion(productos) {
    const ids = productos.map(id => id.toString());
    const promociones = await Producto.find({
    _id: { $in: ids },
    promocion: { $exists: true }
    }).distinct('promocion');
    return promociones.length === 0;
}*/

/**
 * Validates if all products in the given array have a matching promocion in the provided array.
 *
 * @param {Array<ObjectId>} promocionProds - The array of IDs of the productos of the promocion.
 * @param {Array<ObjectId>} productos - The array of product IDs to compare.
 * @return {Promise<boolean>} A promise that resolves to true if all products have a matching promocion, false otherwise.
 */
async function validatePromocion(promocionProds, productos){
    let valido = true
    let pos = 0
    while(pos < productos.length && valido){
        let producto = await Producto.findById(productos[pos]);
        if(producto.promocion != null){
            if(!promocionProds.includes(productos[pos])){
                valido = false
            }
        }
        pos = pos + 1
    }
    return valido
}

/**
 * Adds a reference to a promotion for each product in the provided array.
 *
 * @param {string} promocionId - The ID of the promotion to associate the products with.
 * @param {Array<string>} productos - The array of product IDs to update with the promotion.
 */
async function addReferenciaPromocion(promocionId, productos){
    for(const id of productos){
        let prod = await Producto.findById(id);
        prod.promocion = promocionId;
        await prod.save();
    }
}

/**
 * Deletes the reference to a promotion for each product in the provided array.
 *
 * @param {Array<string>} productos - The array of product IDs to remove the promotion reference from.
 */
async function deleteReferenciaPromocion(productos){
    for(const id of productos){
        let prod = await Producto.findById(id);
        prod.promocion = null;
        await prod.save();
    }
}

/* async function updateDisminuirStock(detalleId){
    let detalle = await Detalle.findById(detalleId);
    let prod = await Producto.findById(detalle.producto);
    prod.stock -= detalle.cantidad;
    await prod.save();
}

async function updateAumentarStock(detalleId){
    let detalle = await Detalle.findById(detalleId);
    let prod = await Producto.findById(detalle.producto);
    prod.stock += detalle.cantidad;
    await prod.save();
} */

module.exports = {validatePromocion, updateProducto, addReferenciaPromocion, deleteReferenciaPromocion}