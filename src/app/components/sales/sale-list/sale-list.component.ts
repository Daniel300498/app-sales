import { Component, OnInit } from '@angular/core';
import {Sale} from '../../../models/sale.model';
import {SaleService} from "../../../services/sale.service";
@Component({
  selector: 'app-sale-list',
  templateUrl: './sale-list.component.html',
  styleUrls: ['./sale-list.component.scss']
})
export class SaleListComponent implements OnInit {
  sales: Sale[] = [];
      loading = false;
      errorMessage = '';
      successMessage = '';
      deletingSaleId: number | null = null;
      constructor(private saleService: SaleService) { }
        ngOnInit(): void {
          this.loadSales();
        }
        loadSales(): void {
          this.loading = true;
          this.errorMessage = '';
          this.saleService.getSales().subscribe({
            next: (sales: Sale[]) => {
              this.sales = sales;
              this.loading = false;
            },
            error: (error) => {
              console.error('Error al obtener las ventas:', error);
              this.errorMessage = 'No se pudieron obtener las ventas';
              this.loading = false;
          }
        });
        }
        deleteSale(id: number): void {
          const confirmed = confirm('¿Estás seguro de que deseas eliminar esta venta?');
          if (!confirmed) {
            return;
          }
            this.deletingSaleId = id;
            this.errorMessage = '';
            this.successMessage = '';
            this.saleService.deleteSale(id).subscribe({
              next: () => {
                this.sales = this.sales.filter(sale => sale.id !== id);
                this.successMessage = 'La venta se eliminó correctamente.';
                this.deletingSaleId = null;
              },
              error: (error) => {
                console.error('Error al eliminar la venta:', error);

                this.errorMessage = 'No se pudo eliminar la venta.';
                this.deletingSaleId = null;
              }
            });
          }
}

