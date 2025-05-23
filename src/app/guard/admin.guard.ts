import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Role } from '../../app/enums/role.enum'; // Asegúrate de importar el enum

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    // Verificar si el token y el rol son correctos
    if (token && role === Role.Admin) {
      return true; // Si es admin, permitir el acceso
    }

    // Si no es admin, redirigir a la página principal o una página de error
    this.router.navigate(['/home']);  
    return false;
  }
}