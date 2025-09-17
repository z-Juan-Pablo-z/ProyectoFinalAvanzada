import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './shared/menu/menu.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HomeComponent } from './home/home.component';
import { FormareservaComponent } from './formareserva/formareserva.component';
import { HabitacionesComponent } from './habitaciones/habitaciones.component';
import {HttpClientModule} from '@angular/common/http';
import { HabitacionFormComponent } from './components/habitacion-form/habitacion-form.component'
import { FormsModule } from '@angular/forms';
import { HabitacionListComponent } from './components/habitacion-list/habitacion-list.component';
import { ReservasListComponent } from './components/reserva-list/reserva-list.component'; //

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
    ReservasListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
