const Detalle = require('../../models/detalle');
const Producto = require('../../models/producto');

/**
 * Converts the given detalle object into a Detalle schema object with calculated total values.
 *
 * @param {Object} detalle - The detalle object to convert
 * @return {Promise<Object>} A Promise that resolves to the converted Detalle schema object
 */
async function convertToSchema(detalle) {
    let res = new Detalle();
    res.producto = await Producto.findOne({'codProducto': detalle.codProducto});
    if(detalle.cantidad > res.producto.stock) 
        throw new Error('No hay suficiente stock para la compra del producto '+res.producto.nombre);
    res.cantidad = detalle.cantidad;
    res.descuento = detalle.descuento? detalle.descuento : 0;
    res.precioUnitario = res.producto.precio;
    res.totalSinDescuento = res.cantidad * res.precioUnitario;
    res.totalConDescuento = res.totalSinDescuento - (res.totalSinDescuento * res.descuento / 100);
    return res;
}

module.exports = {convertToSchema}