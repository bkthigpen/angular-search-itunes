import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ConfigService {
  // base URL
  // https://itunes.apple.com/search?term=jack+johnson&limit=25
  url: string = 'https://itunes.apple.com/search?term='
  constructor(private http: HttpClient) { }

  getResponse(term: string): Observable<any> {
    // return this.http.get(this.url + term + '&limit=3');
    return this.http.get(`${this.url}${term}&limit=3`);
  }
}
