import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductListComponent } from './components/products/product-list/product-list.component';
import { SaleListComponent } from './components/sales/sale-list/sale-list.component';
import { SaleCreateComponent } from './components/sales/sale-create/sale-create.component';
const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'products', component: ProductListComponent },
  { path: 'sales', component: SaleListComponent },
  { path: 'sales/create', component: SaleCreateComponent },
  { path: '**' , redirectTo: '/home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
