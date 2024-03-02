import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { AuthService } from 'src/app/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { MessagesModule } from 'primeng/messages';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, InputTextModule, ReactiveFormsModule, FormsModule, ButtonModule, PasswordModule, MessagesModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


  constructor(private _formBuilder: FormBuilder, private _authService: AuthService, private _Router: Router) { }

  mesError!: any[]
  isLoading: boolean = false


  loginForm = this._formBuilder.group({
    email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
    password: ['', [Validators.required]]
  })


  login(form: FormGroup) {
    this.mesError = []
    this.markAllControlsTouched(form)
    if (form.valid && !this.isLoading) {
      this.isLoading = true
      this._authService.signIn(form.value).subscribe({
        next: (data) => {
          if (data.message == 'success') {
            localStorage.setItem("token", data.token)
            this._authService.setToken(data.token)
            this.isLoading = false
            this._Router.navigate(['/home'])
          }
        },
        error: (err) => {
          this.mesError = [
            { severity: 'error', summary: 'Error', detail: err.error.message ? err.error.message : "Please come another time" },
          ];
          this.isLoading = false
        }
      })
    }
  }


  markAllControlsTouched(form: FormGroup) {
    Object.values(form.controls).forEach((control: any) => {
      control.markAllAsTouched()
      if (control.controls) {
        this.markAllControlsTouched(control)
      }
    })
  }

}
