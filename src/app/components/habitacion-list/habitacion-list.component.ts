import { Component, OnInit,OnDestroy  } from '@angular/core';
import { HabitacionesService } from '../../services/habitaciones.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-habitacion-list',
  templateUrl: './habitacion-list.component.html',
  styleUrls: ['./habitacion-list.component.css']
})
export class HabitacionListComponent implements OnInit {
  habitaciones: any[] = [];
  private subscription!: Subscription;

  constructor(private habitacionService: HabitacionesService) {}

  ngOnInit(): void {
    this.cargarHabitaciones();
    // 🔥 Nos suscribimos al refresh del servicio
    this.subscription = this.habitacionService.refresh$.subscribe(() => {
      this.cargarHabitaciones();
    });
  }

  cargarHabitaciones() {
    this.habitacionService.consultarHabitaciones().subscribe({
      next: (res: any) => {
        this.habitaciones = res.datos;
        console.log('Habitaciones cargadas:', this.habitaciones);
      },
      error: err => {
        console.error('Error al cargar habitaciones:', err);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
