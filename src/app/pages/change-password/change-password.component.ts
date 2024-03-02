import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule, FormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';
import { PasswordModule } from 'primeng/password';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [CommonModule, InputTextModule, ReactiveFormsModule, FormsModule, ButtonModule, PasswordModule, MessagesModule],
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {

  constructor(private _authService:AuthService ){}


  mesError: any[] = [];
  isLoading: boolean = false
  notMatch: string = ''


  changePasswordForm: FormGroup = new FormGroup({
    currentPassword: new FormControl(null, [
      Validators.required,
    ]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^\w{6,}$/)
    ]),
    rePassword: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^\w{6,}$/)
    ]),
  }, this.validationPassword)


  changePassword(form: FormGroup) {
    this.mesError = []
    this.markAllControlsTouched(form)
    if (form.valid&& !this.isLoading) {
      this.isLoading = true
      this._authService.newPassword(form.value).subscribe({
        next: (data) => {
          console.log(data);
          if(data.message == 'success') {
            localStorage.setItem("token", data.token)
            this._authService.setToken(data.token)
            this.mesError = [
              { severity: 'success', summary: 'Success', detail: "Password Is Change" },
            ];
            form.reset()
          }

        },
        error: (err) => {
          console.log(err);

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
