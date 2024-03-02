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
  selector: 'app-updata',
  standalone: true,
  imports: [CommonModule, InputTextModule, ReactiveFormsModule, FormsModule, ButtonModule, PasswordModule, MessagesModule],
  templateUrl: './updata.component.html',
  styleUrls: ['./updata.component.css']
})
export class UpdataComponent {
  constructor(private _authService: AuthService, private _router: Router) { }

  mesError: any[] = [];
  isLoading: boolean = false
  notMatch: string = ''

  updataProfileForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.maxLength(18), Validators.minLength(4)]),
    email: new FormControl(null, [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]),
    phone: new FormControl(null, [Validators.required, Validators.pattern(/^01[0125]\d{8}$/)]),
  })


  upDataProfile(form: FormGroup) {
    this.mesError = []
    this.markAllControlsTouched(form)
    if (form.valid&& !this.isLoading) {
      this.isLoading = true
      this._authService.updataProfile(form.value).subscribe({
        next: (data) => {
          console.log(data);
          if(data.message == 'success') {
            this._router.navigate(['/profile'])
          }
        },
        error: (err) => {
          console.log(err);
          this.mesError = [
            { severity: 'error', summary: 'Error', detail: err.error.errors.msg?err.error.errors.msg : "Please come another time" },
          ];
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
