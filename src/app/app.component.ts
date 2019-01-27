import { Component, OnInit } from '@angular/core';
import { faCar, faCompress, faBus } from '@fortawesome/free-solid-svg-icons'
import { mapStyleDefaultJSON, mapStyleSchematicJSON } from '../map_styles';

declare var google: any;
let map: any;

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

  traffic = false;
  transit = false;
  offCenter = false;

  faCar = faCar;
  faCompress = faCompress;
  faBus = faBus;

  ngOnInit(): void {
    map = new google.maps.Map(document.getElementById('map'), {
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

    map.mapTypes.set('default', mapStyleDefault);
    map.mapTypes.set('road_schematic', mapStyleRoadHighlight);
    map.setMapTypeId('default');
    this.mapType = 'default';

    // Traffic layer
    this.trafficLayer = new google.maps.TrafficLayer();
    this.transitLayer = new google.maps.TransitLayer();

    // Map event handlers
    const self = this; // Because EVENT HANDLERS! YAY!
    map.addListener('maptypeid_changed', () => { self.mapType = map.getMapTypeId(); });
    map.addListener('center_changed', () => { this.offCenter = true; });
  }

  centerMap(): void {
    map.setCenter(this.eilatCoords);
    map.setZoom(14.6);
    this.offCenter = false;
  }

  toggleTraffic(): void {
    this.trafficLayer.setMap(this.traffic ? null : map);
    this.traffic = !this.traffic;
  }

  toggleTransit(): void {
    this.transitLayer.setMap(this.transit ? null : map);
    this.transit = !this.transit;
  }
}
