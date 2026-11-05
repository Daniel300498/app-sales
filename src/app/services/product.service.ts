import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from '../models/product.model';
import {API_CONFIG} from '../api.config';
@Injectable({
  providedIn: 'root'
})

export class ProductService {
  private readonly apiUrl = `${API_CONFIG.BASE_URL}/products`;
  constructor(private http: HttpClient) { }
  
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }
}
  
