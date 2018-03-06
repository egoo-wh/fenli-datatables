import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError, retry } from 'rxjs/operators';


import { FenliAddr } from './FenliAddr';
import { environment } from '../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class AppService {
	// configUrl = 'http://192.168.1.11/static/fenli_addr.json';
  
  constructor(
  	private http: HttpClient) { }

	list() {
	  return this.http.get<FenliAddr[]>(this.getServerUrl()+'list');
	}

  /** POST: add a new FenliAddr to the database */
  add (fa: FenliAddr): Observable<any> {
    return this.http.post<FenliAddr>(this.getServerUrl()+'new', fa, httpOptions)
      .pipe(
        catchError(this.handleError('add'))
      );
  }

  delete(fa: FenliAddr) {
  	return this.http.delete(this.getServerUrl()+'delete/'+fa._id, httpOptions);
  }

  edit(fa: FenliAddr): Observable<any> {
  	return this.http.post<FenliAddr>(this.getServerUrl()+'edit', fa, httpOptions)
  		.pipe(
  			catchError(this.handleError('edit'))
  		);
  }

  private getServerUrl() {
  	return window.location.protocol+'//'+environment.apiUrl;
  }
  /**
	 * Handle Http operation that failed.
	 * Let the app continue.
	 * @param operation - name of the operation that failed
	 * @param result - optional value to return as the observable result
	 */
	private handleError<T> (operation = 'operation', result?: T) {
	  return (error: any): Observable<T> => {

	    // TODO: send the error to remote logging infrastructure
	    console.error(error); // log to console instead

	    // TODO: better job of transforming error for user consumption
	    console.log(`${operation} failed: ${error.message}`);

	    // Let the app keep running by returning an empty result.
	    return of(result as T);
	  };
	}
}