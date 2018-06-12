import {Component} from '@angular/core';
import {IonicPage, NavParams, ViewController, LoadingController, ToastController} from 'ionic-angular';
import {Location} from "../../models/location";
import {Geolocation} from "@ionic-native/geolocation";
import {AuthService} from "../../services/auth";

@IonicPage()
@Component({
  selector: 'page-set-location',
  templateUrl: 'set-location.html',
})
export class SetLocationPage {

  location: any = {
    street: '',
    city: '',
    postCode: '',
    lat: 24.623299562653035,
    lng: 73.40927124023438
  };

  marker: any = {
    street: '',
    city: '',
    postCode: '',
    lat: '',
    lng: ''
  };

  locationIsSet = false;

  constructor(public navParams: NavParams,
              private viewCtrl: ViewController,
              private loadingCtrl: LoadingController,
              private toastCtrl: ToastController,
              private geolocation: Geolocation) {


  }

  ionViewDidEnter() {
    this.locationIsSet = this.navParams.get('locationIsSet');
    if (this.navParams.get('locationIsSet')) {
      this.location = this.navParams.get('location');
      this.marker = this.location;
      console.log('set-location.ts - ionViewDidEnter - The user previous location data is present ');
      this.locationIsSet = true;
    } else {
      console.log('set-location.ts - ionViewDidEnter - NO Location data exists from past ');
      this.locationIsSet = false;
      //this.marker=this.location;
    }
  }

  onSetMarker(event: any) {
    console.log(event);
    //this.marker = new Location(event.coords.lat, event.coords.lng);
    this.marker = {
      lat: event.coords.lat,
      lng: event.coords.lng
    };
    //this.locationIsSet = true;
  }

  onConfirm() {
    this.viewCtrl.dismiss({location: this.marker, locationIsSet: this.locationIsSet});
  }

  onAbort() {
    this.viewCtrl.dismiss(
      {
        location: this.marker,
        locationIsSet: this.locationIsSet
      });
  }

  onLocate() {
    const loader = this.loadingCtrl.create({
      content: 'Getting your Location...'
    });
    loader.present();
    this.geolocation.getCurrentPosition().then((resp) => {
      this.location.lat = resp.coords.latitude;
      this.location.lng = resp.coords.longitude;
      console.log('set-location.ts - ionViewDidEnter -current location '
        + this.location.lat + ' -- ' + this.location.lng);
      //this.locationIsSet = true;
      this.marker = this.location;
      console.log('set-location.ts - ionViewDidEnter - markup location '
        + this.marker.lat + ' -- ' + this.marker.lng);
      loader.dismiss();
      // resp.coords.latitude
      // resp.coords.longitude
    }).catch((error) => {

      console.log('Error getting location', error);
      loader.dismiss();
      const toast = this.toastCtrl.create({
        message: 'Could get location, please pick it manually!',
        duration: 2500
      });
      toast.present();
    });

  }
}
