import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { Observable,throwError } from 'rxjs';
import { IBook } from './IBook';
import { HttpHeaders } from '@angular/common/http';
import { ILibrary } from './ILibrary';
import { catchError } from 'rxjs/operators';
import { ITokenizer } from './ITokenizer';
 

@Injectable({
  providedIn: 'root'
})
export class getLibrarydetailsService {
  public httpClient : HttpClient;
  private url : string = "http://localhost:8282/library/listAll";
  private authorizationHeader : String;  
  private tokenObj : ITokenizer;
  constructor(httpClient : HttpClient) {
    this.httpClient = httpClient;
   }

public getLibraryDetails() : Observable<ILibrary[]>{
    this.tokenObj = JSON.parse(localStorage.getItem("token"));                      
    this.authorizationHeader = this.tokenObj.token;
    let httpHeaders = new HttpHeaders().set('authorization', "Bearer "+this.authorizationHeader);
    httpHeaders.set('Content-Type',"application/json");
    //console.log("Authorization header "+this.authorizationHeader);
    //console.log(httpHeaders);
    let options = {
      headers: httpHeaders
    };    
    return this.httpClient.get<ILibrary[]>(this.url,options).pipe(      
      catchError((error: HttpErrorResponse) =>{       
        return throwError(error.message || 'server error');    
                                            })
    );
}

errorHandler(error : HttpErrorResponse){
    return Observable.throw(error.message || "Server Error");

}

public getBookDetailsFromLibrary(libid : number) : Observable<IBook[]>{    
    return this.httpClient.get<IBook[]>("http://localhost:8282/library/book/"+libid).pipe(      
      catchError((error: HttpErrorResponse) =>{       
         //return Observable.throw(error.message||"Server Error")
         return throwError(error.message || 'server error');    
                                            })
    );
}

public registerMovieDetails(body : IBook,id : number) : Observable<any>{
  let httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
  let options = {
    headers: httpHeaders
  }; 
  return this.httpClient.post<any>("http://localhost:8282/updateBook/"+id,body,options).pipe(      
    catchError((error: HttpErrorResponse) =>{       
      return throwError(error.message || 'server error');    
                                          })
  );
}
}