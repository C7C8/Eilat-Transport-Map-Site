import { Component, OnInit } from '@angular/core';
declare var google: any;
var map: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  mapType: string;

  ngOnInit(): void {
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 29.554395401332155, lng: 34.949205486964829},
      zoom: 14.6,
      gestureHandling: 'none',
      zoomControl: false,
      streetViewControl: false,
      rotateControl: false,
      fullscreenControl: false,
      mapTypeControlOptions: {
        style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
        mapTypeIds: ['roadmap', 'terrain', 'hybrid'],
        position: google.maps.ControlPosition.TOP_LEFT
      }
    });

    this.mapType = map.getMapTypeId();

    // Map event handlers
    const self = this; // Because EVENT HANDLERS! YAY!
    map.addListener('maptypeid_changed', function () {
      self.mapType = map.getMapTypeId();
      console.log(self.mapType);
    });
  }
}
