export class Flight {
  airlineCode: string;
  flightNumber: number;
  arrival: number;
  airline: string;
  srcAirport: string;
  srcCity: string;
  srcCountry: string;
}

export class FlightsMat {
  hourly_daily: number[][];
  daily: number[];
}

export class Bus {
  VehicleRef: string;
  LineRef: string;
  DirectionRef: string;
  PublishedLineName: string;
  OperatorRef: string;
  Agency: string;
  DestinationRef: string;
  Longitude: string;
  Latitude: string;
}

export class Point {
  lat: number;
  lng: number;
}

export class PyAPIResponse {
  status: boolean;
  message: string;
}

// Surely there has to be a better way of doing API response types!
export class FlightResponse extends PyAPIResponse {
  flights: Flight[];
}

export class FlightsMatResponse extends PyAPIResponse {
  data: FlightsMat;
}

export class BusLocationsResponse extends PyAPIResponse {
  data: Bus[];
}

