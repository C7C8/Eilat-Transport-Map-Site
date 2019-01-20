import { Component, OnInit } from '@angular/core';
declare var google: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  map: any;

  ngOnInit(): void {
    this.map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 29.554237, lng: 34.954729},
      zoom: 14.5,
      gestureHandling: 'none',
      zoomControl: false
    });
  }
}
