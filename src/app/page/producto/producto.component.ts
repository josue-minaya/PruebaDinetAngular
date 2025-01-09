import { Component, ViewChild } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatIconModule } from "@angular/material/icon";
import { FormsModule } from "@angular/forms";
import { ListadoProductoComponent } from "../../shared/listado-producto/listado-producto.component";
import { ProductoService } from "../../services/producto.service";
import { AddProducto, APIResponse } from "../../Models/ApiRepònse";

@Component({
  selector: "app-usuario",
  standalone: true,
  imports: [CommonModule, ListadoProductoComponent, MatIconModule, FormsModule],
  templateUrl: "./producto.component.html",
  styleUrl: "./producto.component.css",
})
export class ProductoComponent {
  searchTerm: string = "";
  searchCodi: string = "";
  productos: AddProducto[] = [];
  showModal: boolean = false;

  @ViewChild(ListadoProductoComponent) listadoProductoComponent:
    | ListadoProductoComponent
    | undefined;

  constructor(private productoService: ProductoService) {}
  nuevoProducto: AddProducto = {
    nombre: "",
    precio: null,
  };

  agregarProducto(): void {
    this.productoService.addProducto(this.nuevoProducto).subscribe(
      (response: APIResponse<AddProducto>) => {
        if (response.success) {
          this.productos.push(response.data);
          this.nuevoProducto = { nombre: "", precio: 0 }; 
        } else {
          console.log("Error al agregar producto:", response.message);
        }
      },
      (error) => {
        console.error("Error al agregar producto:", error);
      }
    );

    this.showModal = false;
    window.location.reload();
  }

  buscar(): void {
    if (this.listadoProductoComponent) {
      this.listadoProductoComponent.Filtrar();
    }
  }

  toggleModal(): void {
    this.showModal = !this.showModal;
  }
}
