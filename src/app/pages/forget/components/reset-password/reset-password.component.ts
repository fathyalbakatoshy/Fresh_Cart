import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { MessagesModule } from 'primeng/messages';
import { AuthService } from 'src/app/services/auth.service';
import { Users } from 'src/app/interfaces/users';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, InputTextModule, ReactiveFormsModule, FormsModule, ButtonModule, PasswordModule, MessagesModule],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {

  constructor(private _formBuilder:FormBuilder ,private _authService:AuthService, private _router: Router) {}
  mesError: any[] = [];
  isLoading: boolean = false

  resetPasswordForm : FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]),
    newPassword: new FormControl('', [Validators.required,Validators.minLength(6),Validators.pattern(/^\w{6,}$/)]),
    newRepassword: new FormControl('', [Validators.required,Validators.minLength(6),Validators.pattern(/^\w{6,}$/)]),
  }, this.validationPassword)


  resetPassword(form: FormGroup) {
    this.mesError = []
    this.markAllControlsTouched(form)
    if (form.valid) {
      this.isLoading = true
      let formData : any = {
        email: form.value.email,
        newPassword: form.value.newPassword
      }

      this._authService.resetPassword(formData).subscribe({
        next: (res) => {
          console.log(res);
          if (res.token) {
            this.isLoading = false
            localStorage.setItem("token", res.token)
            this._authService.setToken(res.token)
            this._router.navigate(['/home'])
          }
        },
        error: (err) => {
          console.log(err);
          this.isLoading = false
          this.mesError = [
            { severity: 'error', summary: 'Error', detail: err.error.message ?err.error.message  : "Please Come another time" },
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
    if (form.get("newPassword")?.value == form.get("newRepassword")?.value) {
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
