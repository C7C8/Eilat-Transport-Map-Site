import { Component, OnInit } from '@angular/core';
import { faCompress, faRoad, faSatellite, faMountain, faCodeBranch } from '@fortawesome/free-solid-svg-icons';
import { mapStyleDefaultJSON, mapStyleSchematicJSON } from '../mapStyles';

import { GoogleOverlay, Overlay, overlaysTable } from '../overlaysTable';
import { FormControl } from '@angular/forms';
import { MatOptionSelectionChange } from '@angular/material';

declare var google: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  eilatCoords = { lat: 29.554395401332155, lng: 34.949205486964829 };
  mapType: string;
  map: any;
  offCenter = false;
  overlayCtl = new FormControl();
  overlaysTable: (Overlay | GoogleOverlay)[] = overlaysTable;

  // FontAwesome stuff. It really do be like that sometimes...
  faCompress = faCompress;
  faRoad = faRoad;
  faSatellite = faSatellite;
  faMountain = faMountain;
  faCodeBranch = faCodeBranch;

  ngOnInit(): void {
    this.map = new google.maps.Map(document.getElementById('map'), {
      center: this.eilatCoords,
      zoom: 14.7,
      restriction: {
        latLngBounds: {
          north: 29.596243,
          south: 29.515590,
          east: 34.998930,
          west: 34.900423
        },
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
    this.mapType = 'default';

    // Map event handlers
    const self = this; // Because EVENT HANDLERS! YAY!
    this.map.addListener('maptypeid_changed', () => { self.mapType = self.map.getMapTypeId(); });
    this.map.addListener('center_changed', () => { self.offCenter = true; });
  }

  switchMapType(type: string) {
    this.mapType = type;
    this.map.setMapTypeId(type);
  }

  centerMap(): void {
    this.map.setCenter(this.eilatCoords);
    this.map.setZoom(14.6);
    this.offCenter = false;
  }

  // Needed because goig directly through onSelectionChange on its own can't tell the overlay object whether it's
  // selected or not, and I trust Material to keep state better than the overlays (not that it's an issue...), and
  // I REALLY don't want overlays handling UI events!
  //
  // TL;DR IDK, sue me.
  handleOverlayChange(event: MatOptionSelectionChange): void {
    (event.source.value as Overlay).onChange(this.map, event.source.selected);
  }
}
