import { Component } from '@angular/core';
import { HabitacionesService } from '../services/habitaciones.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  public habitaciones:any[]=[]

  constructor(public servicioHabitacion:HabitacionesService) { 
    servicioHabitacion.consultarHabitaciones()
    .subscribe(respuesta=>{
      this.habitaciones = respuesta.datos;
      console.log(respuesta);
    })
  }
}
