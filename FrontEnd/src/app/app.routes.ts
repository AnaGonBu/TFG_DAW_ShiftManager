import { Routes } from '@angular/router';
import { CalendarioComponent } from './pages/calendario/calendario.component';
import { CambioGestionComponent } from './pages/cambio-gestion/cambio-gestion.component';
import { CambioComponent } from './pages/cambio/cambio.component';
import { EmpFormComponent } from './pages/emp-form/emp-form.component';
import { EmpListComponent } from './pages/emp-list/emp-list.component';
import { EmpViewComponent } from './pages/emp-view/emp-view.component';
import { ConfigTurnosComponent } from './pages/config-turnos/config-turnos.component';

export const routes: Routes = [
    { path: "", pathMatch: "full", redirectTo: "empleados"},
    { path: "empleados", component: EmpListComponent},
    { path: "nuevo/empleado", component: EmpFormComponent },
    { path: "empleado/:idEmp", component: EmpViewComponent},
    { path: "actualizar/empleado/:idEmp", component: EmpFormComponent},
    { path: 'calendario', component: CalendarioComponent },
    { path: 'cambio', component: CambioComponent},
    { path: 'cambio/gestion', component: CambioGestionComponent},
    { path: 'turnos', component: ConfigTurnosComponent},
    { path: "**", redirectTo: "empleados"}
];

