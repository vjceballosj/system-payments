import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Home } from './home/home';
import { AdminTemplate } from './admin-template/admin-template';
import { Dashboard } from './dashboard/dashboard';
import { LoadEstudiantes } from './load-estudiantes/load-estudiantes';
import { LoadPagos } from './load-pagos/load-pagos';
import { Login } from './login/login';
import { Pagos } from './pagos/pagos';
import { Profile } from './profile/profile';
import { Estudiantes } from './estudiantes/estudiantes';
import { AuthGuard } from './guards/auth-guard';

const routes: Routes = [
  { path: "", component: Login },
  { path: "login", component: Login },
  {
    path: "admin", component: AdminTemplate, 
    canActivate:[AuthGuard],
    children: [
      { path: "home", component: Home },
      { path: "pagos", component: Pagos },
      { path: "dashboard", component: Dashboard },
      { path: "estudiantes", component: Estudiantes },
      { path: "loadEstudiantes", component: LoadEstudiantes },
      { path: "loadPagos", component: LoadPagos },
      { path: "profile", component: Profile }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
