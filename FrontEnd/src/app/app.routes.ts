import { Routes } from '@angular/router';
import { CalendarComponent } from './pages/calendar/calendar.component';
import { CalendarioComponent } from './pages/calendario/calendario.component';
import { authGuard } from './guards/auth.guard';
import { roleGuard } from './guards/role.guard';



export const routes: Routes = [

    //rutas públicas
    { path: "", pathMatch: "full", redirectTo: "calendario"},
    { path: 'calendario', component: CalendarioComponent },
    { path: 'calendario',loadComponent: () => import( './pages/calendario/calendario.component').then( m => m.CalendarioComponent )},
    { path: 'empleados/grupo/:idGrupo',loadComponent: () => import('./pages/emp-list/emp-list.component').then(m => m.EmpListComponent)},
    { path: "empleados",loadComponent: () => import('./pages/emp-list/emp-list.component').then(m =>m.EmpListComponent)},
    { path: "empleado/:idEmp",loadComponent: () => import('./pages/emp-view/emp-view.component' ).then( m => m.EmpViewComponent)},
    { path: 'cambio',loadComponent: () => import('./pages/cambio/cambio.component' ).then( m => m.CambioComponent)},
    { path: "login",loadComponent: () => import('./pages/login/login.component' ).then( m => m.LoginComponent)},
    


    //rutas admin
    { path: "nuevo/empleado",loadComponent: () => import( './pages/emp-form/emp-form.component').then( m => m.EmpFormComponent ), canActivate: [authGuard, roleGuard], data: { role: 'admin' }},
    //{ path: "empleado/:idEmp",loadComponent: () => import('./pages/emp-view/emp-view.component' ).then( m => m.EmpViewComponent)},
    { path: "actualizar/empleado/:idEmp",loadComponent: () =>import('./pages/emp-form/emp-form.component' ).then ( m => m.EmpFormComponent) , canActivate: [authGuard, roleGuard], data: { role: 'admin' }},
    { path: 'cambio/gestion',loadComponent: () => import('./pages/cambio-gestion/cambio-gestion.component' ).then( m => m.CambioGestionComponent), canActivate: [authGuard, roleGuard], data: { role: 'admin' }},
    { path: 'turnos',loadComponent: () => import( './pages/config-turnos/config-turnos.component').then( m => m.ConfigTurnosComponent), canActivate: [authGuard, roleGuard], data: { role: 'admin' }},
    

    //rutas no encontradas
    { path: "**", redirectTo: "calendario"},
];

