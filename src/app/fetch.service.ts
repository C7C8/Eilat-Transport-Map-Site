import { Injectable } from '@angular/core';
import { PyAPIResponse, FlightResponse, Flight } from './DataTypes';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FetchService {

  constructor(private http: HttpClient) { }

  async getFlights(): Promise<Flight[]> {
    const response = await this.http.get<FlightResponse>(environment.api.flights).toPromise();
    if (!response.status) {
      return [];
    }

    return response.flights;
  }

  private handleError() {
    return (error: HttpErrorResponse): Observable<PyAPIResponse>  => {
      return of(error.error);
    };
  }
}
