import {Component} from '@angular/core';
import {
  ModalController,
  ToastController,
  IonicPage,
  AlertController,
  LoadingController,
  NavController
} from 'ionic-angular';
import {SetLocationPage} from "../set-location/set-location";
import {Location} from "../../models/location";
import {Order} from "../../models/order";
import {Geolocation} from '@ionic-native/geolocation';
import {SetOrderTimePage} from "../set-order-time/set-order-time";
import {Schedule2Page} from "../schedule2/schedule2";
import {Address} from "../../models/address";
import {AuthService} from "../../services/auth";
import {Customer} from "../../models/customer";
import firebase from "firebase";

@IonicPage()
@Component({
  selector: 'page-schedule',
  templateUrl: 'schedule.html',
})


export class SchedulePage {

  //Order type is normal by default
  public isExpressDelivery: boolean = false;
  orderType: string='Normal';
  firebaseCustUid: string;
  public orderTypeNote: string = "MIN 2 DAYS DELIVERY";
  newOrder: Order;

  address: any = {
    street: 'Your Street Address',
    city: 'Your City',
    postCode: 'Postcode',
    lat: 24.623299562653035,
    lng: 73.40927124023438
    //location: this.defaultLocation
  };

  public event = {
    pickupDate: '2018-05-01',
    pickupTime: '10:00',
    dropOffDate: '2018-05-04',
    dropOffTime: '10:30'
  }

  public userProfileData = {
    name: '',
    phone: '',
    email: '',
    address: this.address
  };

  locationIsSet = false;

  isUserAuthenticated = false;

  constructor(private modalCtrl: ModalController,
              private alertCtrl: AlertController,
              private toastCtrl: ToastController,
              private geolocation: Geolocation,
              private loadingCtrl: LoadingController,
              private navCtrl: NavController,
              private authService: AuthService) {
        firebase.auth().onAuthStateChanged(user => {
          if (user) {
            console.log('constructor - user authenticated.');
            this.isUserAuthenticated=true;
            this.userProfileData = this.authService.getActiveUserProfile();
          } else {
            console.log('constructor -  user unauthenticated.');
          }
        });
  }

  ionViewDidLoad() {
    this.userProfileData = this.authService.getActiveUserProfile();
    this.firebaseCustUid = this.authService.getActiveUserId();
  }

  ionViewDidEnter() {
    console.log('schedule1 page: ionViewDidEnter');
    this.isUserAuthenticated = this.authService.isUserLoggedIn();
    if (this.isUserAuthenticated) {
      this.userProfileData = this.authService.getActiveUserProfile();
      console.log('schedule1 page ionViewDidEnter. User logged in flag is ' + this.isUserAuthenticated);
    } else {
      console.log('schedule1 page ionViewDidEnter. User logged in flag is ' + this.isUserAuthenticated);
    }
  }

  goToStep2() {
    this.newOrder = new Order(this.orderType,
      this.address,
      this.event.pickupDate,
      this.event.pickupTime,
      this.event.dropOffDate,
      this.event.dropOffTime,
      this.getRandomStringId(),
      null,
      new Date().toISOString()
    );

    console.log('Passing the below order details to the schedule 2 page');
    console.log(this.newOrder.orderType + " - "
      + this.newOrder.address.lng + " - "
      + this.newOrder.address.lat + " - "
      + this.newOrder.address + " - "
      + this.newOrder.pickupDate + " - "
      + this.newOrder.pickupTime + " - "
      + this.newOrder.dropDate + " - "
      + this.newOrder.dropTime + " -- "
      + this.newOrder.customerId
    );

    this.navCtrl.push(Schedule2Page, {
      newOrder: this.newOrder
    });
  }


  public toggleBackgroundColor(): void {
    if (this.isExpressDelivery) {
      this.isExpressDelivery = false;
      this.orderTypeNote = "MIN 2 DAYS DELIVERY";
      this.orderType = 'Normal';
    } else {
      this.isExpressDelivery = true;
      this.orderTypeNote = "NEXT DAY DELIVERY";
      this.orderType = 'Express';
    }
  }

  selectOrderDateTime() {
    const modal = this.modalCtrl.create(SetOrderTimePage,
      {
        orderType: this.isExpressDelivery,
        event: this.event
      });
    modal.present();
    modal.onDidDismiss(
      data => {
        if (data) {
          this.event = data.event;
        } else {
          //Todo DoNothing for now
        }
      }
    );
  }

  onOpenMap() {
    var customerAddress=this.address;
    if(this.userProfileData.address!=null){
      customerAddress = this.userProfileData.address;
    }
    var isLocationSet = false;
    if(customerAddress.lat==null || customerAddress.lng ==null){
      console.log('Location was not selected previously');
      isLocationSet=false;
    }else{
      console.log('Location was selected previously'+customerAddress.lat+customerAddress.lng);
      isLocationSet=true;
    }
    const modal = this.modalCtrl.create(SetLocationPage,
      {location: customerAddress, locationIsSet: isLocationSet});
    modal.present();
    modal.onDidDismiss(
      data => {
        if (data) {
          console.log('selected location from overlay page was - ' + data.location.lat + '--' + data.location.lng
            + '--' + data.locationIsSet);
          this.address.lat = data.location.lat;
          this.address.lng = data.location.lng;
          this.locationIsSet = true;
        } else {
          console.log('No location is selected' + this.locationIsSet);
        }
      }
    );
  }

  loadUserProfile() {
    const loader = this.loadingCtrl.create({
      content: 'loading...'
    });
    loader.present();
    if (this.isUserAuthenticated) {
      this.userProfileData = this.authService.getActiveUserProfile();
      console.log('schedule1 page ionViewDidEnter. User logged in flag is ' + this.isUserAuthenticated);
    }
    loader.dismiss();
  }

  getUserLocation() {
    this.geolocation.getCurrentPosition()
      .then(
        location => {
          // loader.dismiss();
          this.address.lat = location.coords.latitude;
          this.address.lng = location.coords.longitude;
        }
      )
      .catch(
        error => {
          //loader.dismiss();
          const toast = this.toastCtrl.create({
            message: 'Could get location, please pick it manually!',
            duration: 2500
          });
          toast.present();
        }
      );
  }

  onInputAddress() {
    var addressObject = this.address;
    if (this.isUserAuthenticated) {
      console.log('User is authenticated. So using his last populated address');
      console.log(this.userProfileData);
      addressObject = this.userProfileData.address;
      console.log(addressObject);
    } else {
      console.log('User is NOT authenticated. So using his last populated address');
    }
    this.createAddressManuallyAlert(addressObject.street, addressObject.city, addressObject.postCode).present();
  }

  private createAddressManuallyAlert(street: string, city: string, postCode: string) {
    return this.alertCtrl.create({
      title: 'Enter Your Address',
      inputs: [
        {
          name: 'street',
          placeholder: 'Street Address',
          value: street
        },
        {
          name: 'city',
          placeholder: 'City',
          value: city
        },
        {
          name: 'postCode',
          placeholder: 'PostCode',
          value: postCode
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Add',
          handler: data => {
            if ((data.street.trim() == '' || data.street == null)) {
              const toast = this.toastCtrl.create({
                message: 'Please enter a valid street address!',
                duration: 1500,
                position: 'bottom'
              });
              toast.present();
              return;
            }
            ;
            if ((data.city.trim() == '' || data.city == null)) {
              const toast = this.toastCtrl.create({
                message: 'Please enter a valid city!',
                duration: 1500,
                position: 'bottom'
              });
              toast.present();
              return;
            }
            ;
            this.address.street = data.street;
            this.address.city = data.city;
            this.address.postCode = data.postCode;
            //(<FormArray>this.recipeForm.get('ingredients'))
            //  .push(new FormControl(data.name, Validators.required));
            const toast = this.toastCtrl.create({
              message: 'Address added!',
              duration: 1500,
              position: 'bottom'
            });
            this.locationIsSet = true;
            console.log('Manually entered address is -  ' + this.address.street + '-' + this.address.city +
              '-' + this.address.postCode);
            toast.present();
          }
        }
      ]
    });
  }

  getRandomNumberId() {
    return Math.floor((Math.random() * 6) + 1);
  }

  getRandomStringId() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
  }
}
