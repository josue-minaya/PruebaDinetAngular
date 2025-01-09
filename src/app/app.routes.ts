import { Routes } from '@angular/router';
import { NotFoundComponent } from './page/not-found/not-found.component';
import { ProductoComponent } from './page/producto/producto.component';
import { ListadoProductoComponent } from './shared/listado-producto/listado-producto.component';
export const routes: Routes = [
    {
        path:"",
        component:ProductoComponent

    },
    { path: '**', component: NotFoundComponent },
    
];
