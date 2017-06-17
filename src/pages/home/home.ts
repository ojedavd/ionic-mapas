import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Observable } from 'rxjs/Rx';
 
declare var google;
let i = 0; 
@Component({
  selector: 'home-page',
  templateUrl: 'home.html'
})
export class HomePage {
  subscription;
    
  @ViewChild('map') mapElement: ElementRef;
  map: any;
 
  constructor(public navCtrl: NavController, public geolocation: Geolocation) {
 
  }
 
  ionViewDidLoad(){
      this.subscription = Observable.interval(10000).subscribe(x => {
      this.loadMap();
      });    

  }
 
  loadMap(){
 
    this.geolocation.getCurrentPosition().then((position) => {
 
      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
 
      let mapOptions = {
        center: latLng,
        zoom: 17,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
 
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

      let marker = new google.maps.Marker({
      map: this.map,
      icon: {
      path: google.maps.SymbolPath.CIRCLE,
      strokeWeight:5,
      strokeColor:"#5882FA",
      fillColor:"#81BEF7",
      fillOpacity: 1,
      scale: 9,
      },
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
      });
 
      let content = "<h4>Information!</h4>";          
 
      this.addInfoWindow(marker, content);
 
    }, (err) => {
      console.log(err);
    });
 
  }

  function(success){
    console.log(success);
  }

 addInfoWindow(marker, content){
 
  let infoWindow = new google.maps.InfoWindow({
    content: content
  });
 
  google.maps.event.addListener(marker, 'click', () => {
    infoWindow.open(this.map, marker);
  });
 
 } 
}