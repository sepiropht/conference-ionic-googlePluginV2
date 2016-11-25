import { Component } from '@angular/core';

/*
  Generated class for the GoogleMap component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'google-map',
  templateUrl: 'google-map.html'
})
export class GoogleMapComponent {

  text: string;

  constructor() {
    console.log('Hello GoogleMap Component');
    this.text = 'Hello World';
  }

}
