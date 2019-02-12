import { Component, OnInit } from '@angular/core';
import { faMap,
  faPlaneArrival,
  faChartBar,
  faSun,
  faMoon,
  faCity,
  faInfoCircle} from '@fortawesome/free-solid-svg-icons';
import { MatSlideToggleChange } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  faMap = faMap;
  faPlaneArrival = faPlaneArrival;
  faChartBar = faChartBar;
  faInfoCircle = faInfoCircle;
  faSun = faSun;
  faMoon = faMoon;
  faCity = faCity;

  constructor() {
  }

  ngOnInit(): void {
  }

  handleThemeChange(event: MatSlideToggleChange) {
    const body = document.getElementsByTagName('body').item(0);
    if (event.checked) {
      body.classList.add('light-theme');
    } else {
      body.classList.remove('light-theme');
    }
  }
}
