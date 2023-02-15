import { ListarUsuarioComponent } from "./listar-usuario/listar-usuario.component";
import { InserirEditarUsuarioComponent } from "./inserir-editar-usuario/inserir-editar-usuario.component";
import { Routes } from "@angular/router";
import { AuthGuard } from '../auth/auth.guard';

export const UsuarioRoutes: Routes = [
  {
    path:'usuarios',
    redirectTo: 'usuarios/listar',
  },
  {
    path: 'usuarios/listar',
    component: ListarUsuarioComponent,
    canActivate: [AuthGuard],
    data: {
      role: 'ADMIN'
    }
  },
  {
    path: 'usuarios/novo',
    component: InserirEditarUsuarioComponent,
    canActivate: [AuthGuard],
    data: {
      role: 'ADMIN'
    }
  },
  {
    path: 'usuarios/editar/:id',
    component: InserirEditarUsuarioComponent,
    canActivate: [AuthGuard],
    data: {
      role: 'ADMIN'
    }
  }

];
