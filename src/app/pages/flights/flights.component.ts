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
  margin = 75;
  chartDiv: any;
  svg: any;

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
    this.flightsFreq = await this.fetchService.getFlightsMat();
    this.chartDiv = document.getElementsByClassName('barchart-container')[0];
    this.svg = d3.select('#barchart');
    this.renderChart();
    window.addEventListener('resize', this.renderChart.bind(this));
  }

  renderChart(): void {
    console.log('Rendering chart');
    const hourly_total = Array(24).fill(0);
    const global_max = 12;

    // Accumulate data to graph by looping through every weekday; if it's not selected, don't add it to the data to graph.
    for (let i = 0; i < 7; i++) {
      if (!this.dayCtl.value.includes(this.days[i])) {
        continue;
      }

      for (let j = 0; j < 24; j++) {
        hourly_total[j] += this.flightsFreq.hourly_daily[i][j];
      }
    }

    // Set up bar chart with d3
    // Major credit goes to https://blog.risingstack.com/d3-js-tutorial-bar-charts-with-javascript/
    this.svg.selectAll('*').remove();
    const width = this.chartDiv.clientWidth - this.margin;
    const height = this.chartDiv.clientHeight - this.margin;
    this.svg
      .attr('width', this.chartDiv.clientWidth)
      .attr('height', this.chartDiv.clientHeight);
    const chart = this.svg.append('g')
      .attr('transform', `translate(${this.margin / 2}, ${this.margin / 2})`);

    // Y axis
    const yScale = d3.scaleLinear()
      .range([height, 0])
      .domain([0, global_max]);
    chart.append('g')
      .call(d3.axisLeft(yScale));
    this.svg.append('text')
      .attr('x', -(height / 2) - this.margin)
      .attr('y', this.margin / 4.8)
      .attr('transform', 'rotate(-90)')
      .attr('text-anchor', 'middle')
      .attr('fill', 'currentColor')
      .text('Flights');

    // X axis
    const xScale = d3.scaleBand()
      .range([0, width])
      .domain(hourly_total.map((s, i) => i))
      .padding(0.2);
    chart.append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(xScale));
    this.svg.append('text')
      .attr('x', width / 2 + this.margin / 2)
      .attr('y', height + this.margin - 8)
      .attr('text-anchor', 'middle')
      .attr('fill', 'currentColor')
      .text('Hour of day');

    // Draw bars
    chart.selectAll()
      .data(hourly_total)
      .enter()
      .append('rect')
        .attr('x', (s, i) => xScale(i))
        .attr('y', yScale(0))
        .attr('height', 0)
        .attr('width', (s) => xScale.bandwidth())
        .attr('rx', '4')
        .attr('ry', '4')
        .attr('class', 'bar')
      .transition()
        .duration(500)
        .attr('y', (s) => yScale(s))
        .attr('height', (s) => height - yScale(s));
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
    this.renderChart();
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
    this.renderChart();
  }
}
