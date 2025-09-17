import { Component, OnInit, OnDestroy } from '@angular/core';
import { HabitacionesService } from '../../services/habitaciones.service';
import { Subscription } from 'rxjs';

declare var bootstrap: any;

@Component({
  selector: 'app-habitacion-list',
  templateUrl: './habitacion-list.component.html',
  styleUrls: ['./habitacion-list.component.css']
})
export class HabitacionListComponent implements OnInit, OnDestroy {
  habitaciones: any[] = [];
  private subscription!: Subscription;
  habitacionSeleccionada: any = {}; // 👈 Aquí guardamos la habitación a editar

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

  abrirModalEditar(habitacion: any): void {
    this.habitacionSeleccionada = { ...habitacion };
    const modal = new bootstrap.Modal(document.getElementById('modalEditar'));
    modal.show();
  }

  guardarEdicion(): void {
    if (!this.habitacionSeleccionada._id) return;

    this.habitacionService.updateHabitacion(
      this.habitacionSeleccionada._id,
      this.habitacionSeleccionada
    ).subscribe({
      next: () => {
        console.log("✅ Habitación actualizada con éxito");
        this.cargarHabitaciones();

        const modalEl = document.getElementById('modalEditar');
        const modal = bootstrap.Modal.getInstance(modalEl);
        modal.hide();
      },
      error: (err) => {
        console.error("❌ Error al actualizar habitación:", err);
      }
    });
  }

  eliminarHabitacion(id: string): void {
    if (confirm("¿Seguro que deseas eliminar esta habitación?")) {
      this.habitacionService.deleteHabitacion(id).subscribe({
        next: () => {
          console.log("✅ Habitación eliminada");
          this.cargarHabitaciones(); // recarga la tabla
        },
        error: (err) => {
          console.error("❌ Error eliminando habitación", err);
        }
      });
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
