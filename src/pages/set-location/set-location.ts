import { Component } from '@angular/core';
import { IonicPage, NavParams,ViewController,LoadingController,ToastController } from 'ionic-angular';
import { Location } from "../../models/location";
import {Geolocation} from "@ionic-native/geolocation";

@IonicPage()
@Component({
  selector: 'page-set-location',
  templateUrl: 'set-location.html',
})
export class SetLocationPage {

  location: Location;
  marker: Location;
  locationIsSet = false;


  constructor(public navParams: NavParams,
              private viewCtrl: ViewController,
              private loadingCtrl: LoadingController,
              private toastCtrl: ToastController,
              private geolocation: Geolocation) {
    console.log('Inside the constrctor 1'+ this.navParams.get('location').lat +'----'+ this.navParams.get('location').lng);
    console.log('Location selected previously -- '+ this.navParams.get('locationIsSet'));
    this.location=this.navParams.get('location');

    if (this.navParams.get('locationIsSet')) {
      this.marker = this.location;
      console.log('location is set previously');
    }else{
      console.log('location is not set');
    }
    /*    this.location=this.navParams.get('location');
        this.locationIsSet==this.navParams.get('locationIsSet');
        this.marker=this.location;
        console.log("location is set: "+this.locationIsSet+ ' - ' + this.location.lat+ ' - '+ this.location.lng);
        if(this.navParams.get('locationIsSet')) {
          this.marker=this.location;
        }*/
  }


  onSetMarker(event: any) {
    console.log(event);
    console.log('Set Marker');
    this.marker = new Location(event.coords.lat, event.coords.lng);
    this.locationIsSet=true;
  }

  onConfirm() {
    console.log('Confirmed');
    this.viewCtrl.dismiss({location: this.marker ,locationIsSet:true});
  }

  onAbort() {
    console.log('Aborted');
    this.viewCtrl.dismiss();
  }

  onLocate() {
    const loader = this.loadingCtrl.create({
      content: 'Getting your Location...'
    });
    loader.present();
    this.geolocation.getCurrentPosition().then((resp) => {

      this.location.lat = resp.coords.latitude;
      this.location.lng = resp.coords.longitude;
      console.log('current location ' + this.location.lat + ' -- ' + this.location.lng);

      this.locationIsSet = true;
      this.marker = this.location;
      this.locationIsSet = true;
      console.log('markup location ' + this.marker.lat + ' -- ' + this.marker.lng);
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

 /*   this.geolocation.getCurrentPosition
      .then(
        (resp) => {
          loader.dismiss();
          this.location.lat = location.coords.latitude;
          this.location.lng = location.coords.longitude;
          this.locationIsSet = true;
        }
      )
      .catch(
        error => {
          loader.dismiss();
          const toast = this.toastCtrl.create({
            message: 'Could get location, please pick it manually!',
            duration: 2500
          });
          toast.present();
        }
      );*/
  }
}
