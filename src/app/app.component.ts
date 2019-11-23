import { Component, OnInit } from '@angular/core';
import { faMap,
  faPlaneArrival,
  faChartBar,
  faSun,
  faMoon,
  faCity,
  faInfoCircle} from '@fortawesome/free-solid-svg-icons';
import { MatSlideToggleChange } from '@angular/material';
import { FetchService } from './fetch.service';

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

  constructor(private fetchService: FetchService) { }

  async ngOnInit() {
    await this.fetchService.cacheBusLocations();
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
