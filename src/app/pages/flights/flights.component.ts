import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTable, MatTableDataSource } from '@angular/material';
import { Flight } from '../../DataTypes';
import { FetchService } from '../../fetch.service';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.scss']
})
export class FlightsComponent implements OnInit {
  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  flights = new MatTableDataSource();
  displayColumns = ['airlineCode', 'arrival', 'airline', 'srcAirport', 'srcCity'];

  constructor(private fetchService: FetchService) { }

  async ngOnInit() {
    this.flights = new MatTableDataSource(await this.fetchService.getFlights());
    this.flights.sort = this.sort;
    this.flights.paginator = this.paginator;
  }
}
