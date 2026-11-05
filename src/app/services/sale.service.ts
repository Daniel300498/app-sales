import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Sale, CreateSaleRequest, CreateSaleResponse, DeleteSaleResponse} from '../models/sale.model';
import {API_CONFIG} from '../api.config';
@Injectable({
  providedIn: 'root'
})

export class SaleService {
  private readonly apiUrl = `${API_CONFIG.BASE_URL}/sales`;
  constructor(private http: HttpClient) { }

  getSales(): Observable<Sale[]> {
    return this.http.get<Sale[]>(this.apiUrl);
  }
  createSale(saleRequest: CreateSaleRequest): Observable<CreateSaleResponse> {
    return this.http.post<CreateSaleResponse>(this.apiUrl, saleRequest);
  }

  deleteSale(id: number): Observable<DeleteSaleResponse> {
    return this.http.delete<DeleteSaleResponse>(`${this.apiUrl}/${id}`);
  }
}
  
