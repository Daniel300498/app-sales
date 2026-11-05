import { Component, OnInit } from '@angular/core';
import {Product} from "../../../models/product.model";
import {ProductService} from "../../../services/product.service";
  @Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.scss']
  })
  export class ProductListComponent implements OnInit {
    //Buscador y ordenamiento de Productos
    searchTerm = '';
    sortBy: 'id' | 'name' | 'price' | 'stock' = 'id';
    get filteredProducts(): Product[] {
      const search = this.searchTerm.trim().toLowerCase();
      const filtered = this.products.filter(product =>
        Object.values(product).some(value =>
          String(value).toLowerCase().includes(search)
        )
      );

      return [...filtered].sort((a, b) => {
        switch (this.sortBy) {
          case 'name':
            return a.name.localeCompare(b.name);
          case 'price':
            return a.price - b.price;
          case 'stock':
            return a.stock - b.stock;
          default:
            return a.id - b.id;
        }
      });
    }
    //Fin Buscador y Ordenamiento
    products: Product[] = [];
    loading = false;
    errorMessage = '';
    constructor(private productService: ProductService) { }
      ngOnInit(): void {
        this.loadProducts();
      }
      loadProducts(): void {
        this.loading = true;
        this.errorMessage = '';
        this.productService.getProducts().subscribe({
          next: (products: Product[]) => {
            this.products = products;
            this.loading = false;
          },
          error: (error) => {
            console.error('Error al obtener los productos:', error);
            this.errorMessage = 'No se pudieron obtener los productos';
            this.loading = false;
        }
      });
      }
  }
  