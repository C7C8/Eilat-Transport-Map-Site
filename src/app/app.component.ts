import { Component, OnInit } from '@angular/core';
import { faMap,
  faPlaneArrival,
  faShip,
  faChartBar,
  faInfoCircle} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  faMap = faMap;
  faPlaneArrival = faPlaneArrival;
  faShip = faShip;
  faChartBar = faChartBar;
  faInfoCircle = faInfoCircle;

  constructor() {
  }

  ngOnInit(): void {
  }
}
