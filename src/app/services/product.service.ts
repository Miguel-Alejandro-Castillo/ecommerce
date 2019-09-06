import { Injectable } from '@angular/core';
import { Product } from '../models/interfaces/product';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) { }

  getProducts(): Observable<Product[]> {
      return this.httpClient.get<Product[]>('../../../assets/jsons/products.json');
  }

}
