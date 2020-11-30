import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuard } from '../app/auth/authGuard';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
   
  public router : Router;
  public authGuard : AuthGuard;
  constructor(router : Router,authGuard : AuthGuard){
    this.router = router;
    this.authGuard = authGuard;
  }  
  title = 'Library Management System';
  authGuardStatus : Boolean;
  
  onClick(){
    this.router.navigate(["/library"]);
  }
  ngOnInit(): void {
    this.authGuardStatus = this.authGuard.canActivate();
    if(this.authGuardStatus===null){
      this.router.navigate(["/login"]);
    }
  }
  onLogout(): void {
    console.log("Clearing logs!");
    localStorage.clear();
    this.router.navigate(["/login"]);
  }
}
