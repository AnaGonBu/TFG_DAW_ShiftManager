import { Routes } from '@angular/router';
import { EmpListComponent } from './pages/emp-list/emp-list.component';
import { EmpViewComponent } from './pages/emp-view/emp-view.component';
import { EmpFormComponent } from './pages/emp-form/emp-form.component';
import { CalendarioComponent } from './pages/calendario/calendario.component';

export const routes: Routes = [
    { path: "", pathMatch: "full", redirectTo: "empleados"},
    { path: "empleados", component: EmpListComponent},
    { path: "nuevo/empleado", component: EmpFormComponent },
    { path: "empleado/:idEmp", component: EmpViewComponent},
    { path: "actualizar/empleado/:idEmp", component: EmpFormComponent},
    { path: 'calendario', component: CalendarioComponent },
    {path: "**", redirectTo: "empleados"}
];

