import { AuthService } from 'src/app/services/auth.service';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';
import { InputTextModule } from 'primeng/inputtext';
import { Router } from '@angular/router';


@Component({
  selector: 'app-verify-password',
  standalone: true,
  imports: [CommonModule, InputTextModule, ReactiveFormsModule, FormsModule, ButtonModule, MessagesModule],
  templateUrl: './verify-password.component.html',
  styleUrls: ['./verify-password.component.css']
})
export class VerifyPasswordComponent {

  constructor(private _formBuilder: FormBuilder, private _router: Router, private _authService:AuthService) {}

  mesError: any[] = [];
  isLoading: boolean = false

  codeForm = this._formBuilder.group({
    resetCode: ['', [Validators.required]]
  })



  verifyCode(form: FormGroup) {
    this.mesError = []
    if(form.valid) {
      this.isLoading = true
      this._authService.verifyCode(form.value).subscribe({
        next:(data)=> {
          if(data.status == 'Success') {
            this.isLoading = false
            this._router.navigate(['forget/resetPassword'])
          }
        },
        error:(err)=> {
          this.isLoading = false
          this.mesError = [
            { severity: 'error', summary: 'Error', detail: err.error.message? err.error.message : 'Please come another time' },
          ];
        }
      })
    }

  }

}
