import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTabsModule,
  MatTableModule,
  MatSortModule,
  MatPaginatorModule,
  MatCardModule,
  MatCheckboxModule,
  MatExpansionModule,
  MatChipsModule,
} from '@angular/material';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MapComponent } from './pages/map/map.component';
import { FlightsComponent } from './pages/flights/flights.component';
import { AnalysisComponent } from './pages/analysis/analysis.component';
import { AboutComponent } from './pages/about/about.component';
import { HttpClientModule } from '@angular/common/http';
import { CitiesComponent } from './pages/cities/cities.component';
import { CityCardComponent } from './pages/cities/city-card/city-card.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    FlightsComponent,
    AnalysisComponent,
    AboutComponent,
    CitiesComponent,
    CityCardComponent,
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
    MatCheckboxModule,
    MatChipsModule,
    BrowserModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    HttpClientModule,
    MatExpansionModule
  ],
  providers: [],
  schemas: [ NO_ERRORS_SCHEMA ],
  bootstrap: [AppComponent]
})
export class AppModule { }
