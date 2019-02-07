import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTable, MatTableDataSource } from '@angular/material';
import { Flight, FlightsMat } from '../../DataTypes';
import { FetchService } from '../../fetch.service';
import { FormControl } from '@angular/forms';
import * as d3 from 'd3';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.scss']
})
export class FlightsComponent implements OnInit, AfterViewInit {
  // Table stuff
  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  flightsRaw: Flight[] = [];
  flights = new MatTableDataSource();
  displayColumns = ['airlineCode', 'arrival', 'airline', 'srcAirport', 'srcCity'];

  // Bar chart stuff
  flightsFreq: FlightsMat;
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

  async ngAfterViewInit() {
    // Initial data processing
    this.flightsFreq = await this.fetchService.getFlightsMat();
    const hourly_total = [];
    let global_max = 0;
    for (let i = 0; i < 24; i++) {
      let total = 0;
      for (let j = 0; j < 5; j++) {
        total += this.flightsFreq.hourly_daily[j][i];
      }
      if (total > global_max) {
        global_max = total;
      }
      hourly_total.push([i, total]);
    }
    global_max *= 1.25;

    // Set up bar chart with d3
    // Major credit goes to https://blog.risingstack.com/d3-js-tutorial-bar-charts-with-javascript/
    const margin = 60;
    const chartDiv = document.getElementsByClassName('chart-container')[0];
    const svg = d3.select('#chart')
      .attr('width', chartDiv.clientWidth)
      .attr('height', chartDiv.clientHeight);
    const chart = svg.append('g')
      .attr('transform', `translate(${margin}, ${margin})`);
    const width = chartDiv.clientWidth - 2 * margin;
    const height = chartDiv.clientHeight - 2 * margin;

    // Y axis
    const yScale = d3.scaleLinear()
      .range([height, 0])
      .domain([0, global_max]);
    chart.append('g')
      .call(d3.axisLeft(yScale));
    svg.append('text')
      .attr('x', -(height / 2) - margin)
      .attr('y', margin / 2.4)
      .attr('transform', 'rotate(-90)')
      .attr('text-anchor', 'middle')
      .attr('fill', 'currentColor')
      .text('Flights');

    // X axis
    const xScale = d3.scaleBand()
      .range([0, width])
      .domain(hourly_total.map((s) => s[0]))
      .padding(0.2);
    chart.append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(xScale));
    svg.append('text')
      .attr('x', width / 2 + margin)
      .attr('y', height + margin + 40)
      .attr('text-anchor', 'middle')
      .attr('fill', 'currentColor')
      .text('Hour of day');

    // Draw bars
    chart.selectAll()
      .data(hourly_total)
      .enter()
      .append('rect')
      .attr('x', (s) => xScale(s[0]))
      .attr('y', yScale(0))
      .attr('height', 0)
      .attr('width', (s) => xScale.bandwidth())
      // .attr('style', 'fill: #3d85c6;')
      .attr('rx', '4')
      .attr('ry', '4')
      .attr('class', 'bar')
      .on('mouseenter', function(actual, i) {
        // d3.select(this).attr('style', 'fill: #504bce;');
      })
      .on('mouseleave', function(actual, i) {
        // d3.select(this).attr('style', 'fill: #3d85c6;');
      })
      .transition()
      .duration(750)
      .attr('y', (s) => yScale(s[1]))
      .attr('height', (s) => height - yScale(s[1]));
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
