import { Routes } from '@angular/router';
import { CalendarComponent } from './calendar/calendar/calendar.component';


export const routes: Routes = [
    { path: "", pathMatch: "full", redirectTo: "calendario"},
    { path: 'calendario', component: CalendarComponent },
    { path: "empleados",loadComponent: () => import('./pages/emp-list/emp-list.component').then(m =>m.EmpListComponent)},
    { path: "nuevo/empleado",loadComponent: () => import( './pages/emp-form/emp-form.component').then( m => m.EmpFormComponent )},
    { path: "empleado/:idEmp",loadComponent: () => import('./pages/emp-view/emp-view.component' ).then( m => m.EmpViewComponent)},
    { path: "actualizar/empleado/:idEmp",loadComponent: () =>import('./pages/emp-form/emp-form.component' ).then ( m => m.EmpFormComponent)},
    //{ path: 'calendario',loadComponent: () => import( './pages/calendario/calendario.component').then( m => m.CalendarioComponent )},
    { path: 'cambio',loadComponent: () => import('./pages/cambio/cambio.component' ).then( m => m.CambioComponent)},
    { path: 'cambio/gestion',loadComponent: () => import('./pages/cambio-gestion/cambio-gestion.component' ).then( m => m.CambioGestionComponent)},
    { path: 'turnos',loadComponent: () => import( './pages/config-turnos/config-turnos.component').then( m => m.ConfigTurnosComponent)},
    { path: "login",loadComponent: () => import('./pages/login/login.component' ).then( m => m.LoginComponent)},
    { path: "**", redirectTo: "calendario"}


];

