import { Component, OnInit } from '@angular/core';
import { ReservaService } from '../../services/reserva.service';
import { HabitacionesService } from '../../services/habitaciones.service';


@Component({
  selector: 'app-reserva-list',
  templateUrl: './reserva-list.component.html',
  styleUrls: ['./reserva-list.component.css']
})
export class ReservasListComponent implements OnInit {
  reservas: any[] = [];

  constructor(private reservaService: ReservaService,private HabitacionesService: HabitacionesService) {}

  ngOnInit(): void {
    this.cargarReservas();
  }

  // 🔹 Traer todas las reservas del backend
  cargarReservas(): void {
    this.reservaService.obtenerReservas().subscribe({
      next: (resp : any) => {
        let reservasCargadas = resp.datos; // 👈 ya es un array

        // Para cada reserva, buscamos el nombre de la habitación
        reservasCargadas.forEach((reserva: any) => {
          this.HabitacionesService.getHabitacionById(reserva.idHabitacion).subscribe((habitacion: any) => {
            
            reserva.nombreHabitacion = habitacion.datos.nombre; // 👈 añadimos el campo
          });
        });

        this.reservas = reservasCargadas;
        console.log("Reservas con nombre:", this.reservas);
      },
      error: (err) => {
        console.error('❌ Error cargando reservas:', err);
      }
    });
  }

  // 🔹 Eliminar una reserva
  eliminarReserva(id: string): void {
    if (confirm('¿Seguro que deseas eliminar esta reserva?')) {
      this.reservaService.eliminarReserva(id).subscribe({
        next: () => {
          this.reservas = this.reservas.filter(r => r._id !== id);
          console.log('✅ Reserva eliminada:', id);
        },
        error: (err) => {
          console.error('❌ Error eliminando reserva:', err);
        }
      });
    }
  }

  // 🔹 Editar una reserva (por ahora solo mostramos en consola)
  editarReserva(reserva: any): void {
    console.log('✏️ Editar reserva:', reserva);
    // Aquí puedes abrir un modal o redirigir a un formulario
  }
}
