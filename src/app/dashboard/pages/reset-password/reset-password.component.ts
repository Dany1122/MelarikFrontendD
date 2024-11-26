import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css',
})
export class ResetPasswordComponent implements OnInit {

  imgSrc = 'assets/rosa.png';

    constructor(
      private MessageService: MessageService,
      private AuthService : AuthService,
      private router : ActivatedRoute,
      private route : Router
    ) { }

    ngOnInit(): void {
      this.router.queryParams.subscribe( params => {
        this.token = params['token'];

        if (!this.token) {
          this.route.navigate(['/login',], { replaceUrl: true });

        }
      });
    }
    password: string = '';
    passwordConfirm: string = '';
    token: string = '';

    resetPassword() {

      if (this.password === '' || this.passwordConfirm === '') {
        this.MessageService.add({severity:'error', summary: 'Error', detail: 'Por favor, llena todos los campos'});
        return;
      }

      if (this.password === this.passwordConfirm) {
        const body = {
          token : this.token,
          password : this.password,
          passwordNew : this.passwordConfirm
        }
        // this.MessageService.add({severity:'success', summary: 'Success', detail: 'Password reset successfully'});
        this.AuthService.resetPassword(body).subscribe((data) => {
          if (data.success) {
            this.MessageService.add({severity:'success', summary: 'Success', detail: 'Password reset successfully'});
            this.route.navigate(['/login'], { replaceUrl: true });
            this.password = '';
            this.passwordConfirm = '';
          } else {
            this.MessageService.add({severity:'error', summary: 'Error', detail: 'Error al resetear la contraseña'});
          }
        },
        (error) => {
          console.log(error);

          this.MessageService.add({severity:'error', summary: 'Error', detail: 'Error al resetear la contraseña'});
        });
          ;
      } else {
        this.MessageService.add({severity:'error', summary: 'Error', detail: 'Las contraseñas no coinciden'});
      }
    }
}
