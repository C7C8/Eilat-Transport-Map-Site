import { Icon } from '@fortawesome/fontawesome-svg-core';
import { faCar, faBus, faImage } from '@fortawesome/free-solid-svg-icons';
import { mapBounds } from './mapStyles';
declare var google: any;

export interface Overlay {
  name: string;               // Name as shown in overlay navigator
  icon: any;                  // FontAwesome icon, if applicable
  active: boolean;            // Whether overlay is shown or not.
  descName?: string;          // Name as shown in description header
  description: string;        // Description as HTML
  tooltip?: string;           // Very short info string about the overlay

  onChange?(map: any, selected: boolean): void;  // Called if the overlay is toggled.
}

export interface GoogleOverlay extends Overlay {
  gOverlay: any;
}

export const overlaysTable: (Overlay | GoogleOverlay)[] = [
  {
    name: 'Traffic',
    icon: faCar,
    active: false,
    descName: 'Traffic overlay',
    tooltip: 'Highlight congestion along city roads.',
    gOverlay: new google.maps.TrafficLayer(),

    description: `<p>Traffic data is shown as colored lines along the road, on a scale from green
      to red. The more red the line is &mdash; straight up to dark maroon &mdash; the heavier traffic in that
      area is.</p>`,

    onChange(map: any, selected: boolean): void {
      this.active = selected;
      this.gOverlay.setMap(selected ? map : null);
    },
  },
  {
    name: 'Bus stops',
    icon: faBus,
    active: false,
    descName: 'Bus stop overlay',
    tooltip: 'Show bus stops within the city',
    gOverlay: new google.maps.TransitLayer(),

    description: `<p>Public transport is shown, in particular bus stops. Unfortunately, the service used to
      generate this map, the Google Maps API, doesn't have access to Eilat bus routes or timetables, possibly
      limiting its usefulness to travelers. Google offers a <a href="https://support.google.com/transitpartners">transit partnership
      program</a> to gather static and live data from cities to better direct travelers and tourists.</p>`,

    onChange (map: any, selected: boolean): void {
      this.active = selected;
      this.gOverlay.setMap(selected ? map : null);
    }
  },
  {
    name: 'Overlay demo',
    icon: faImage,
    active: false,
    descName: 'Image overlay demo',
    tooltip: 'Google maps image overlay demo',
    gOverlay: new google.maps.GroundOverlay('assets/overlay_demo.png', mapBounds),

    description: `<p>Demonstration image overlay using the google maps API. Good for showing
      static data such as city zoning or population density information. Images should be sized
      at 3427x3226 with a transparent background in order to show overlays without distortion.</p>
      <p><b>Important TODO: this overlay should be removed before the final version of this site
      is published!</b></p>`,

    onChange(map: any, selected: boolean): void {
      this.active = selected;
      this.gOverlay.setMap(selected ? map : null);
    }
  }
];

