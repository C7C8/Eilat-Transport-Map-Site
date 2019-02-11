import { Component, OnInit, ViewChild, AfterContentInit } from '@angular/core';
import { MatCheckboxChange, MatPaginator, MatSort, MatTable, MatTableDataSource } from '@angular/material';
import { Flight, FlightsMat } from '../../DataTypes';
import { FetchService } from '../../fetch.service';
import * as d3 from 'd3';

// These have to be here because if they're in the FlightsComponent class, they get treated as data
// and not functions with sub-functions (or whatever JS calls them...)
let xScale;
let yScale;

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.scss']
})
export class FlightsComponent implements OnInit, AfterContentInit {
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
  daysSelected: string[] = this.days;
  margin = 75;
  chartDiv: any;
  svg: any;
  tooltip: any;
  chart: any;
  displayCnt = 0;

  constructor(private fetchService: FetchService) {
  }

  async ngOnInit() {
    this.flightsRaw = await this.fetchService.getFlights();
    this.flights = new MatTableDataSource(this.flightsRaw);
    this.flights.sort = this.sort;
    this.flights.paginator = this.paginator;
  }

  async ngAfterContentInit() {
    this.flightsFreq = await this.fetchService.getFlightsMat();
    this.chartDiv = document.getElementsByClassName('barchart-container')[0];
    this.svg = d3.select('#barchart');
    this.tooltip = d3.select('#chart-tooltip');
    window.addEventListener('resize', this.renderChart.bind(this));
    this.renderChart();
  }

  getHourlyFlightTotal(): number[] {
    // Accumulate data to graph by looping through every weekday;
    // if it's not selected,don't add it to the data to graph.
    const hourly_total = new Array(24).fill(0);
    for (let i = 0; i < 7; i++) {
      if (!this.daysSelected.includes(this.days[i])) {
        continue;
      }

      for (let j = 0; j < 24; j++) {
        hourly_total[j] += this.flightsFreq.hourly_daily[i][j];
      }
    }

    return hourly_total;
  }

  getFlightsMax(): number {
    let flights_max = 0;
    for (let i = 0; i < 24; i++) {
      let local_total = 0;
      for (let j = 0; j < 7; j++) {
        local_total += this.flightsFreq.hourly_daily[j][i];
      }
      if (local_total > flights_max) {
        flights_max = local_total;
      }
    }

    return flights_max;
  }

  renderChart(): void {
    // Set up bar chart with d3
    // Major credit to https://blog.risingstack.com/d3-js-tutorial-bar-charts-with-javascript/, IT HELPED SO MUCH
    this.svg.selectAll('*').remove();
    const width = this.chartDiv.offsetWidth - this.margin;
    const height = this.chartDiv.offsetHeight - this.margin;
    this.svg
      .attr('width', this.chartDiv.offsetWidth)
      .attr('height', this.chartDiv.offsetHeight - 4);
    this.chart = this.svg.append('g')
      .attr('transform', `translate(${this.margin / 2}, ${this.margin / 2})`);

    // Y axis
    yScale = d3.scaleLinear()
      .range([height, 0])
      .domain([0, this.getFlightsMax()]);
    this.chart.append('g')
      .call(d3.axisLeft(yScale));
    this.svg.append('text')
      .attr('x', -(height / 2) - this.margin)
      .attr('y', this.margin / 4.9)
      .attr('transform', 'rotate(-90)')
      .attr('text-anchor', 'middle')
      .attr('fill', 'currentColor')
      .text('Flights');

    // X axis
    xScale = d3.scaleBand()
      .range([0, width])
      .domain(this.getHourlyFlightTotal().map((s, i) => i))
      .padding(0.2);
    this.chart.append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(xScale));
    this.svg.append('text')
      .attr('x', width / 2 + this.margin / 2)
      .attr('y', height + this.margin - 8)
      .attr('text-anchor', 'middle')
      .attr('fill', 'currentColor')
      .text('Hour of day');

    this.renderChartBars();
  }

  renderChartBars(): void {
    d3.selectAll('rect').remove();
    const hourly_total = this.getHourlyFlightTotal();
    const height = this.chartDiv.offsetHeight - this.margin;

    // Draw actual bars
    this.chart.selectAll()
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
      .on('mouseenter', (s, i) => {
        this.displayCnt = s;
        this.tooltip
          .style('top', yScale(s) + 'px')
          .style('left', xScale(i) + (xScale.bandwidth() / 2) + 'px');
        this.tooltip.transition()
          .duration(350)
          .style('opacity', 0.9);
      })
      .on('mouseleave', (s) => {
        this.tooltip.transition()
          .duration(150)
          .style('opacity', 0);
      })
      .transition()
        .duration(500)
        .attr('y', (s) => yScale(s))
        .attr('height', (s) => height - yScale(s));
  }

  handleDayChange(event: MatCheckboxChange, day: string) {
    if (!event.checked && this.daysSelected.includes(day)) {
      // Remove unchecked day from the list
      this.daysSelected = this.daysSelected.filter((s) => s !== day);
    } else {
      this.daysSelected.push(day);
    }

    this.renderChartBars();
  }

  toggleWeekdays(): void {
    const temp: string[] = [];
    for (let i = 0; i < 7; i++) {
      const day = this.days[i];
      if (i < 5 && !this.daysSelected.includes(day)) {
        temp.push(day);
      }
      if (i >= 5 && this.daysSelected.includes(day)) {
        temp.push(day);
      }
    }

    this.daysSelected = temp;
    this.renderChartBars();
  }

  toggleWeekends(): void {
    const temp: string[] = [];
    for (let i = 0; i < 7; i++) {
      const day = this.days[i];
      if (i >= 5 && !this.daysSelected.includes(day)) {
        temp.push(day);
      }
      if (i < 5 && this.daysSelected.includes(day)) {
        temp.push(day);
      }
    }

    this.daysSelected = temp;
    this.renderChartBars();
  }
}
