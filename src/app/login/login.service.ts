import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of ,throwError} from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class loginService {

  constructor(private httpClient: HttpClient) {

  }
  
  authenticateUser(data: {id: string,password:string}) : Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
  
       })
    };
    
    return this.httpClient.post('https://localhost:5001/api/Users/authenticateuser', data,httpOptions)
    .pipe(catchError(this.handleerror));
}
public handleerror(err:HttpErrorResponse)
      {
        
            if (err.error instanceof Error) {
              //A client-side or network error occurred.				 
              console.log('An error occurred:', err.error.message);
            } else {
              //Backend returns unsuccessful response codes such as 404, 500 etc.				 
              console.log('Backend returned status code: ', err.status);
              console.log('Response body:', err.error);
            }
            return throwError(err);
          
      }
}