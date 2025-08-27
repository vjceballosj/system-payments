import { Component } from '@angular/core';
import { Auth } from '../services/auth';

@Component({
  selector: 'app-admin-template',
  standalone: false,
  templateUrl: './admin-template.html',
  styleUrl: './admin-template.css'
})
export class AdminTemplate {

  constructor(public authService: Auth){

  }

  logout(){
    this.authService.logout();
  }
}
