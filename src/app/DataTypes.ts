export class PyAPIResponse {
  status: boolean;
  message: string;
}

export class FlightResponse extends PyAPIResponse {
  flights: Flight[];
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
