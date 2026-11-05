import { Component, OnInit } from '@angular/core';
import { Sale } from 'src/app/models/sale.model';
import { Product} from 'src/app/models/product.model';
import {ProductService } from 'src/app/services/product.service';
import {SaleService } from 'src/app/services/sale.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    products: Product[] = [];
    sales: Sale[] = [];
    totalProducts = 0;
    totalSales = 0;
    totalRevenue = 0;
    lowStockProducts = 0;
    loading = false;
    errorMessage= '';    
    constructor(private productService: ProductService, private saleService: SaleService) { }
    ngOnInit(): void {
      this.loadDashboard();
    }
    loadDashboard(): void {
      this.loading = true;
      this.errorMessage = '';
      
      this.productService.getProducts().subscribe({
        next: (products: Product[]) => {
          this.products = products;
          this.totalProducts = products.length;

          this.lowStockProducts = products.filter(product => product.stock <= 5).length;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error al obtener los productos:', error);
          this.errorMessage = 'No se pudieron obtener los productos';
          this.loading = false;
        }
      });

      this.saleService.getSales().subscribe({
        next: (sales: Sale[]) => {
          this.sales = sales;
          this.totalSales = sales.length;
          this.totalRevenue = sales.reduce((total, sale) => total + sale.total, 0);
          this.loading = false;
        },
        error: (error) => {
          console.error('Error al obtener las ventas:', error);
          this.errorMessage = 'No se pudieron obtener las ventas';
        }
      });
    }
    
}
