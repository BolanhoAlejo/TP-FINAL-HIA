export class Promocion {
    _id? : string;
    fechaInicio?: String;
    fechaFin?: String;
    descripcion?: string;
    descuento?: number;
    productos: Array<string>;
    constructor(){
      this.productos = new Array<string>();
    }
  }
  