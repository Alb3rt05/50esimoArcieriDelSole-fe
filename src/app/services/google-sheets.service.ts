import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GoogleSheetsService {
  private apiUrl = environment.googleScriptUrl;

  constructor(private http: HttpClient) { }

  postRSVP(data: any): Observable<any> {
    // Make sure we have a valid URL before sending
    if (!this.apiUrl || this.apiUrl === 'YOUR_GOOGLE_SCRIPT_URL_HERE') {
      console.warn('Google Script URL is pending configuration.');
      // Simulate success for dev purposes if no URL is set
      // return of({ result: 'success', message: 'Simulated success' });
      // Or fail appropriately
    }

    // Google Apps Script requires JSON string payloads often, but Angular sends JSON object by default.
    // Usually standard POST JSON works if Apps Script handles it with e.postData.contents
    return this.http.post(this.apiUrl, data).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Qualcosa è andato storto. Per favore riprova più tardi o contattaci direttamente.'));
  }
}
