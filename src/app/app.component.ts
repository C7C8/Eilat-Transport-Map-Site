import { Component, OnInit } from '@angular/core';
import { faCar, faCompress, faBus } from '@fortawesome/free-solid-svg-icons';
import { mapStyleDefaultJSON, mapStyleSchematicJSON } from '../mapStyles';

declare var google: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  eilatCoords = { lat: 29.554395401332155, lng: 34.949205486964829 };
  mapType: string;
  trafficLayer: any;
  transitLayer: any;
  map: any;

  traffic = false;
  transit = false;
  offCenter = false;

  faCar = faCar;
  faCompress = faCompress;
  faBus = faBus;

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
      mapTypeControlOptions: {
        style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
        mapTypeIds: ['default', 'terrain', 'hybrid', 'road_schematic'],
        position: google.maps.ControlPosition.TOP_LEFT
      }
    });

    // Map styling
    const mapStyleDefault = new google.maps.StyledMapType(mapStyleDefaultJSON, { name: 'Map' });
    const mapStyleRoadHighlight = new google.maps.StyledMapType(mapStyleSchematicJSON, { name: 'Road Schematic' });

    this.map.mapTypes.set('default', mapStyleDefault);
    this.map.mapTypes.set('road_schematic', mapStyleRoadHighlight);
    this.map.setMapTypeId('default');
    this.mapType = 'default';

    // Traffic layer
    this.trafficLayer = new google.maps.TrafficLayer();
    this.transitLayer = new google.maps.TransitLayer();

    // Map event handlers
    const self = this; // Because EVENT HANDLERS! YAY!
    this.map.addListener('maptypeid_changed', () => { self.mapType = self.map.getMapTypeId(); });
    this.map.addListener('center_changed', () => { self.offCenter = true; });
  }

  centerMap(): void {
    this.map.setCenter(this.eilatCoords);
    this.map.setZoom(14.6);
    this.offCenter = false;
  }

  toggleTraffic(): void {
    this.trafficLayer.setMap(this.traffic ? null : this.map);
    this.traffic = !this.traffic;
  }

  toggleTransit(): void {
    this.transitLayer.setMap(this.transit ? null : this.map);
    this.transit = !this.transit;
  }
}
