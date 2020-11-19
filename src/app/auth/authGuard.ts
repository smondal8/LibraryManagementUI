import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
//import { AuthService } from './auth.service';
@Injectable()
export class AuthGuard implements CanActivate {

    base_url: string;

    constructor(private router: Router) {}

    canActivate() {
        // Check to see if a user has a valid token
        //if (this.authService.isAuthenticated()) {
        if(localStorage.getItem("user") != null){
            return true;
        }
        // If not, they redirect them to the login page
        this.router.navigate(['/login']);
        return false;
    }


}