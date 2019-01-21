import { Component, OnInit } from '@angular/core';

declare var google: any;
var map: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  eilatCoords = { lat: 29.554395401332155, lng: 34.949205486964829 };
  mapType: string;

  ngOnInit(): void {
    map = new google.maps.Map(document.getElementById('map'), {
      center: this.eilatCoords,
      zoom: 14.6,
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
        style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
        mapTypeIds: ['default', 'terrain', 'hybrid', 'road_schematic'],
        position: google.maps.ControlPosition.TOP_LEFT
      }
    });

    // Map styling
    const mapStyleDefault = new google.maps.StyledMapType(
      [
        {
          'elementType': 'geometry',
          'stylers': [
            {
              'color': '#ebe3cd'
            }
          ]
        },
        {
          'elementType': 'labels.text.fill',
          'stylers': [
            {
              'color': '#523735'
            }
          ]
        },
        {
          'elementType': 'labels.text.stroke',
          'stylers': [
            {
              'color': '#f5f1e6'
            }
          ]
        },
        {
          'featureType': 'administrative',
          'stylers': [
            {
              'visibility': 'off'
            }
          ]
        },
        {
          'featureType': 'administrative',
          'elementType': 'geometry.stroke',
          'stylers': [
            {
              'color': '#c9b2a6'
            }
          ]
        },
        {
          'featureType': 'administrative.land_parcel',
          'elementType': 'geometry.stroke',
          'stylers': [
            {
              'color': '#dcd2be'
            }
          ]
        },
        {
          'featureType': 'administrative.land_parcel',
          'elementType': 'labels.text.fill',
          'stylers': [
            {
              'color': '#ae9e90'
            }
          ]
        },
        {
          'featureType': 'landscape.natural',
          'elementType': 'geometry',
          'stylers': [
            {
              'color': '#dfd2ae'
            }
          ]
        },
        {
          'featureType': 'poi',
          'stylers': [
            {
              'visibility': 'off'
            }
          ]
        },
        {
          'featureType': 'poi',
          'elementType': 'geometry',
          'stylers': [
            {
              'color': '#dfd2ae'
            }
          ]
        },
        {
          'featureType': 'poi',
          'elementType': 'labels.text.fill',
          'stylers': [
            {
              'color': '#93817c'
            }
          ]
        },
        {
          'featureType': 'poi.park',
          'elementType': 'geometry.fill',
          'stylers': [
            {
              'color': '#a5b076'
            }
          ]
        },
        {
          'featureType': 'poi.park',
          'elementType': 'labels.text.fill',
          'stylers': [
            {
              'color': '#447530'
            }
          ]
        },
        {
          'featureType': 'road',
          'elementType': 'geometry',
          'stylers': [
            {
              'color': '#f5f1e6'
            }
          ]
        },
        {
          'featureType': 'road.arterial',
          'elementType': 'geometry',
          'stylers': [
            {
              'color': '#fdfcf8'
            }
          ]
        },
        {
          'featureType': 'road.highway',
          'elementType': 'geometry',
          'stylers': [
            {
              'color': '#f8c967'
            }
          ]
        },
        {
          'featureType': 'road.highway',
          'elementType': 'geometry.stroke',
          'stylers': [
            {
              'color': '#e9bc62'
            }
          ]
        },
        {
          'featureType': 'road.highway.controlled_access',
          'elementType': 'geometry',
          'stylers': [
            {
              'color': '#e98d58'
            }
          ]
        },
        {
          'featureType': 'road.highway.controlled_access',
          'elementType': 'geometry.stroke',
          'stylers': [
            {
              'color': '#db8555'
            }
          ]
        },
        {
          'featureType': 'road.local',
          'elementType': 'labels.text.fill',
          'stylers': [
            {
              'color': '#806b63'
            }
          ]
        },
        {
          'featureType': 'transit',
          'stylers': [
            {
              'visibility': 'on'
            }
          ]
        },
        {
          'featureType': 'transit.line',
          'elementType': 'geometry',
          'stylers': [
            {
              'color': '#dfd2ae'
            }
          ]
        },
        {
          'featureType': 'transit.line',
          'elementType': 'labels.text.fill',
          'stylers': [
            {
              'color': '#8f7d77'
            }
          ]
        },
        {
          'featureType': 'transit.line',
          'elementType': 'labels.text.stroke',
          'stylers': [
            {
              'color': '#ebe3cd'
            }
          ]
        },
        {
          'featureType': 'transit.station',
          'elementType': 'geometry',
          'stylers': [
            {
              'color': '#dfd2ae'
            }
          ]
        },
        {
          'featureType': 'water',
          'elementType': 'geometry.fill',
          'stylers': [
            {
              'color': '#b9d3c2'
            }
          ]
        },
        {
          'featureType': 'water',
          'elementType': 'labels.text.fill',
          'stylers': [
            {
              'color': '#92998d'
            }
          ]
        }
      ]
      , { 'name': 'Map' });
    const mapStyleRoadHighlight = new google.maps.StyledMapType([
      { featureType: 'transit.station.airport', stylers: [{ 'visibility': 'off' }] },
      { 'elementType': 'geometry', 'stylers': [{ 'color': '#242f3e' }] },
      { 'elementType': 'labels', 'stylers': [{ 'visibility': 'off' }] },
      { 'elementType': 'labels.text.fill', 'stylers': [{ 'color': '#746855' }] },
      { 'elementType': 'labels.text.stroke', 'stylers': [{ 'color': '#242f3e' }] },
      { 'featureType': 'administrative', 'elementType': 'geometry', 'stylers': [{ 'visibility': 'off' }] },
      { 'featureType': 'administrative.land_parcel', 'stylers': [{ 'visibility': 'off' }] },
      {
        'featureType': 'administrative.locality',
        'elementType': 'labels.text.fill',
        'stylers': [
          {
            'color': '#d59563'
          }
        ]
      },
      {
        'featureType': 'administrative.neighborhood',
        'stylers': [
          {
            'visibility': 'off'
          }
        ]
      },
      {
        'featureType': 'landscape',
        'stylers': [
          {
            'color': '#333333'
          }
        ]
      },
      {
        'featureType': 'poi',
        'stylers': [
          {
            'visibility': 'off'
          }
        ]
      },
      {
        'featureType': 'poi',
        'elementType': 'labels.text.fill',
        'stylers': [
          {
            'color': '#d59563'
          }
        ]
      },
      {
        'featureType': 'poi.park',
        'elementType': 'geometry',
        'stylers': [
          {
            'color': '#263c3f'
          }
        ]
      },
      {
        'featureType': 'poi.park',
        'elementType': 'labels.text.fill',
        'stylers': [
          {
            'color': '#6b9a76'
          }
        ]
      },
      {
        'featureType': 'road',
        'elementType': 'geometry',
        'stylers': [
          {
            'color': '#38414e'
          }
        ]
      },
      {
        'featureType': 'road',
        'elementType': 'geometry.stroke',
        'stylers': [
          {
            'color': '#212a37'
          }
        ]
      },
      {
        'featureType': 'road',
        'elementType': 'labels.icon',
        'stylers': [
          {
            'visibility': 'off'
          }
        ]
      },
      {
        'featureType': 'road',
        'elementType': 'labels.text.fill',
        'stylers': [
          {
            'color': '#9ca5b3'
          }
        ]
      },
      {
        'featureType': 'road.arterial',
        'elementType': 'geometry.fill',
        'stylers': [
          {
            'color': '#7f7f00'
          }
        ]
      },
      {
        'featureType': 'road.highway',
        'elementType': 'geometry',
        'stylers': [
          {
            'color': '#746855'
          }
        ]
      },
      {
        'featureType': 'road.highway',
        'elementType': 'geometry.fill',
        'stylers': [
          {
            'color': '#feff00'
          }
        ]
      },
      {
        'featureType': 'road.highway',
        'elementType': 'geometry.stroke',
        'stylers': [
          {
            'color': '#1f2835'
          }
        ]
      },
      {
        'featureType': 'road.highway',
        'elementType': 'labels.text.fill',
        'stylers': [
          {
            'color': '#f3d19c'
          }
        ]
      },
      {
        'featureType': 'road.local',
        'elementType': 'geometry.fill',
        'stylers': [
          {
            'color': '#4c4c00'
          }
        ]
      },
      {
        'featureType': 'transit',
        'stylers': [
          {
            'visibility': 'off'
          }
        ]
      },
      {
        'featureType': 'transit',
        'elementType': 'geometry',
        'stylers': [
          {
            'color': '#2f3948'
          }
        ]
      },
      {
        'featureType': 'transit.station',
        'elementType': 'labels.text.fill',
        'stylers': [
          {
            'color': '#d59563'
          }
        ]
      },
      {
        'featureType': 'water',
        'stylers': [
          {
            'color': '#181833'
          }
        ]
      },
      {
        'featureType': 'water',
        'elementType': 'geometry',
        'stylers': [
          {
            'color': '#17263c'
          }
        ]
      },
      {
        'featureType': 'water',
        'elementType': 'geometry.fill',
        'stylers': [
          {
            'color': '#181833'
          }
        ]
      },
      {
        'featureType': 'water',
        'elementType': 'labels.text.fill',
        'stylers': [
          {
            'color': '#515c6d'
          }
        ]
      },
      {
        'featureType': 'water',
        'elementType': 'labels.text.stroke',
        'stylers': [
          {
            'color': '#17263c'
          }
        ]
      }
    ], { name: 'Road Schematic' });

    map.mapTypes.set('default', mapStyleDefault);
    map.mapTypes.set('road_schematic', mapStyleRoadHighlight);
    map.setMapTypeId('default');
    this.mapType = 'default';

    // Map event handlers
    const self = this; // Because EVENT HANDLERS! YAY!
    map.addListener('maptypeid_changed', function () {
      self.mapType = map.getMapTypeId();
    });
  }

  centerMap() {
    map.setCenter(this.eilatCoords);
    map.setZoom(14.6);
  }
}
