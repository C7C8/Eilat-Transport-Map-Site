export class PyAPIResponse {
  status: boolean;
  message: string;
}

export class FlightResponse extends PyAPIResponse {
  flights: Flight[];
}

export class FlightsMatResponse extends PyAPIResponse {
  data: FlightsMat;
}

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
  weekly: number[];
}
