import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError, retry } from 'rxjs/operators';


import { FenliAddr } from './FenliAddr';

const SERVER_URL = 'http://localhost:3333/';

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
	  return this.http.get<FenliAddr[]>(SERVER_URL+'list');
	}

  /** POST: add a new FenliAddr to the database */
  add (fa: FenliAddr): Observable<any> {
    return this.http.post<FenliAddr>(SERVER_URL+'new', fa, httpOptions)
      .pipe(
        catchError(this.handleError('add'))
      );
  }

  delete(fa: FenliAddr) {
  	return this.http.delete(SERVER_URL+'delete/'+fa._id, httpOptions);
  }

  edit(fa: FenliAddr): Observable<any> {
  	return this.http.post<FenliAddr>(SERVER_URL+'edit', fa, httpOptions)
  		.pipe(
  			catchError(this.handleError('edit'))
  		);
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
	    this.log(`${operation} failed: ${error.message}`);

	    // Let the app keep running by returning an empty result.
	    return of(result as T);
	  };
	}

	/** Log a HeroService message with the MessageService */
	private log(message: string) {
	  // this.messageService.add('HeroService: ' + message);
	  console.log(message);
	}
}