[1mdiff --git a/src/app/app.component.html b/src/app/app.component.html[m
[1mindex 1657ee7..e0a3e04 100644[m
[1m--- a/src/app/app.component.html[m
[1m+++ b/src/app/app.component.html[m
[36m@@ -5,6 +5,15 @@[m
 [m
   <div class="content">[m
     <mat-tab-group>[m
[32m+[m
[32m+[m[32m      <mat-tab>[m
[32m+[m[32m        <ng-template mat-tab-label>[m
[32m+[m[32m          <fa-icon [icon]="faPlaneArrival"></fa-icon>[m
[32m+[m[32m          Flights[m
[32m+[m[32m        </ng-template>[m
[32m+[m[32m        <app-flights></app-flights>[m
[32m+[m[32m      </mat-tab>[m
[32m+[m
       <mat-tab>[m
         <ng-template mat-tab-label>[m
           <fa-icon [icon]="faMap"></fa-icon>[m
[36m@@ -17,15 +26,7 @@[m
 		This is probably fixable by wrapping it in an <ng-template matTabContent> for lazy loading, but[m
 		it makes the animations less pretty, so it's not worth "fixing". Besides, the map should be the[m
 		first thing visible, right?-->[m
[31m-        <app-map mapId="map1"></app-map>[m
[31m-      </mat-tab>[m
[31m-[m
[31m-      <mat-tab>[m
[31m-        <ng-template mat-tab-label>[m
[31m-          <fa-icon [icon]="faPlaneArrival"></fa-icon>[m
[31m-          Flights[m
[31m-        </ng-template>[m
[31m-        <app-flights></app-flights>[m
[32m+[m[32m        <!--<app-map mapId="map1"></app-map>-->[m
       </mat-tab>[m
 [m
       <mat-tab>[m
[1mdiff --git a/src/app/pages/flights/flights.component.ts b/src/app/pages/flights/flights.component.ts[m
[1mindex 8bb1d5c..5212b7d 100644[m
[1m--- a/src/app/pages/flights/flights.component.ts[m
[1m+++ b/src/app/pages/flights/flights.component.ts[m
[36m@@ -57,12 +57,11 @@[m [mexport class FlightsComponent implements OnInit, AfterViewInit {[m
     const margin = 60;[m
     const chartDiv = document.getElementsByClassName('chart-container')[0];[m
     const svg = d3.select('#chart')[m
[31m-      .attr('width', chartDiv.clientWidth)[m
[31m-      .attr('height', chartDiv.clientHeight);[m
[31m-    const chart = svg.append('g')[m
[31m-      .attr('transform', `translate(${margin}, ${margin})`);[m
[31m-    const width = chartDiv.clientWidth - 2 * margin;[m
[31m-    const height = chartDiv.clientHeight - 2 * margin;[m
[32m+[m[32m      .attr('width', chartDiv.clientWidth - margin)[m
[32m+[m[32m      .attr('height', chartDiv.clientHeight - margin);[m
[32m+[m[32m    const chart = svg.append('g');[m
[32m+[m[32m    const width = chartDiv.clientWidth - margin;[m
[32m+[m[32m    const height = chartDiv.clientHeight - margin;[m
 [m
     // Y axis[m
     const yScale = d3.scaleLinear()[m
[36m@@ -71,8 +70,8 @@[m [mexport class FlightsComponent implements OnInit, AfterViewInit {[m
     chart.append('g')[m
       .call(d3.axisLeft(yScale));[m
     svg.append('text')[m
[31m-      .attr('x', -(height / 2) - margin)[m
[31m-      .attr('y', margin / 2.4)[m
[32m+[m[32m      .attr('x', -(height / 2))[m
[32m+[m[32m      .attr('y', 0)[m
       .attr('transform', 'rotate(-90)')[m
       .attr('text-anchor', 'middle')[m
       .attr('fill', 'currentColor')[m
[36m@@ -87,8 +86,8 @@[m [mexport class FlightsComponent implements OnInit, AfterViewInit {[m
       .attr('transform', `translate(0, ${height})`)[m
       .call(d3.axisBottom(xScale));[m
     svg.append('text')[m
[31m-      .attr('x', width / 2 + margin)[m
[31m-      .attr('y', height + margin + 40)[m
[32m+[m[32m      .attr('x', width / 2 )[m
[32m+[m[32m      .attr('y', height)[m
       .attr('text-anchor', 'middle')[m
       .attr('fill', 'currentColor')[m
       .text('Hour of day');[m
