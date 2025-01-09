import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, Observable } from "rxjs";
import { AddProducto, APIResponse, Producto } from "../Models/ApiRepònse";

@Injectable({
  providedIn: "root",
})
export class ProductoService {
  private apiUrl = "http://localhost:5017/api/productos"; 

  constructor(private http: HttpClient) {}

  getProductos(): Observable<APIResponse<Producto[]>> {
    return this.http.get<APIResponse<Producto[]>>(this.apiUrl);
  }

  addProducto(producto: AddProducto): Observable<APIResponse<AddProducto>> {
    return this.http.post<APIResponse<AddProducto>>(this.apiUrl, producto);
  }
}
