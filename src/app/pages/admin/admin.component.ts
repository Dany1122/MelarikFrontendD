import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { MessageService } from 'primeng/api';
import { FormsModule } from '@angular/forms';  //Importar FormsModule}
import { ButtonModule } from 'primeng/button';  //Importar PrimeNG si lo necesitas
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table'; 
import { CommonModule } from '@angular/common';
import { UserInterface } from '../../interfaces/users.interface';

@Component({
  selector: 'app-admin',
  standalone: true,
  templateUrl: './admin.component.html',
  providers: [MessageService],
  imports: [
    CommonModule, 
    FormsModule, 
    ButtonModule, 
    InputTextModule, 
    TableModule
  ]
})
export class AdminComponent implements OnInit {
  users: UserInterface[] = [];
  productos: any[] = [];
  newProduct = { nombre: '', precio: 0, stock: 0 };


  constructor(private adminService: AdminService, private messageService: MessageService) {}

  ngOnInit() {
    this.loadUsers();
    this.loadProducts();
  }

  // Obtener usuarios administrables
  loadUsers() {
    const token = localStorage.getItem('token'); // O donde estés almacenando el token
  
    if (token) {
      this.adminService.getAllUsers(token).subscribe({
        next: (data: UserInterface[]) => {  // Aquí, data es directamente un array de usuarios
          console.log("Usuarios recibidos:", data);
  
          this.users = data;  // Asigna directamente el array de usuarios
        },
        error: (err) => {
          console.error("Error al obtener usuarios:", err);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No tienes permisos' });
        }
      });
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se encontró el token de autenticación' });
    }
  }

  loadProducts() {
    this.adminService.getAllProducts().subscribe({
      next: (data) => this.productos = data,
      error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudieron cargar los productos' })
    });
  }
  // Agregar un nuevo producto
  addProduct() {
    this.adminService.createProduct(this.newProduct).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Producto agregado' });
        this.loadProducts();
      },
      error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No tienes permisos' })
    });
  }

  // Eliminar producto
  deleteProduct(id: number) {
    this.adminService.deleteProduct(id).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Producto eliminado' });
        this.loadProducts();
      },
      error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No tienes permisos' })
    });
  }
}
