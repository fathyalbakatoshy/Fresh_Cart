import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { MessagesModule } from 'primeng/messages';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, InputTextModule, ReactiveFormsModule, FormsModule, ButtonModule, PasswordModule, MessagesModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private _authService: AuthService, private _router: Router) { }

  mesError: any[] = [];
  isLoading: boolean = false
  notMatch: string = ''

  registerForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.maxLength(18), Validators.minLength(4)]),
    email: new FormControl(null, [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(6),
      Validators.pattern(/^\w{6,}$/)
    ]),
    rePassword: new FormControl(null, [
      Validators.required,
      Validators.minLength(6),
      Validators.pattern(/^\w{6,}$/)
    ]),
    phone: new FormControl(null, [Validators.required, Validators.pattern(/^01[0125]\d{8}$/)]),
  }, this.validationPassword)


  register(form: FormGroup) {
    this.mesError = []
    this.markAllControlsTouched(form)
    if (form.valid&& !this.isLoading) {
      this.isLoading = true
      this._authService.signUp(form.value).subscribe({
        next: (res) => {
          if (res.message == "success") {
            this.isLoading = false
            this._router.navigate(['/login'])
          }
        },
        error: (err) => {
          this.isLoading = false
          this.mesError = [
            { severity: 'error', summary: 'Error', detail: err.error.message?err.error.message : "Please come another time" },
          ];
        }
      })
    } else {
      if (form.getError('matchedPassword')) {
        this.mesError = [
          { severity: 'info', summary: 'Error', detail: "Password Not Matched" },
        ];
      }
    }
  }


  validationPassword(form: any) {
    if (form.get("password")?.value == form.get("rePassword")?.value) {
      return null;
    } else {
      return { "matchedPassword": true }
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
