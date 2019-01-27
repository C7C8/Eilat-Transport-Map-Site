import { Icon } from '@fortawesome/fontawesome-svg-core';
import { faCar, faBus } from '@fortawesome/free-solid-svg-icons';
declare var google: any;

export interface Overlay {
  name: string;               // Name as shown in overlay navigator
  icon: any;                  // FontAwesome icon, if applicable
  descName?: string;          // Name as shown in description header
  description: string;        // Description as HTML
  active: boolean;            // Whether the overlay is visible or not
  image?: string;             // Path to image overlay, if applicable.

  onChange?(map: any): void;  // Called if the overlay is toggled.
}

export interface GoogleOverlay extends Overlay {
  gOverlay: any;
}

export const overlaysTable: (Overlay | GoogleOverlay)[] = [
  {
    name: 'Traffic',
    icon: faCar,
    descName: 'Traffic overlay',
    description: `<p>Traffic data is shown as colored lines along the road, on a scale from green
      to red. The more red the line is &mdash; straight up to dark maroon &mdash; the heavier traffic in that
      area is.</p>`,
    active: false,
    gOverlay: new google.maps.TrafficLayer(),
    onChange: (map: any): void => {
      console.log('Toggling traffic overlay');
      this.gOverlay.setMap(this.active ? null : map);
      this.active = !this.active;
    }
  },
  {
    name: 'Bus stops',
    icon: faBus,
    descName: 'Bus stop overlay',
    description: `<p>Public transport is shown, in particular bus stops. Unfortunately, the service used to
      generate this map, the Google Maps API, doesn't have access to Eilat bus routes or timetables, possibly
      limiting its usefulness to travelers. Google offers a <a href="https://support.google.com/transitpartners">transit partnership
      program</a> to gather static and live data from cities to better direct travelers and tourists.</p>`,
    active: false,
    gOverlay: new google.maps.TransitLayer(),
    onChange: (map: any): void => {
      this.gOverlay.setMap(this.active ? null : map);
      this.active = !this.active;
    }
  }
];

