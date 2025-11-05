import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Rutas
import { AppRoutingModule } from './app-routing.module';

// Componentes principales
import { AppComponent } from './app.component';
import { MenuComponent } from './shared/menu/menu.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HomeComponent } from './home/home.component';

// Módulos funcionales
import { FormareservaComponent } from './formareserva/formareserva.component';
import { HabitacionesComponent } from './habitaciones/habitaciones.component';

// CRUD Habitaciones
import { HabitacionFormComponent } from './components/habitacion-form/habitacion-form.component';
import { HabitacionListComponent } from './components/habitacion-list/habitacion-list.component';

// CRUD Reservas
import { ReservasListComponent } from './components/reserva-list/reserva-list.component';

// 🔹 Aquí puedes añadir Clientes y Contacto cuando los tengas
// import { ClienteListComponent } from './components/cliente-list/cliente-list.component';
// import { ClienteAddComponent } from './components/cliente-add/cliente-add.component';
// import { ContactoComponent } from './components/contacto/contacto.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    FooterComponent,
    HomeComponent,
    FormareservaComponent,
    HabitacionesComponent,
    HabitacionFormComponent,
    HabitacionListComponent,
    ReservasListComponent,
    // ClienteListComponent,
    // ClienteAddComponent,
    // ContactoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,  // 👈 Rutas funcionando
    FormsModule,       // 👈 Formularios Template Driven
    HttpClientModule   // 👈 Para consumir tu API
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
