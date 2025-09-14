import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable, Subject  } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HabitacionesService {
  //  Subject para refrescar listado
  private refreshNeeded$ = new Subject<void>();
  // Observable que podrán escuchar otros componentes
   get refresh$() {
    return this.refreshNeeded$.asObservable();
  }
  constructor(public peticion:HttpClient) {}
    // Obtener todas las habitaciones
  consultarHabitaciones():Observable<any>{
    let uri = "http://localhost:3000/hotelesnick/habitaciones"
    
    //let uri = "http://serve20222.herokuapp.com/hotelesnick/habitaciones"
    return this.peticion.get(uri);
  }
  
  // Agregar una nueva habitación y emitir el refresh
  addHabitacion(habitacion: any): Observable<any> {
    let uri = "http://localhost:3000/hotelesnick"
    return this.peticion.post(`${uri}/habitacion`, habitacion).pipe(
      //al completar la peticion notificamos a los subscriptores
      (res: any)=>{
        this.refreshNeeded$.next();
        return res;
      }
    );
  }
  

}
