import { Component, OnInit, OnDestroy } from '@angular/core';
import { ReservaService } from '../../services/reserva.service';
import { HabitacionesService } from '../../services/habitaciones.service';
import { Subscription } from 'rxjs';
declare var bootstrap: any;


@Component({
  selector: 'app-reserva-list',
  templateUrl: './reserva-list.component.html',
  styleUrls: ['./reserva-list.component.css']
})
export class ReservasListComponent implements OnInit, OnDestroy {
  reservas: any[] = [];
  private subscription!: Subscription;

  // 🟢 Para edición
  reservaSeleccionada: any = {};
  private modalRef: any;

  constructor(
    private reservaService: ReservaService,
    private habitacionesService: HabitacionesService
  ) {}

  ngOnInit(): void {
    this.cargarReservas();

    // 🔄 Si tu servicio de reservas tiene un refresh$
    if (this.reservaService.refresh$) {
      this.subscription = this.reservaService.refresh$.subscribe(() => {
        this.cargarReservas();
      });
    }
  }

  // 🔹 Traer todas las reservas del backend
  cargarReservas(): void {
    this.reservaService.obtenerReservas().subscribe({
      next: (resp: any) => {
        let reservasCargadas = resp.datos;

        // Agregar nombre de la habitación
        reservasCargadas.forEach((reserva: any) => {
          this.habitacionesService.getHabitacionById(reserva.idHabitacion).subscribe((habitacion: any) => {
            reserva.nombreHabitacion = habitacion.datos.nombre;
          });
        });

        this.reservas = reservasCargadas;
        console.log('Reservas con nombre:', this.reservas);
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

  // 🔹 Abrir modal de edición
  abrirModal(reserva: any): void {
    this.reservaSeleccionada = { ...reserva }; // Clonamos la reserva
    const modalEl = document.getElementById('editarReservaModal');
     // 🔥 Convertimos las fechas al formato yyyy-MM-dd para el input[type=date]
    if (this.reservaSeleccionada.fechaEntrada) {
      this.reservaSeleccionada.fechaEntrada = this.reservaSeleccionada.fechaEntrada.slice(0, 10);
    }
    if (this.reservaSeleccionada.fechaSalida) {
      this.reservaSeleccionada.fechaSalida = this.reservaSeleccionada.fechaSalida.slice(0, 10);
    }

    console.log('✏️ Editar reserva:', this.reservaSeleccionada);
    if (modalEl) {
      this.modalRef = new bootstrap.Modal(modalEl);
      this.modalRef.show();
    }
  }

  

  // 🔹 Guardar cambios en reserva
  guardarEdicion(): void {
    this.reservaService.actualizarReserva(this.reservaSeleccionada._id, this.reservaSeleccionada).subscribe({
      next: () => {
        console.log('✅ Reserva actualizada');
        this.cargarReservas();
        this.modalRef.hide();
      },
      error: (err) => {
        console.error('❌ Error actualizando reserva:', err);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
