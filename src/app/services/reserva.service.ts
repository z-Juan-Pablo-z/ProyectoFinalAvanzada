import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject  } from 'rxjs';
import { tap } from 'rxjs/operators';



// Aquí defines el modelo directamente en el servicio
export interface BusquedaReserva {
  fechaEntrada: string;
  fechaSalida: string;
  adultos: number;
  ninos: number;
}

@Injectable({
  providedIn: 'root'
})
export class ReservaService {
  //  Subject para refrescar listado
  private refreshNeeded$ = new Subject<void>();
  // Observable que podrán escuchar otros componentes
   get refresh$() {
    return this.refreshNeeded$.asObservable();
  }

  private apiUrl = 'http://localhost:3000/hotelesnick/reservas'; // Cambia la URL según tu backend

  constructor(public peticion: HttpClient) { }

  buscarDisponibilidad(filtros: BusquedaReserva): Observable<any[]> {
    return this.peticion.post<any[]>(`${this.apiUrl}/disponibles`, filtros);
  }

  addReserva(reserva: any): Observable<any> {
      let uri = "http://localhost:3000/hotelesnick"
      return this.peticion.post(`${uri}/reserva`, reserva).pipe(
        tap(() => {
          this.refreshNeeded$.next();
        })
      );
    }

}
