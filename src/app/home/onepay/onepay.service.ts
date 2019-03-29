import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of ,throwError} from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import {OnePayAccounts} from './onepayaccount.model';
import { OnePayPayment } from './onepaypayment.model';


@Injectable({
    providedIn: 'root'
  })
  export class OnePayService {
      baseapiurl:"";
      
      constructor(private httpClient:HttpClient)
      {

      }
      public getOnePayAccounts(id:string):Observable<any>
      {
       
          return this.httpClient.get('https://localhost:5001/api/OnePay/getonepayaccounts?Id='+id,
          {responseType:'json'}).pipe(catchError(this.handleerror));

      }
      public getTotalAmountDue(id:string):Observable<any>
      {
       
          return this.httpClient.get('https://localhost:5001/api/OnePay/getdue/'+id)
          .pipe(catchError(this.handleerror));;
          

      }
      public getModifiedDue(paymentObj:OnePayPayment):Observable<any>
      {
        let httpOptions = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json'
        
             })
          
            
          };
       
          return this.httpClient.post('https://localhost:5001/api/OnePay/getmodifieddue/',paymentObj,httpOptions).pipe(catchError(this.handleerror))
          .pipe(catchError(this.handleerror));
          

      }
      //https://localhost:5001/api/OnePay/registerforonepay?userId

      public getIsOnePayRegistered(id:string):Observable<any>
      {
       
          return this.httpClient.get('https://localhost:5001/api/OnePay/registerforonepay?userId='+id,
          {responseType:'json'}).pipe(catchError(this.handleerror));

      } 
      public makeOnePayPayment(paymentdetails:any):Observable<any>
      {
          console.log(paymentdetails);
        let httpOptions = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
                      
             })
             
          };
          
          return this.httpClient.post('https://localhost:5001/api/OnePay/makepayment', paymentdetails,httpOptions)
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