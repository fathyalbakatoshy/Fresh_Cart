import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { jwtDecode } from "jwt-decode";
import { AuthService } from 'src/app/services/auth.service';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { SkeletonModule } from 'primeng/skeleton';


@Component({
  selector: 'app-porfile',
  standalone: true,
  imports: [CommonModule, RouterLink, ButtonModule,SkeletonModule],
  templateUrl: './porfile.component.html',
  styleUrls: ['./porfile.component.css']
})
export class PorfileComponent implements OnInit {

  constructor(private _authService:AuthService) {}

  userData : any = {}
  isLoading : boolean = true

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      let decoded: any = jwtDecode(token);
      this._authService.getProfileUser(decoded.id).subscribe({
        next: (data) => {
          console.log(data);
          this.userData = data.data
          this.isLoading = false
        },
        error: (err) => {
          console.log(err);
        }
      })
    }
  }


}

