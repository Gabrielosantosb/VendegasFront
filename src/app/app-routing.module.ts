import { NgModule } from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./modules/home/home.component";
import {AuthGuardService} from "./guards/auth-guard.service";
import {NotfoundComponent} from "./comon-pages/notfound/notfound.component";
import {ClienteHomeComponent} from "./modules/cliente/page/cliente-home/cliente-home.component";
import {ProdutoTableComponent} from "./modules/produto/produto-table/produto-table.component";
const routes: Routes = [
  {
    path : "",
    redirectTo:"empresa",
    pathMatch:"full"
  },
  {
    path : "home",
    component: HomeComponent,
  },

  {
    path : "empresa",
    loadChildren: ()=> import('./modules/empresa/empresa.module')
      .then((m)=> m.EmpresaModule),
    canActivate:[AuthGuardService]
  },
  {
    path: "produto",
    loadChildren: () => import("./modules/produto/produto.module")
      .then((m) => m.ProdutoModule),
    canActivate: [AuthGuardService]

  },
  {
    path : "cliente",
    loadChildren: ()=> import('./modules/cliente/cliente.module')
      .then((m)=> m.ClienteModule),
    canActivate:[AuthGuardService]
  },
  {
    path : "pedidos",
    loadChildren: ()=> import('./modules/pedido_produto/pedido_produto.module')
      .then((m)=> m.PedidoProdutoModule),
    canActivate:[AuthGuardService]
  },
  {
    path: "404",
    loadChildren:() => import('../app/comon-pages/notfound/not-found.module')
      .then((m) => m.NotFoundModule),
  },
  { path: "**", component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
