import {SetLocationPage} from "../pages/set-location/set-location";
import {Address} from "../models/address";
import {Customer} from "../models/customer";
import {AlertController, LoadingController, ModalController, NavController, ToastController} from "ionic-angular";
import {Geolocation} from "@ionic-native/geolocation";
import {AuthService} from "./auth";
import firebase from "firebase";

export class HelperService {

  onOpenMap_Helper(customer_fb: any,
                   userToken: string,
                   loadingCtrl: LoadingController,
                   modalCtrl: ModalController,
                   authService: AuthService) {

    const loader = loadingCtrl.create({
      content: 'loading...'
    });
    loader.present().then(
      Object.assign(customer_fb, authService.loadUserProfileFromFirebase(userToken))
    );
    var customerAddress;
    var isLocationSet = false;
    if (customer_fb.address != null) {
      customerAddress = customer_fb.address;
      isLocationSet = true;
    } else {
      isLocationSet = false;
      customerAddress = new Address(
        'Your street',
        'your city',
        'postcode',
        '24.623299562653035',
        '73.40927124023438');
    }
    loader.dismiss();
    const modal = modalCtrl.create(SetLocationPage,
      {location: customerAddress, locationIsSet: isLocationSet});
    modal.present();
    modal.onDidDismiss(
      data => {
        if (data) {
          console.log('Helper Service - selected location from overlay page was - ' + data.location.lat + '--' + data.location.lng
            + '--' + data.locationIsSet);
          customer_fb.address = {
            lat: data.location.lat,
            lng: data.location.lng
          }
        } else {
          console.log('No location is selected');
        }
      }
    );
  }

  getRandomStringId() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
  }


}
