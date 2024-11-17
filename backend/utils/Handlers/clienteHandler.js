function updateCliente(cliente, body){
    if(body.nombre){
        cliente.nombre = body.nombre;
    }
    if(body.apellido){
        cliente.apellido = body.apellido;
    }
    if(body.email){
        cliente.email = body.email;
    }
    if(body.telefono){
        cliente.telefono = body.telefono;
    }
    if(body.nombreUsuario){
        cliente.nombreUsuario = body.nombreUsuario;
    }
    if(body.contrasenia){
        cliente.contrasenia = body.contrasenia;
    }
}

module.exports = { updateCliente }