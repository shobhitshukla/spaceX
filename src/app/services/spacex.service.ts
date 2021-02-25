import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpacexService {

  constructor(private http: HttpClient) { }

  getAllLaunch(endPoint: any): Observable<any> {
    let endPointUrl = endPoint;
    return this.http.get(endPointUrl);
  }

}
