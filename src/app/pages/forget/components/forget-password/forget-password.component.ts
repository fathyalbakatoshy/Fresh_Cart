import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessagesModule } from 'primeng/messages';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [CommonModule, InputTextModule, ReactiveFormsModule, FormsModule, ButtonModule, PasswordModule, MessagesModule,],
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent {

  constructor(private _formBuilder: FormBuilder, private _authService:AuthService, private _router:Router) {}
  mesError: any[] = [];
  isLoading: boolean = false

  verifyEmailForm = this._formBuilder.group({
    email :['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]]
  })


  verifyEmail(form: FormGroup) {
    this.mesError = []
    if(form.valid){
      this.isLoading = true
      this._authService.forgetEmail(form.value).subscribe({
        next: (data) => {
          if(data.statusMsg == 'success') {
            this.isLoading = false
            this._router.navigate(['forget/verifyPassword'])
          }

        },
        error: (err)=> {
          this.mesError = [
            { severity: 'error', summary: 'Error', detail: err.error.message?err.error.message : 'Please come another time'  },
          ];
          this.isLoading = false
        }
      })
    }

  }
}
