import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of ,throwError} from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import {TransactionDetails} from './transactionDetails.model';

@Injectable({
    providedIn: 'root'
  })
  export class transactionService {
      baseapiurl:"";
      
      constructor(private httpClient:HttpClient)
      {

      }
      public getTransactions(id:string):Observable<any>
      {
       
          return this.httpClient.get('https://localhost:5001/api/OnePayTransactions?userId='+id,
          {responseType:'json'}).pipe(catchError(this.handleerror));

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