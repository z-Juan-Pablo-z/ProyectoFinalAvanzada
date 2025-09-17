import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HabitacionesService {
  private refreshNeeded$ = new Subject<void>();

  get refresh$() {
    return this.refreshNeeded$.asObservable();
  }

  private apiUrl = "http://localhost:3000/hotelesnick"; // 👈 Centralizamos aquí

  constructor(public peticion: HttpClient) {}

  // Obtener todas las habitaciones
  consultarHabitaciones(): Observable<any> {
    return this.peticion.get(`${this.apiUrl}/habitaciones`);
  }

  // Obtener habitación por ID
  getHabitacionById(idHabitacion: string): Observable<any> {
    return this.peticion.get(`${this.apiUrl}/habitacion/${idHabitacion}`);
  }

  // Agregar una nueva habitación
  addHabitacion(habitacion: any): Observable<any> {
    return this.peticion.post(`${this.apiUrl}/habitacion`, habitacion).pipe(
      (res: any) => {
        this.refreshNeeded$.next();
        return res;
      }
    );
  }
}
