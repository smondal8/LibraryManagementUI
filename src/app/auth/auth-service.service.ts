import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { Observable,throwError } from 'rxjs';
import { Iusers } from '../Iusers';
import { HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  public httpClient : HttpClient;
  private url : string = "http://localhost:8282/authenticate";  
  
  constructor(httpClient : HttpClient) {
    this.httpClient = httpClient;
   }
   public authenticate(body : Iusers) : Observable<any>{
    let httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    let options = {
      headers: httpHeaders
    }; 
    return this.httpClient.post<any>(this.url,body,options).pipe(      
      catchError((error: HttpErrorResponse) =>{       
        return throwError(error.message || 'server error');    
                                            })
    );
  }

}
