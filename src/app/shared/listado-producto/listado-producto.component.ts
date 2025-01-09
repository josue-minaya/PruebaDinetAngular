import { Component, Input } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";
import { Subject } from "rxjs";
import { ProductoService } from "../../services/producto.service";
import { APIResponse, Producto } from "../../Models/ApiRepònse";

@Component({
  selector: "app-listado-producto",
  standalone: true,
  imports: [MatTableModule, MatIconModule, MatCheckboxModule],
  templateUrl: "./listado-producto.component.html",
  styleUrl: "./listado-producto.component.css",
})
export class ListadoProductoComponent {
  @Input() searchTerm: string = "";
  @Input() searchCodi: string = "";
  dataSource: any;

  constructor(private productoService: ProductoService) {}

  ngOnInit(): void {
    this.listarProductos();
  }

  listarProductos(): void {
    this.productoService.getProductos().subscribe(
      (response: APIResponse<Producto[]>) => {
        this.dataSource = new MatTableDataSource<Producto>(response.data);
      },
      (error) => {
        console.error("Error al obtener productos:", error);
      }
    );
  }

  columnsToDisplay = ["id", "nombre", "precio", "fechaCreacion"];
  NombreColumnas = ["Id", "Nombre", "Precio Unitario", "F. Creación"];

  filterSubject: Subject<string> = new Subject<string>();

  configuracionFiltro() {
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      const filters = filter.split(" ");
      const searchCodi = filters[0];
      const searchTerm = filters[1];

      return (
        data.id.toString().includes(searchCodi) &&
        data.nombre.toLowerCase().includes(searchTerm)
      );
    };
  }

  configuracionFiltroCodigo() {
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      const filters = filter.split(" ");
      const searchCodi = filters[0];

      return data.id.toString().includes(searchCodi);
    };
  }

  configuracionFiltroNombre() {
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      const filters = filter.split(" ");
      const searchCodi = filters[0];

      return data.nombre.toLowerCase().includes(searchCodi);
    };
  }

  ngAfterViewInit() {
    this.filterSubject
      .pipe(debounceTime(200), distinctUntilChanged())
      .subscribe(() => this.Filtrar());
  }

  Filtrar() {
    if (this.searchTerm.trim() !== "" && this.searchCodi.trim() !== "") {
      this.configuracionFiltro();
      const combinedFilter = `${this.searchCodi
        .toString()
        .trim()} ${this.searchTerm.trim().toLowerCase()}`;
      this.dataSource.filter = combinedFilter;
    } else if (this.searchTerm.trim() !== "") {
      this.filterSubject.next(`${this.searchTerm}`);
      this.configuracionFiltroNombre();
      this.dataSource.filter = this.searchTerm.trim().toLowerCase();
    } else if (this.searchCodi.trim() !== "") {
      this.filterSubject.next(`${this.searchCodi}`);
      this.configuracionFiltroCodigo();
      this.dataSource.filter = this.searchCodi.toString().trim();
    } else {
      this.dataSource.filter = "";
    }
  }
}
