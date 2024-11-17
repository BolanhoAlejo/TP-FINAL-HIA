import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgxEchartsDirective} from 'ngx-echarts';
import type { EChartsOption } from 'echarts';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductoService } from '../../services/producto/producto.service';
import { PromocionService } from '../../services/promocion/promocion.service';
import { Producto } from '../../models/producto/producto';
import { Promocion } from '../../models/promocion/promocion';


@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [CommonModule, NgxEchartsDirective],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss'
})
export class ChartComponent implements OnInit{
  options: EChartsOption = {};

  constructor(
    private productoService: ProductoService,
    private promocionService: PromocionService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.productoService.getProducto().subscribe((productos: Producto[]) => {
      const xAxisData: any[] = [];
      const data1: any[] = [];
      productos.forEach((producto: Producto, i: number) => {
        xAxisData.push(producto.nombre); // Ejemplo: Usar nombre del producto como etiqueta del eje X
        data1.push(producto.precio); // Ejemplo: Usar precio del producto como dato del gráfico
      });

      // Luego cargar los datos de promociones de manera similar
      this.promocionService.getPromocion().subscribe((promociones: Promocion[]) => {
        const data2: any[] = [];
        promociones.forEach((promocion: Promocion, i: number) => {
          data2.push(promocion.descuento); // Usar descuento como dato del gráfico
        });

        this.options = {
          legend: {
            data: ['Productos', 'Promociones'],
            align: 'left',
          },
          tooltip: {},
          xAxis: {
            data: xAxisData,
            silent: false,
            splitLine: {
              show: false,
            },
          },
          yAxis: {},
          series: [
            {
              name: 'Productos',
              type: 'bar',
              data: data1,
              animationDelay: (idx: number) => idx * 10,
            },
            {
              name: 'Promociones',
              type: 'bar',
              data: data2,
              animationDelay: (idx: number) => idx * 10 + 100,
            },
          ],
          animationEasing: 'elasticOut',
          animationDelayUpdate: (idx: number) => idx * 5,
        };
      });
    });
  }
}

