import { Component } from '@angular/core';
import { HabitacionesService } from '../../services/habitaciones.service';

@Component({
  selector: 'app-habitacion-form',
  templateUrl: './habitacion-form.component.html',
  styleUrls: ['./habitacion-form.component.css']
})
export class HabitacionFormComponent {
  habitacion = {
    nombre: '',
    valorNoche: 0,
    descripcion: '',
    fotografias: [] as string[],
    numeroMaximoPersonas: 1
  };

  fotosInput: string = '';

  // 👇 Variables para manejar alertas
  mensaje: string = '';
  tipoAlerta: string = ''; // success | danger

  constructor(private habitacionService: HabitacionesService) {}

  guardarHabitacion() {
    if (this.fotosInput.trim() !== '') {
      this.habitacion.fotografias = this.fotosInput.split(',').map(f => f.trim());
    }

    this.habitacionService.addHabitacion(this.habitacion).subscribe({
      next: res => {
        console.log('Habitación guardada:', res);
        this.mostrarAlerta('Habitación registrada correctamente ✅', 'success');
        this.resetForm();
      },
      error: err => {
        console.error(err);
        this.mostrarAlerta('Error registrando la habitación ❌', 'danger');
      }
    });
  }

  resetForm() {
    this.habitacion = {
      nombre: '',
      valorNoche: 0,
      descripcion: '',
      fotografias: [],
      numeroMaximoPersonas: 1
    };
    this.fotosInput = '';
  }

  // 👇 Función para mostrar alertas bonitas
  mostrarAlerta(mensaje: string, tipo: string) {
    this.mensaje = mensaje;
    this.tipoAlerta = tipo;

    // Ocultar la alerta automáticamente después de 3 segundos
    setTimeout(() => {
      this.mensaje = '';
      this.tipoAlerta = '';
    }, 3000);
  }
}
