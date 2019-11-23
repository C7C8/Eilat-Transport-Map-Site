import { Component, Input, AfterViewInit} from '@angular/core';
import { faCompress,
          faRoad,
          faSatellite,
          faMountain,
          faCodeBranch,
          faPlus,
          faMinus,
          faSyncAlt,
          faCrosshairs } from '@fortawesome/free-solid-svg-icons';
import { eilatCoords, mapBounds, mapStyleDefaultJSON, mapStyleSchematicJSON } from './mapData';

import { GoogleOverlay, Overlay, overlaysTable } from './overlaysTable';
import { FormControl, Validators } from '@angular/forms';
import { MatOptionSelectionChange } from '@angular/material/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { FetchService } from '../../fetch.service';

import * as gjson from 'geojson';
declare var google: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {
  @Input() mapId: string;
  geocoder: any;
  mapType = 'default';
  map: any;
  offCenter = false;
  marker: any;
  overlayCtl = new FormControl();
  searchCtl = new FormControl('', Validators.required);
  overlaysTable: (Overlay | GoogleOverlay)[] = overlaysTable;
  showRefresh = false;
  refreshing = false;
  snackbarConfig: MatSnackBarConfig = {
    duration: 1500,
    verticalPosition: 'top',
    horizontalPosition: 'center'
  };

  // FontAwesome stuff. It really do be like that sometimes...
  faCompress = faCompress;
  faRoad = faRoad;
  faSatellite = faSatellite;
  faMountain = faMountain;
  faCodeBranch = faCodeBranch;
  faCrosshairs = faCrosshairs;
  faPlus = faPlus;
  faMinus = faMinus;
  faSyncAlt = faSyncAlt;

  constructor(private snackbar: MatSnackBar, private fetchService: FetchService) {
    this.geocoder = new google.maps.Geocoder();
  }

  async ngAfterViewInit() {
    this.map = new google.maps.Map(document.getElementById(this.mapId), {
      center: eilatCoords,
      zoom: 14.6,
      restriction: {
        latLngBounds: mapBounds,
        strictBounds: true
      },
      streetViewControl: false,
      rotateControl: false,
      fullscreenControl: false,
      mapTypeControl: false,
      zoomControl: false
    });

    // Map styling
    const mapStyleDefault = new google.maps.StyledMapType(mapStyleDefaultJSON, { name: 'Map' });
    const mapStyleRoadHighlight = new google.maps.StyledMapType(mapStyleSchematicJSON, { name: 'Road Schematic' });

    this.map.mapTypes.set('default', mapStyleDefault);
    this.map.mapTypes.set('road_schematic', mapStyleRoadHighlight);
    this.map.setMapTypeId('default');

    // Map event handlers
    const self = this; // Because EVENT HANDLERS! YAY!
    this.map.addListener('maptypeid_changed', () => { self.mapType = self.map.getMapTypeId(); });
    this.map.addListener('center_changed', () => { self.offCenter = true; });
  }

  switchMapType(event: MatTabChangeEvent) {
    const types = ['default', 'terrain', 'hybrid', 'road_schematic'];
    this.mapType = types[event.index];
    this.map.setMapTypeId(types[event.index]);
  }

  centerMap(): void {
    this.map.setCenter(eilatCoords);
    this.map.setZoom(14.6);
    this.offCenter = false;
    this.marker.setMap(null);
  }

  // Needed because going directly through onSelectionChange on its own can't tell the overlay object whether it's
  // selected or not, and I trust Material to keep state better than the overlays (not that it's an issue...), and
  // I REALLY don't want overlays handling UI events!
  //
  // TL;DR IDK, sue me.
  handleOverlayChange(event: MatOptionSelectionChange): void {
    (event.source.value as Overlay).onChange(this.map, event.source.selected);
    if ((event.source.value as Overlay).name === 'Bus locations') {
      this.showRefresh = event.source.selected;
    }
  }

  searchAddress(): void {
    this.geocoder.geocode({ address: this.searchCtl.value, bounds: mapBounds}, this.handleSearchResults.bind(this));
  }

  handleSearchResults(results: any, status: string): void {
    // If the search succeeded, show a snackbar for the found address, zoom & focus on it, and place a marker.
    // If it didn't, inform the user of the error.
    if (status === 'OK') {
      this.searchCtl.reset('');
      this.snackbar.open('Focusing on ' + results[0].formatted_address, null, this.snackbarConfig);
      const result = results[0].geometry.location;
      this.map.setCenter(result);
      this.map.setZoom(17);
      this.marker = new google.maps.Marker({position: result, title: results[0].formatted_address});
      this.marker.setMap(this.map);
    } else {
      this.snackbar.open('Couldn\'t find address within city bounds', null, this.snackbarConfig);
    }
  }

  async refreshBusLocations() {
    this.refreshing = true;
    await this.fetchService.cacheBusLocations();

    // Find the bus location overlay and toggle it so the markers get reloaded
    const busLocationOverlay = this.overlaysTable.filter((o) => o.name === 'Bus locations')[0];
    busLocationOverlay.onChange(this.map, false);
    busLocationOverlay.onChange(this.map, true);
    this.refreshing = false;
  }
  zoomIn(): void {
    this.map.setZoom(this.map.getZoom() + 1);
    this.offCenter = true;
  }

  zoomOut(): void {
    this.map.setZoom(this.map.getZoom() - 1);
    this.offCenter = true;
  }
}
