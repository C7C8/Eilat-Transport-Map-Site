import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatSelectModule, MatSlideToggleModule, MatSnackBarModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTabsModule,
  MatTableModule,
  MatSortModule,
  MatPaginatorModule, MatCardModule
} from '@angular/material';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MapComponent } from './pages/map/map.component';
import { FlightsComponent } from './pages/flights/flights.component';
import { ShipsComponent } from './pages/ships/ships.component';
import { AnalysisComponent } from './pages/analysis/analysis.component';
import { AboutComponent } from './pages/about/about.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    FlightsComponent,
    ShipsComponent,
    AnalysisComponent,
    AboutComponent,
  ],
  imports: [
    MatToolbarModule,
    MatTooltipModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    MatTabsModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatCardModule,
    BrowserModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
