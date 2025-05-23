import { Injectable } from '@angular/core';

declare global {
  interface Window {
    LiveChatWidget: any;
  }
}

@Injectable({
    providedIn: 'root'
  })
  export class LiveChatService {
  
    constructor() {}
  
    setUserData(name: string, email: string) {
      if (window.LiveChatWidget) {
        // Establecer los datos del usuario
        window.LiveChatWidget.call('set_customer_email', email);
        window.LiveChatWidget.call('set_customer_name', name);
        console.log(`LiveChat configurado con: ${name}, ${email}`);
  
        // Intentar continuar con un chat si ya existe
        this.checkActiveChat(email);
      }
    }
  
    checkActiveChat(email: string) {
      // Llamar a la API de LiveChat para verificar si el usuario ya tiene una sesión activa
      if (window.LiveChatWidget) {
        window.LiveChatWidget.call('get_customer_email', (emailFromChat: string) => {  // Aquí le asignamos tipo 'string'
          if (emailFromChat === email) {
            console.log(`El usuario ${email} ya tiene un chat activo. Continuando con ese chat.`);
          } else {
            console.log(`No se encontró un chat activo para el usuario ${email}. Creando una nueva sesión.`);
            this.startNewChatSession(); // Si no hay chat, iniciar uno nuevo
          }
        });
      }
    }
  
    startNewChatSession() {
      if (window.LiveChatWidget) {
        window.LiveChatWidget.call('new_session');
        console.log('Nueva sesión de chat iniciada.');
      }
    }
  
    clearUserData() {
      if (window.LiveChatWidget) {
        window.LiveChatWidget.call('logout');
        window.LiveChatWidget.call('clear_session');
        console.log('LiveChat cerrado y el historial ha sido eliminado.');
      }
    }
  }