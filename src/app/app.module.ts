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
  MatTabsModule
} from '@angular/material';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MapComponent } from './pages/map/map.component';
import { FlightsComponent } from './pages/flights/flights.component';
import { AnalysisComponent } from './pages/analysis/analysis.component';
import { AboutComponent } from './pages/about/about.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    FlightsComponent,
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
    BrowserModule,
    BrowserAnimationsModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
