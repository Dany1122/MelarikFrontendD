import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environmnet } from '../../environments/environment';  // Corregir nombre de 'environmnet' a 'environment'
import { UserInterface } from '../interfaces/users.interface';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = environmnet.ENV_URL + '/admin';  // Corregido

  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<any> {
    return this.http.get(`${this.apiUrl}/productos`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError)); // Agregar manejo de errores
  }
  
  getAllUsers(token: string): Observable<UserInterface[]> {
    return this.http.post<UserInterface[]>(`${environmnet.ENV_URL}/api/admin/usuarios`, {}, {
      headers: {
        'x-token': token
      }
    });
  }

  createProduct(product: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/productos`, product, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError)); 
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/productos/${id}`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError)); 
  }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') || '';
    return new HttpHeaders({
      'x-token': token,  // Corrección en el header
      'Content-Type': 'application/json'
    });
  }

  private handleError(error: any): Observable<never> {
    let errorMessage = 'Ha ocurrido un error en la solicitud';
    if (error.error instanceof ErrorEvent) {
        errorMessage = `Error: ${error.error.message}`;
    } else {
        errorMessage = `Código de error: ${error.status}, Mensaje: ${error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }
}