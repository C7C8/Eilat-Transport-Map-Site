import { Injectable } from '@angular/core';
import { PyAPIResponse, FlightResponse, Flight, FlightsMat, FlightsMatResponse, BusLocationsResponse, Bus, Point } from './DataTypes';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../environments/environment';
import { catchError } from 'rxjs/operators';
import { GeoJSON as gson } from 'geojson';
declare var GeoJSON: any;

@Injectable({
  providedIn: 'root'
})
export class FetchService {
  static busLocations: gson;

  constructor(private http: HttpClient) {}

  async cacheBusLocations() {
    FetchService.busLocations = await this.getBusLocations();
  }

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

  async getBusLocations(): Promise<gson> {
    const response = (await this.http.get<BusLocationsResponse>(environment.api.busLocations)
      .pipe(catchError(this.handleError()))
      .toPromise()) as BusLocationsResponse;

    if (!response.status) {
      return null;
    }

    const buses: Bus[] = response.data;
    return GeoJSON.parse(buses, {Point: ['Latitude', 'Longitude']});
}

  private handleError() {
    return (error: HttpErrorResponse): Observable<PyAPIResponse>  => {
      return of(error.error);
    };
  }
}
