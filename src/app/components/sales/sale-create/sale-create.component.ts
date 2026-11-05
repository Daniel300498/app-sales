import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { Product } from 'src/app/models/product.model';
import { CreateSaleItem, CreateSaleRequest } from 'src/app/models/sale.model';
import { ProductService } from 'src/app/services/product.service';
import { SaleService } from 'src/app/services/sale.service';
@Component({
  selector: 'app-sale-create',
  templateUrl: './sale-create.component.html',
  styleUrls: ['./sale-create.component.scss']
})
export class SaleCreateComponent implements OnInit {
  products: Product[] = [];
  selectedProductId: number | null = null;
  quantity = 1;
  items: CreateSaleItem[] = [];
  loading=false;
  saving = false;
  errorMessage = '';
  successMessage = '';
  constructor(private productService: ProductService, private saleService: SaleService, private router: Router) { }
  ngOnInit(): void{
    this.loadProducts();
  }
  loadProducts(): void{
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

  addProduct(): void {
    this.errorMessage = '';
    if (this.selectedProductId === null || this.quantity <= 0) {
      this.errorMessage = 'Por favor, seleccione un producto y ingrese una cantidad válida.';
      return;
    }
   const product = this.products.find(p => p.id === this.selectedProductId);
    if (!product) {
      this.errorMessage = 'Producto no encontrado.';
      return;
    }
    const existingItem = this.items.find(item => item.product_id === product.id);
    const currentQuantity = existingItem ? existingItem.quantity : 0;
    const newQuantity = currentQuantity + this.quantity;
    if (newQuantity > product.stock) {
      this.errorMessage = `Stock insuficiente para ${product.name}. Disponible: ${product.stock}.`;
      return;
    }

    if (existingItem) {
      existingItem.quantity = newQuantity;
    } else {
      this.items.push({
        product_id: product.id,
        quantity: this.quantity
      });
    }
    this.selectedProductId = null;
    this.quantity = 1;
  }
  
  getProduct(productId: number): Product | undefined {
    return this.products.find(product => product.id === productId);
  }
  getSubtotal(item: CreateSaleItem): number{
    const product = this.getProduct(item.product_id);
    return product ? product.price * item.quantity : 0;
  }
  getTotal(): number{
    return this.items.reduce((total, item) => total + this.getSubtotal(item), 0);
  }
  removeProduct(productId: number): void{
    this.items = this.items.filter(item => item.product_id !== productId);
  }
  createSale(): void{
    this.errorMessage = '';
    this.successMessage = '';
    if(this.items.length === 0){
      this.errorMessage = 'Por favor, agregue al menos un producto a la venta.';
      return;
    }
    const data: CreateSaleRequest = {
      user_id: 1,
      items: this.items
    };
    this.saving = true;
    this.saleService.createSale(data).subscribe({
      next: (response) => {
        this.saving = false;
        this.successMessage = response.message;
        setTimeout(() => {
          this.router.navigate(['/sales']);},1000);
      },
        error: (error)=> {console.error('Error al crear la venta:', error);
        this.errorMessage = error.error.message || 'No se pudo crear la venta.';
        this.saving = false;
      }   
    });
  }
}
