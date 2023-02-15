import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditarPessoaComponent } from './pessoa/editar-pessoa/editar-pessoa.component';
import { InserirPessoaComponent } from './pessoa/inserir-pessoa/inserir-pessoa.component';
import { ListarPessoaComponent } from './pessoa/listar-pessoa/listar-pessoa.component';
import { LoginRoutes } from './auth/auth-routing.module';
import { AuthGuard } from './auth/auth.guard';
import { HomeComponent } from './home/home.component';
import { UsuarioRoutes } from './usuario/usuario-routing.module'
const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'pessoas',
    redirectTo: 'pessoas/listar',
  },
  {
    path: 'pessoas/listar',
    component: ListarPessoaComponent,
    canActivate: [AuthGuard],
    data: {
      role: 'ADMIN,GERENTE,CLIENTE'
    }
  },
  {
    path: 'pessoas/novo',
    component: InserirPessoaComponent,
    canActivate: [AuthGuard],
    data: {
      role: 'ADMIN,GERENTE,CLIENTE'
    }
  },
  {
    path: 'pessoas/editar/:id',
    component: EditarPessoaComponent,
    canActivate: [AuthGuard],
    data: {
      role: 'ADMIN,GERENTE,CLIENTE'
    }
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
    data: {
      role: 'ADMIN,GERENTE,CLIENTE'
    }
  },
  ...LoginRoutes,
  ...UsuarioRoutes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
