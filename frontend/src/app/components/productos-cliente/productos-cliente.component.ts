import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AcortadorPipe } from '../../pipes/acortador.pipe';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Producto } from '../../models/producto/producto';
import { ProductoService } from '../../services/producto/producto.service';
import { AuthService } from '../../services/auth/auth.service';
import { Usuario } from '../../models/usuario/usuario';
import { Pedido } from '../../models/pedido/pedido';
import { PromocionService } from '../../services/promocion/promocion.service';
import { Promocion } from '../../models/promocion/promocion';
import { PedidoService } from '../../services/pedido/pedido.service';
import { PaymentService } from '../../services/payment/payment.service';
import { FavoritoService } from '../../services/favorito/favorito.service';
import { Favorito } from '../../models/favorito/favorito';

declare var bootstrap: any;

@Component({
  selector: 'app-productos-cliente',
  standalone: true,
  imports: [RouterLink, AcortadorPipe, CurrencyPipe, CommonModule],
  templateUrl: './productos-cliente.component.html',
  styleUrls: ['./productos-cliente.component.scss']
})
export class ProductosClienteComponent {
  productos: Producto[] = [];
  productosFiltrados: Producto[] = [];
  filtroSeleccionado: string = 'todos';
  usuario: Usuario | null = null;

  error: string = '';
  success: string = '';

  private productoService: ProductoService = inject(ProductoService);
  private authService: AuthService = inject(AuthService);
  private promocionService: PromocionService = inject(PromocionService);
  private pedidoService: PedidoService = inject(PedidoService);
  private paymentService: PaymentService = inject(PaymentService);
  private router: Router = inject(Router);
  private favoritoService: FavoritoService = inject(FavoritoService);

  carrito: Array<{ producto: Producto, cantidad: number }> = [];
  favoritos: Array<Producto> = [];
  total: number = 0;

  recuperarCarrito() {
    this.usuario = this.authService.getUser();
    let storage = JSON.parse(localStorage.getItem(this.usuario?._id) || '[]');
    if (storage.length > 0) {
      this.carrito = storage;
      this.total = this.carrito.reduce((acc, item) => acc + (item.producto.precio! * item.cantidad), 0);
    }
  }

  recuperarFavoritos() {
    this.usuario = this.authService.getUser();
    let storage = JSON.parse(localStorage.getItem(this.usuario?._id + "favoritos") || '[]');
    if (storage.length > 0) {
      this.favoritos = storage;
    }
  }

  constructor() {
    this.getProducto();
    this.recuperarCarrito();
    this.recuperarFavoritos(); // Llama a recuperarFavoritos en el constructor
  }

  getProducto() {
    this.productoService.getProducto().subscribe({
      next: (res: Producto[]) => {
        console.log(res);
        this.productos = res;
        this.productosFiltrados = res;
      },
      error: (err: any) => {
        this.error = err;
      }
    });
  }

  filtrarProductos(filtro: string) {
    this.filtroSeleccionado = filtro;
    switch (filtro) {
      case 'promocion':
        this.productosFiltrados = this.productos.filter(producto => producto.promocion !== null);
        break;
      case 'noPromocion':
        this.productosFiltrados = this.productos.filter(producto => producto.promocion === null);
        break;
      case 'todos':
      default:
        this.productosFiltrados = this.productos;
        break;
    }
  }

  filtrarPorPrecio(rango: string) {
    const precios = rango.split('>='); // Se asume que los valores del filtro son >= o < valor
    if (precios.length > 1) {
      this.productosFiltrados = this.productos.filter(producto => producto.precio! >= +precios[1]);
    } else {
      this.productosFiltrados = this.productos.filter(producto => producto.precio! < +rango.split('<')[1]);
    }
  }

  agregarAlCarrito(producto: Producto) {
    const productoEnCarrito = this.carrito.find(p => p.producto._id === producto._id);
    if (productoEnCarrito) {
      productoEnCarrito.cantidad++;
    } else {
      this.carrito.push({ producto, cantidad: 1 });
    }
    this.actualizarTotal();
    this.guardarCarrito();
    this.success = 'Producto agregado al carrito';
    setTimeout(() => this.success = '', 3000);
    this.abrirAside('#asideCarrito');
  }

  restarCantidad(productoEnCarrito: { producto: Producto, cantidad: number }) {
    if (productoEnCarrito.cantidad > 1) {
      productoEnCarrito.cantidad--;
    } else {
      this.carrito = this.carrito.filter(p => p !== productoEnCarrito);
    }
    this.actualizarTotal();
    this.guardarCarrito();
  }

  sumarCantidad(productoEnCarrito: { producto: Producto, cantidad: number }) {
    productoEnCarrito.cantidad++;
    this.actualizarTotal();
    this.guardarCarrito();
  }

  guardarCarrito() {
    localStorage.setItem(this.usuario?._id, JSON.stringify(this.carrito));
  }

  guardarFavoritos() {
    localStorage.setItem(this.usuario?._id + "favoritos", JSON.stringify(this.favoritos));
  }

  actualizarTotal() {
    this.total = this.carrito.reduce((acc, item) => acc + (item.producto.precio! * item.cantidad), 0);
  }

  abrirAside(selector: string) {
    const aside = new bootstrap.Offcanvas(document.querySelector(selector));
    aside.show();
  }

  abrirCarrito() {
    this.abrirAside('#asideCarrito');
  }

  abrirFavoritos() {
    this.abrirAside('#asideFavoritos');
  }

  agregarAFavoritos(producto: Producto) {
    const favoritos: Producto[] = JSON.parse(localStorage.getItem(this.usuario?._id + "favoritos") || "[]");
    if (!favoritos.some(fav => fav._id === producto._id)) {
      favoritos.push(producto);
      localStorage.setItem(this.usuario?._id + "favoritos", JSON.stringify(favoritos));
      this.success = 'Producto agregado a favoritos';
    } else {
      this.success = 'El producto ya está en favoritos';
    }
    setTimeout(() => this.success = '', 3000);
    this.abrirAside('#asideFavoritos');
    this.enviarPerfil(this.favoritos);
  }
  enviarPerfil(favoritos: Producto[]) {
    this.favoritoService.favoritosPorUsuario = favoritos;
  }
  cargarFavoritos() {
    return JSON.parse(localStorage.getItem(this.usuario?._id + "favoritos") || '[]');
  }
  quitarFavorito(producto: Producto) {
    const favoritos: Producto[] = JSON.parse(localStorage.getItem(this.usuario?._id + "favoritos") || "[]");
    const nuevosFavoritos = favoritos.filter(fav => fav._id !== producto._id);
    localStorage.setItem(this.usuario?._id + "favoritos", JSON.stringify(nuevosFavoritos));
    this.success = 'Producto eliminado de favoritos';
    setTimeout(() => this.success = '', 3000);
    this.recuperarFavoritos(); // Actualiza la lista de favoritos
  }

  vaciarCarrito() {
    this.carrito = [];
    this.total = 0;
    this.guardarCarrito();
    this.success = 'Carrito vaciado';
    setTimeout(() => this.success = '', 3000);
  }

  /* generarPedido(){
    let   descuento : number = 0;
     let pedido=new Pedido();
     pedido.detalles = new Array<any>
    for(const prod of this.carrito){
      if(prod.producto.promocion){
        this.promocionService.getPromocionById(prod.producto.promocion).subscribe({
          next:(res) =>{
            if(res){
              descuento = (res as Promocion).descuento ?? 0;
              pedido.detalles?.push({
                'codProducto' : prod.producto.codProducto,
                'cantidad' : prod.cantidad,
                'descuento':descuento
              })
            }else{
              descuento = 0;
              pedido.detalles?.push({
                'codProducto' : prod.producto.codProducto,
                'cantidad' : prod.cantidad,
                'descuento':descuento
              })
            }
          },error:(err)=>{
            descuento = 0;
            pedido.detalles?.push({
              'codProducto' : prod.producto.codProducto,
              'cantidad' : prod.cantidad,
              'descuento':descuento
            })
          }
        });
      }else{
        descuento = 0;
        pedido.detalles?.push({
          'codProducto' : prod.producto.codProducto,
          'cantidad' : prod.cantidad,
          'descuento':descuento
        })
      }
    }
    pedido.impuesto = 21; // impuesto ajustable
    this.pedidoService.createPedido(pedido).subscribe({
      next: (res: any) => {
        console.log("Yo me ejecuto primero");
        this.carrito.length=0;
      },
      error: (err: any) => {
        console.error(err);
      }
    });
  } */

  generarLinkDePago(pedido: Pedido) {
    this.paymentService.generateMercadoPagoLink(pedido).subscribe(
      (data) => {
        console.log(data.init_point);
        window.location.href = data.init_point;
      }
    );
  }

  generarPedido() {
    let descuento: number = 0;
    let pedido = new Pedido();
    pedido.detalles = new Array<any>();
    for (const prod of this.carrito) {
      pedido.detalles?.push({
        codProducto: prod.producto.codProducto,
        cantidad: prod.cantidad,
        descuento: descuento
      });
    }
    pedido.impuesto = 21; // impuesto ajustable

    let pedidoGenerado: Pedido;

    this.pedidoService.createPedido(pedido).subscribe({
      next: (res: any) => {
        console.log(res.totalSinImpuesto._id);
        // do second call
        this.pedidoService.getPedido(res.totalSinImpuesto._id).subscribe(
          (data) => {
            pedidoGenerado = data as Pedido;
            console.log(pedidoGenerado);
            this.generarLinkDePago(pedidoGenerado);
          },
          (error) => {
            console.error(error);
          }
        );
        this.carrito.length = 0;
      },
      error: (err: any) => {
        console.error(err);
      }
    });
  }
  cualquiera(a :string){
    console.log(a);
  }
}
