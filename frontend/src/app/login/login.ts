import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { Auth } from '../services/auth';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login implements OnInit {

  public loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private auth: Auth, private router: Router) {

  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: this.formBuilder.control(''),
      password: this.formBuilder.control('')
    })
  }

  login(): void {
    let username = this.loginForm.value.username;
    let password = this.loginForm.value.password;
    let auth: boolean = this.auth.login(username, password);

    if (auth == true) {
      this.router.navigateByUrl("/admin");
    }
    else {
      alert('Error de contraseña')
    }
  }

}
