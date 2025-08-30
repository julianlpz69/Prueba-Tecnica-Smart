import { Routes } from '@angular/router';
import { ProductsListComponent } from './products/pages/products-list/products-list.component';
import { ProductsFormComponent } from './products/pages/products-form/products-form.component';

export const routes: Routes = [
  { path: 'products', component: ProductsListComponent },
  { path: 'products/create', component: ProductsFormComponent },
  { path: 'products/edit/:id', component: ProductsFormComponent },
  { path: '**', redirectTo: 'products' }
];
