import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of ,throwError} from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import {AccountDetails} from './accountdetail.model';


@Injectable({
    providedIn: 'root'
  })
  export class accountService {
      baseapiurl:"";
      
      constructor(private httpClient:HttpClient)
      {

      }
      public getAccountDetails(id:string):Observable<any>
      {
       
          return this.httpClient.get('https://localhost:5001/api/UserAccounts/GetAllAccounts?Id='+id,{responseType:'json'})
          .pipe(catchError(this.handleerror));

      }
      //https://localhost:5001/api/OnePay/registerforonepay?userId
      public getTotalAmountDue(id:string):Observable<any>
      {
       
          return this.httpClient.get('https://localhost:5001/api/OnePay/getdue/'+id)
          .pipe(catchError(this.handleerror));;
          

      }
      public getIsOnePayRegistered(id:string):Observable<any>
      {
       
          return this.httpClient.get('https://localhost:5001/api/Users/getuser/'+id,
          {responseType:'json'}).pipe(catchError(this.handleerror));

      }

      public registerForOnePay(id: string):Observable<any>
      {
          
        let httpOptions = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json'
        
             })
            
          };
          
          return this.httpClient.post('https://localhost:5001/api/OnePay/registerforonepay?userId='
          +id,httpOptions,{responseType:"text"}).pipe(catchError(this.handleerror));//,{responseType:"text"});


          

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