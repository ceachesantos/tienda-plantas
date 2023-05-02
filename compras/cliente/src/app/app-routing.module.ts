import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearCompraComponent } from './components/crear-compra/crear-compra.component';

//componentes
import { ListarProductosComponent } from './components/listar-productos/listar-productos.component';

const routes: Routes = [
  {path: '', component: ListarProductosComponent},
  //{path: 'compras/:id', component: ListarProductosComponent},
  {path: 'crear-compra/:idArticulo/:cantidadDeseada', component:CrearCompraComponent},
  {path: 'crear-compra', component:CrearCompraComponent},
  {path: 'editar-compra/:idArticulo/:idCompra', component:CrearCompraComponent},
  {path: '**', redirectTo: '', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
