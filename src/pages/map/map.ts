import { Component, ViewChild, ElementRef } from '@angular/core';

import { ConferenceData } from '../../providers/conference-data';

import { Platform } from 'ionic-angular';

import { GoogleMap, GoogleMapsLatLng, GoogleMapsMarkerOptions, GoogleMapsEvent, GoogleMapsMarker, CameraPosition } from 'ionic-native';

declare var google: any;

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {

  @ViewChild('mapCanvas') mapElement: ElementRef;
  public map: GoogleMap;
  public mapEle;
  constructor(public confData: ConferenceData, public platform: Platform) {
  }
  ionViewWillLeave() {
    console.log('ionViewWillLeave')
    //this.map.remove();
    //this.mapEle.classList.remove('show-map');
  }
  ionViewDidEnter() {
    console.log('ionViewDidEnter')
   
    // if (this.platform.is('cordova') === true) {
      this.mapEle = this.mapElement.nativeElement;
        let clickEvent = new MouseEvent("click", {
           "view": window,
           "bubbles": true,
           "cancelable": false
        });

        this.map = new GoogleMap(this.mapEle);
        this.mapEle.classList.add('show-map');
        this.mapEle.dispatchEvent(clickEvent);
        this.map.on(GoogleMapsEvent.CAMERA_CHANGE).subscribe(() => console.log('camera change'))
        
        this.map.on(GoogleMapsEvent.MAP_CLICK).subscribe (() => console.log('click'))
        this.map.on(GoogleMapsEvent.MAP_LONG_CLICK).subscribe (() => console.log('pan'))  
        this.map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
           let ionic: GoogleMapsLatLng = new GoogleMapsLatLng(43.0741904,-89.3809802);
                 
          // create CameraPosition
          let position: CameraPosition = {
            target: ionic,
            zoom: 18,
            tilt: 30
          };

          // move the map's camera to position
          this.map.moveCamera(position);

          // create new marker
          let markerOptions: GoogleMapsMarkerOptions = {
            position: ionic,
            title: 'Ionic'
          };

          this.map.addMarker(markerOptions)
            .then((marker: GoogleMapsMarker) => {
              marker.showInfoWindow();
            });
                })
    }
  }