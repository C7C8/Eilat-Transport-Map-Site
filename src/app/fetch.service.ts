import { Injectable } from '@angular/core';
import { PyAPIResponse, FlightResponse, Flight, FlightsMat, FlightsMatResponse } from './DataTypes';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../environments/environment';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FetchService {

  constructor(private http: HttpClient) { }

  async getFlights(): Promise<Flight[]> {
    const response = (await this.http.get<FlightResponse>(environment.api.flights)
      .pipe(catchError(this.handleError()))
      .toPromise()) as FlightResponse;
    if (!response.status) {
      return [];
    }

    return response.flights;
  }

  async getFlightsMat(): Promise<FlightsMat> {
    const response = (await this.http.get<FlightsMatResponse>(environment.api.flightsMat)
      .pipe(catchError(this.handleError()))
      .toPromise()) as FlightsMatResponse;

    if (!response.status) {
      return null;
    }

    return response.data;
  }

  private handleError() {
    return (error: HttpErrorResponse): Observable<PyAPIResponse>  => {
      return of(error.error);
    };
  }
}
