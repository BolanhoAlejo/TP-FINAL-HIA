export class Pedido {
    _id?: any;
    fecha?: Date;
    totalSinImpuestos?:Number;
    totalConImpuestos?:Number;
    impuesto?:Number;
    estado?:Boolean;
    detalles?: Array<any>
  }