import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { InfoPersonalByUserService } from '../../../services/info-personal-by-user.service';
import { InfoPeronalByUserInterface, User } from '../../../interfaces/info-peronal-by-user.interface';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent implements OnInit {
  constructor(
    private InfoPersonalByUserService : InfoPersonalByUserService
  ) { }

  data : User = {} as any;

  ngOnInit(): void {
    let token = localStorage.getItem('token');
    const uid = localStorage.getItem('uid');
    const body = {
      userId : Number(uid)
    }
    this.InfoPersonalByUserService.getInfoPersonalByUser(token!, body).subscribe((data) => {
      console.log(data);
      this.data = data.user;
    });
  }
}
