import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Iusers } from '../Iusers';
import { AuthServiceService } from './auth-service.service';
import { Router, CanActivate } from '@angular/router';
import { timeInterval } from 'rxjs/operators';
import { timer } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  user : Iusers;
  authService : AuthServiceService;
  token : string;
  errorMsg : string;
  router : Router;

  constructor(authService : AuthServiceService,router : Router) { 
    this.authService = authService;
    this.router = router;
  }
  
  ngOnInit(): void {
  }
  private delay(ms: number)
  {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  onSubmit(f: NgForm): void {
    this.errorMsg = "";
    localStorage.clear;
    this.user = f.value;
    this.authService.authenticate(this.user).subscribe(token => 
      {
        this.token = token;
        console.log("Error is :" + this.errorMsg);
        localStorage.setItem("token",this.token);   
        localStorage.setItem("user",this.user.username); 
        console.log(this.token);
        this.router.navigate(['']);
      },
      error => {
        this.errorMsg = error;
      }
    );        
  }
}
