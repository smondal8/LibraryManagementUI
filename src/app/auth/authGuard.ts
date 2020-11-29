import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
@Injectable()
export class AuthGuard implements CanActivate {
    base_url: string;
    constructor(private router: Router) {}
    canActivate() {
        if(localStorage.getItem("token") !== null){
            return true;
        }
        this.router.navigate(['/login']);
        return false;
    }
}