import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Importar tus componentes
import { HomeComponent } from './home/home.component';
import { HabitacionListComponent } from './components/habitacion-list/habitacion-list.component';
import { HabitacionFormComponent } from './components/habitacion-form/habitacion-form.component';
import { ReservasListComponent } from './components/reserva-list/reserva-list.component';
//import { FormareservaComponent } from './formareserva/formareserva.component';
//import { ClienteListComponent } from './components/cliente-list/cliente-list.component';
//import { ClienteAddComponent } from './components/cliente-add/cliente-add.component';
//import { ContactoComponent } from './components/contacto/contacto.component';

const routes: Routes = [
  { path: '', component: HabitacionListComponent }, // Página de inicio
  { path: 'habitaciones', component: HabitacionListComponent },
  { path: 'habitacion-add', component: HabitacionFormComponent },
  { path: 'reservas', component: ReservasListComponent },
  //{ path: 'reserva-add', component: FormareservaComponent },
  //{ path: 'clientes', component: ClienteListComponent },
  //{ path: 'cliente-add', component: ClienteAddComponent },
  //{ path: 'contacto', component: ContactoComponent },
  { path: '**', redirectTo: '/home', pathMatch: 'full' } // Redirección a inicio si no encuentra ruta
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
