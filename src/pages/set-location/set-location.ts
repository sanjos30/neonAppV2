import { Component } from '@angular/core';
import { IonicPage, NavParams,ViewController,LoadingController,ToastController } from 'ionic-angular';
import { Location } from "../../models/location";
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
    lat: 24.623299562653035,
    lng: 73.40927124023438
  };

  locationIsSet = false;
  isUserAuthenticated=false;
  firebaseCustUid:string;

  constructor(public navParams: NavParams,
              private viewCtrl: ViewController,
              private loadingCtrl: LoadingController,
              private toastCtrl: ToastController,
              private geolocation: Geolocation,
              private authService: AuthService) {


  }

  ionViewDidEnter() {
/*    if(this.navParams.get('customerAddress')==null || this.navParams.get('customerAddress')==''){
      console.log('The user previous location data does not exists');
    }else{
      this.location=this.navParams.get('customerAddress');
      console.log('The user previous location data is present');
    }

    this.locationIsSet=this.navParams.get('locationIsSet');
    this.marker=this.location;
    console.log("Setlocation:IonViewDidEnter location is set: "+this.locationIsSet);*/
    this.locationIsSet=this.navParams.get('locationIsSet');
    if(this.navParams.get('locationIsSet')) {
      this.location=this.navParams.get('location');
      this.marker=this.location;
      console.log('The user previous location data is present');
      console.log(this.marker);
      console.log(this.location);


    }else{
      console.log('The user previous location data does not exists');
      this.marker=this.location;
    }
  }

  onSetMarker(event: any) {
    console.log(event);
    console.log('Set Marker');
    //this.marker = new Location(event.coords.lat, event.coords.lng);
    this.marker = {
      lat:event.coords.lat,
      lng:event.coords.lng
    };
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
