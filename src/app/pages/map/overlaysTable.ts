import { faCar, faBus, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { FetchService } from '../../fetch.service';
declare var google: any;

export class Overlay {
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

    onChange(map: any, selected: boolean): void {
      this.active = selected;
      this.gOverlay.setMap(selected ? map : null);
    }
  },
  {
    name: 'Bus locations',
    icon: faMapMarkerAlt,
    active: false,
    descName: 'Live bus locations',
    tooltip: 'Show live bus locations in the city',
    gOverlay: null,

    description: `<p>Bus locations at the time of this site's loading are shown as markers on the map.
                  Data sourced from the Ministry of Transportation's SIRI API.</p>`,

    onChange(map: any, selected: boolean): void {
      this.active = selected;
      if (selected) {
        map.data.addGeoJson(FetchService.busLocations);
      } else {
        map.data.forEach(feature => {
          map.data.remove(feature);
        });
      }
    }
  }
];

