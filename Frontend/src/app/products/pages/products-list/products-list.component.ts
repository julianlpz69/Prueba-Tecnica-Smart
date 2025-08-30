import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {
  products: Product[] = [];
  totalCount = 0;

  page = 1;
  pageSize = 5; 
  totalPages = 1;

  search = '';
  orderBy = 'name';
  asc = true;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(page = this.page) {
    this.page = page;
    this.productService.getProducts(this.page, this.pageSize, this.orderBy, this.asc)
      .subscribe(res => {
        let items = res.items;

        if (this.search) {
          items = items.filter((p: Product) =>
            p.name.toLowerCase().includes(this.search.toLowerCase())
          );
        }

        this.products = items;
        this.totalCount = res.totalCount;
        this.totalPages = Math.ceil(this.totalCount / this.pageSize);
      });
  }

  setOrder(column: string) {
    if (this.orderBy === column) {
      this.asc = !this.asc;
    } else {
      this.orderBy = column;
      this.asc = true;
    }
    this.loadProducts(1);
  }

  deleteProduct(id: number) {
    if (confirm('¿Seguro que quieres eliminar este producto?')) {
      this.productService.deleteProduct(id).subscribe(() => {
        this.loadProducts();
      });
    }
  }
}
