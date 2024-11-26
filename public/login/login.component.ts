import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../src/app/services/auth.service';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { InputTextModule } from 'primeng/inputtext';
import { SelectButtonModule } from 'primeng/selectbutton';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputMaskModule } from 'primeng/inputmask';
import { MessageService } from 'primeng/api';

interface City {
  name: string,
  code: string
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    SelectButtonModule,
    MultiSelectModule,
    InputMaskModule

  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  constructor(
    private AuthService: AuthService,
    private router: Router,
    private MessageService: MessageService
  ) {}

  imgSrc = 'assets/rosa.png';
  username: string = '';
  password: string = '';
  showModal = false;
  visible: boolean = false;

  name : string = '';
  lastName : string = '';
  email : string = '';
  passwordNew : string = '';
  age! : number ;
  address : string = '';
  phone: string | undefined;
  billingAddress : string = '';

  stateOptions: any[] = [{ label: 'Masculino', value: 'male' },{ label: 'Femenino', value: 'female' }];

  gender: string = 'off';

  brands!: City[];

  selectedBrands!: City[];

  errorMessages = {
    name: '',
    lastname: '',
    phone: '',
    age: '',
    email: '',
    passwordNew: '',
    address: '',
    billingAddress: '',
    gender: ''
  } as any;
  visibleRecover = false;
  emailRecover: string = '';
  blockedButton = false;


  ngOnInit(): void {
    this.brands = [
      {name: 'LOréal Paris', code: 'LOP'},
      {name: 'Maybelline', code: 'MAY'},
      {name: 'Clinique', code: 'CNQ'},
      {name: 'Dior', code: 'DIO'},
      {name: 'MAC cosmetics', code: 'MAC'},
      {name: 'Channel', code: 'CHA'}
    ];
  }



  handleLogin() {
    let body = {
      email : this.username,
      password : this.password
    }
    this.AuthService.login(body).subscribe((res) => {
      if (res.success) {
        localStorage.setItem('token', res.token);
        localStorage.setItem('uid', res.uid);
        this.router.navigate(['/home']);
      }
    },
    (err) => {

      this.MessageService.add({severity:'error', summary: 'Error', detail: 'Invalid credentials'});
    }
  );
}

goToPrivacyPolicy() {
  this.router.navigateByUrl('/privacyPolicy');
}

handleShowModal() {
  this.visible = true;
  this.name = '';
  this.lastName = '';
  this.email = '';
  this.age!  ;
  this.passwordNew = '';
  this.address = '';
  this.billingAddress = '';
  this.selectedBrands = [];
  this.gender = '';
  this.phone = '';
}
handleShowModalRecover() {
  this.visibleRecover = true;
}

onSubmit() {
  let body = {
    name: this.name,
    lastname: this.lastName,
    phone : this.phone,
    age : this.age,
    email: this.email,
    passwordNew: this.passwordNew,
    address : this.address,
    billingAddress : this.billingAddress,
    brands : JSON.stringify( this.selectedBrands),
    gender : this.gender
  }

  this.AuthService.createUser(body).subscribe((res) => {
    if (res.success) {
      this.visible = false;
      this.MessageService.add({severity:'success', summary: 'Success', detail: 'User created successfully'});
    }else {
      this.MessageService.add({severity:'error', summary: 'Error', detail: 'Error creating user'});
    }

  },
  (err) => {
    console.log(err );

    if (err.error && err.error.success === false) {
      const errors = err.error.errors;
      for (const key in errors) {
        if (errors.hasOwnProperty(key)) {
          const error = errors[key];
          this.errorMessages[error.path] = error.msg;
        }
      }
    }

  }
);

}

clearErrorMessage(field: string) {
  this.errorMessages[field] = '';
}

onSubmitRecover() {
  this.blockedButton = true;
  const body = {
    email: this.emailRecover
  }
  if (this.emailRecover.trim() === '') {
    this.MessageService.add({ severity: 'error', summary: 'Error', detail: 'Email es requerido' });
    this.blockedButton = false;
    return;
  }

  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (!emailPattern.test(this.emailRecover)) {
    this.MessageService.add({ severity: 'error', summary: 'Error', detail: 'Formato de email no es válido' });
    this.blockedButton = false;
    return;
  }
  this.AuthService.sendLinkResetPassword(body).subscribe((res) => {
    if (res.success) {
      this.visibleRecover = false;
      this.MessageService.add({severity:'success', summary: 'Success', detail: res.msg});
      this.emailRecover = '';
      this.blockedButton = false;
    }else {
      this.MessageService.add({severity:'error', summary: 'Error', detail: res.msg});
      this.blockedButton = false;
    }
  },
  (err) => {
    console.log(err );
    this.MessageService.add({severity:'error', summary: 'Error', detail: err.error.msg});
    this.blockedButton = false;
  }
);
}
}
