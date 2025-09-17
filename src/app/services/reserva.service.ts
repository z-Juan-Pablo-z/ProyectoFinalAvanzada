import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

// Modelo para la búsqueda de disponibilidad
export interface BusquedaReserva {
  fechaEntrada: string;
  fechaSalida: string;
  adultos: number;
  ninos: number;
}

// Modelo básico para reservas (puedes ampliarlo si tu backend devuelve más campos)
export interface Reserva {
  _id?: string;   // MongoDB asigna un _id
  fechaEntrada: string;
  fechaSalida: string;
  numeroAdultos: number;
  numeroNinos: number;
  idHabitacion: string;
  costo?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  private refreshNeeded$ = new Subject<void>();

  get refresh$() {
    return this.refreshNeeded$.asObservable();
  }

  private apiUrl = 'http://localhost:3000/hotelesnick';

  constructor(private http: HttpClient) { }

  // Buscar habitaciones disponibles
  buscarDisponibilidad(filtros: BusquedaReserva): Observable<any[]> {
    return this.http.post<any[]>(`${this.apiUrl}/reservas/disponibles`, filtros);
  }

  // Registrar nueva reserva
  addReserva(reserva: Reserva): Observable<any> {
    return this.http.post(`${this.apiUrl}/reserva`, reserva).pipe(
      tap(() => {
        this.refreshNeeded$.next();
      })
    );
  }
  
  // Obtener todas las reservas
  obtenerReservas(): Observable<any> {
    let uri = `${this.apiUrl}/reservas`;
    return this.http.get(uri);
  }

  // Eliminar una reserva por ID
  eliminarReserva(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/reserva/${id}`).pipe(
      tap(() => {
        this.refreshNeeded$.next();
      })
    );
  }

  actualizarReserva(id: string, data: any) {
    return this.http.put(`${this.apiUrl}/reserva/${id}`, data);
  }

}
