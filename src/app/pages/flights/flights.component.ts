import { Component, OnInit, ViewChild } from '@angular/core';
import { MatOptionSelectionChange, MatPaginator, MatSort, MatTable, MatTableDataSource } from '@angular/material';
import { Flight } from '../../DataTypes';
import { FetchService } from '../../fetch.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.scss']
})
export class FlightsComponent implements OnInit {
  // Table stuff
  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  flightsRaw: Flight[] = [];
  flights = new MatTableDataSource();
  displayColumns = ['airlineCode', 'arrival', 'airline', 'srcAirport', 'srcCity'];

  // Bar chart stuff
  days: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  dayCtl = new FormControl();

  constructor(private fetchService: FetchService) {
    this.dayCtl.patchValue(this.days);
  }

  async ngOnInit() {
    this.flightsRaw = await this.fetchService.getFlights();
    this.flights = new MatTableDataSource(this.flightsRaw);
    this.flights.sort = this.sort;
    this.flights.paginator = this.paginator;
  }

  toggleWeekdays(): void {
    const temp: string[] = [];
    for (let i = 0; i < 7; i++) {
      const day = this.days[i];
      if (i < 5 && !this.dayCtl.value.includes(day)) {
        temp.push(day);
      }
      if (i >= 5 && this.dayCtl.value.includes(day)) {
        temp.push(day);
      }
    }

    this.dayCtl.patchValue(temp);
  }

  toggleWeekends(): void {
    const temp: string[] = [];
    for (let i = 0; i < 7; i++) {
      const day = this.days[i];
      if (i >= 5 && !this.dayCtl.value.includes(day)) {
        temp.push(day);
      }
      if (i < 5 && this.dayCtl.value.includes(day)) {
        temp.push(day);
      }
    }

    this.dayCtl.patchValue(temp);
  }
}
