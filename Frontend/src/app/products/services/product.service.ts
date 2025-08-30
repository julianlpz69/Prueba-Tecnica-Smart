import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private apiUrl = 'https://localhost:7195/api/products'; // Ajusta al puerto de tu backend

  constructor(private http: HttpClient) {}

  getProducts(page = 1, pageSize = 10, orderBy = 'name', asc = true): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?page=${page}&pageSize=${pageSize}&orderBy=${orderBy}&asc=${asc}`);
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  createProduct(product: Omit<Product, 'id' | 'createdAt'>): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }

  updateProduct(id: number, product: Omit<Product, 'id' | 'createdAt'>): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, product);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
