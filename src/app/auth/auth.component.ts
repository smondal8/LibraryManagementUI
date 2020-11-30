import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Iusers } from '../Iusers';
import { AuthServiceService } from './auth-service.service';
import { Router, CanActivate } from '@angular/router';
import { timeInterval } from 'rxjs/operators';
import { timer } from 'rxjs';
import { AuthGuard } from './authGuard';
import { ITokenizer } from '../ITokenizer';

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
  authGuard : AuthGuard;
  isLoggedIn : Boolean;
  tokenObj : ITokenizer;
  
  constructor(authService : AuthServiceService,router : Router,authGuard : AuthGuard) { 
    this.authService = authService;
    this.router = router;
    this.authGuard = authGuard;
  }
  
  ngOnInit(): void {
    this.isLoggedIn = this.authGuard.canActivate();
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
        localStorage.setItem("token",JSON.stringify(token));   
        localStorage.setItem("user",JSON.stringify(this.user.username));
        this.tokenObj = JSON.parse(localStorage.getItem("token"));                      
        console.log(this.tokenObj.token);
        this.router.navigate(['']);
      },
      error => {
        this.errorMsg = error;
      }
    );        
  }
}
