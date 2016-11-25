import { Component, ViewChild, ElementRef } from '@angular/core';

import { ConferenceData } from '../../providers/conference-data';

import { Platform } from 'ionic-angular';

import { GoogleMap, GoogleMapsLatLng, GoogleMapsMarkerOptions, GoogleMapsEvent, CameraPosition, GoogleMapsMarker } from 'ionic-native';

declare var google: any;

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class Map1Page {

  @ViewChild('mapCanvas1') mapElement: ElementRef;
  public map: GoogleMap;
  public mapEle;
  public randomId;
  constructor(public confData: ConferenceData, public platform: Platform) {
   
  }
   getRandomIntInclusive(min, max) {
     min = Math.ceil(min);
     max = Math.floor(max);
     return Math.floor(Math.random() * (max - min +1)) + min
}

  ionViewWillLeave() {
    console.log('ionViewWillLeave')
    //this.map.remove();
   // this.mapEle.classList.remove('show-map');
  }
  ionViewDidEnter() {
    
    console.log('ionViewDidEnter')
    //console.log(this.randomId);
    // if (this.platform.is('cordova') === true) {
      this.mapEle = this.mapElement.nativeElement;
      //this.confData.getMap().subscribe(mapData => {
         let clickEvent = new MouseEvent("click", {
           "view": window,
           "bubbles": true,
           "cancelable": false
        });
        //this.mapEle.dispatchEvent(clickEvent);
        this.map = new GoogleMap(this.mapEle);
        this.mapEle.classList.add('show-map');
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
            title: 'Ionic',
             'icon': {
                'url': 'https://cdn2.iconfinder.com/data/icons/snipicons/500/map-marker-128.png',
                'size': {
                'width': 50,
                'height': 50
              }
             }
            
          };

          this.map.addMarker(markerOptions)
            .then((marker: GoogleMapsMarker) => {
              marker.showInfoWindow();
            })
                })
   

    }
  }