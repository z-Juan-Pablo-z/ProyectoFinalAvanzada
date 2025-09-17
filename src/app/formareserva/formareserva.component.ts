import { Component } from '@angular/core';
import { ReservaService } from '../services/reserva.service';
import { BusquedaReserva } from '../services/reserva.service';
import { HabitacionesService } from '../services/habitaciones.service';


@Component({
  selector: 'app-formareserva',
  templateUrl: './formareserva.component.html',
  styleUrls: ['./formareserva.component.css']
})
export class FormareservaComponent {

  busqueda: BusquedaReserva = {
    fechaEntrada: '',
    fechaSalida: '',
    adultos: 1,
    ninos: 0
  };

  habitacionesDisponibles: any[] = [];
  rangoFechasValido: boolean = true;

  constructor(private habitacionesService: HabitacionesService, private reservaService: ReservaService) {}

  validarRangoFechas() {
    const entrada = new Date(this.busqueda.fechaEntrada);
    const salida = new Date(this.busqueda.fechaSalida);

    if (this.busqueda.fechaEntrada && this.busqueda.fechaSalida) {
      this.rangoFechasValido = salida > entrada;
    } else {
      this.rangoFechasValido = true;  // no validar si faltan fechas
    }
  }

  buscarDisponibilidad(form: any) {
    // Validar el formulario y rango fechas antes de enviar
    this.validarRangoFechas();

    if (!form.valid) {
      this.mostrarAlerta('Por favor completa todos los campos requeridos.', 'danger');
      return;
    }

    if (!this.rangoFechasValido) {
      this.mostrarAlerta('La fecha de salida debe ser posterior a la fecha de entrada.', 'danger');
      return;
    }

    // Aseguramos que adultos y niños sean números
    this.busqueda.adultos = Number(this.busqueda.adultos);
    this.busqueda.ninos = Number(this.busqueda.ninos);

    console.log('📤 Enviando al backend:', this.busqueda);

    this.reservaService.buscarDisponibilidad(this.busqueda).subscribe({
      next: (res) => {
        this.habitacionesDisponibles = res;
        console.log('✅ Habitaciones disponibles:', res);
      },
      error: (err) => {
        console.error('❌ Error buscando disponibilidad', err);
        alert('No se pudo realizar la búsqueda');
      }
    });
  }

  
  guardarReserva(idHabitacion : string) {
    // Validar que las fechas y personas estén correctas
    this.validarRangoFechas();
    
    let id = idHabitacion;
    if (!this.busqueda.fechaEntrada || !this.busqueda.fechaSalida) {
      this.mostrarAlerta('Debes ingresar fechas válidas 🗓️', 'danger');
      return;
    }

    if (!this.rangoFechasValido) {
      this.mostrarAlerta('La fecha de salida debe ser posterior a la fecha de entrada.', 'danger');
      return;
    }

    if (this.busqueda.adultos == null || this.busqueda.ninos == null) {
      this.mostrarAlerta('Por favor indica el número de adultos y niños.', 'danger');
      return;
    }

    const reserva = {
      fechaEntrada: this.busqueda.fechaEntrada,
      fechaSalida: this.busqueda.fechaSalida,
      numeroAdultos: this.busqueda.adultos,
      numeroNinos: this.busqueda.ninos,
      idHabitacion: id
    };

    this.reservaService.addReserva(reserva).subscribe({
      next: res => {
        console.log('Reserva guardada:', res);
        this.mostrarAlerta('Reserva registrada correctamente ✅', 'success');
        this.resetForm();
      },
      error: err => {
        console.error('Error al guardar la reserva:', err);
        this.mostrarAlerta('Error registrando la reserva ❌', 'danger');
      }
    });
  }

  mostrarAlerta(mensaje: string, tipo: 'success' | 'danger') {
    alert(`${tipo.toUpperCase()}: ${mensaje}`);
  }

  resetForm() {
    this.busqueda = {
      fechaEntrada: '',
      fechaSalida: '',
      adultos: 1,
      ninos: 0
    };
    this.habitacionesDisponibles = [];
    this.rangoFechasValido = true;
  }
}
