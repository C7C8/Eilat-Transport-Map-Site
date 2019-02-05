import { Component, OnInit } from '@angular/core';
import { Flight } from '../../DataTypes';
import { FetchService } from '../../fetch.service';

@Component({
  selector: 'app-ships',
  templateUrl: './ships.component.html',
  styleUrls: ['./ships.component.scss']
})
export class ShipsComponent implements OnInit {
  flights: Flight[];

  constructor(private fetchService: FetchService) { }

  async ngOnInit() {
    this.flights = await this.fetchService.getFlights();
    console.log(this.flights);
  }

}
