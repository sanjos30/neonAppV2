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
import {Order} from "../../models/order";
import {Geolocation} from '@ionic-native/geolocation';
import {SetOrderTimePage} from "../set-order-time/set-order-time";
import {Schedule2Page} from "../schedule2/schedule2";
import {AuthService} from "../../services/auth";
import {Customer} from "../../models/customer";
import firebase from "firebase";
import {Address} from "../../models/address";
import {HelperService} from "../../services/helper";

@IonicPage()
@Component({
  selector: 'page-schedule',
  templateUrl: 'schedule.html',
})


export class SchedulePage {

  //Order type is normal by default
  public isExpressDelivery: boolean = false;
  orderType: string = 'Normal';
  userToken: string;
  public orderTypeNote: string = "MIN 2 DAYS DELIVERY";
  newOrder: Order;
  public customer_fb: any = new Customer('', '', '', null);

  address: any = {
    street: 'Your Street Address',
    city: 'Your City',
    postCode: 'Postcode',
    lat: 24.623299562653035,
    lng: 73.40927124023438
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
              private authService: AuthService,
              private helperService: HelperService) {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.isUserAuthenticated = true;
        this.userToken = this.authService.getActiveUserId();
        this.userProfileData = this.authService.getActiveUserProfile();
        this.authService.loadUserProfileFromFirebase(this.userToken);
      } else {
        console.log('Schedule.ts - constructor - user NOT authenticated ');
      }
    });
  }

  ionViewDidEnter() {
    this.isUserAuthenticated = this.authService.isUserLoggedIn();
    if (this.isUserAuthenticated) {
      this.userToken = this.authService.getActiveUserId();
      this.userProfileData = this.authService.getActiveUserProfile();
      Object.assign(this.customer_fb, this.authService.loadUserProfileFromFirebase(this.userToken));
      console.log('Schedule.ts - ionViewDidEnter - User logged in name from FB is ' + this.customer_fb.name);
    } else {
      console.log('Schedule.ts - ionViewDidEnter - User NOT logged in - flag is ' + this.isUserAuthenticated);
    }
  }

  goToStep2() {
    this.newOrder = new Order(this.orderType,
      this.customer_fb.address,
      this.event.pickupDate,
      this.event.pickupTime,
      this.event.dropOffDate,
      this.event.dropOffTime,
      this.helperService.getRandomStringId(),
      this.userProfileData,
      new Date().toISOString()
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
    this.checkUsrProfileLoaded(this.isUserAuthenticated);
    const loader = this.loadingCtrl.create({
      content: 'loading...'
    });
    loader.present().then(
      //Object.assign(this.customer_fb, this.authService.loadUserProfileFromFirebase(this.userToken))
    );
    var customerAddress;
    var isLocationSet = false;
    if (this.customer_fb.address != null) {
      customerAddress = this.customer_fb.address;
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
    const modal = this.modalCtrl.create(SetLocationPage,
      {location: customerAddress, locationIsSet: isLocationSet});
    modal.present();
    modal.onDidDismiss(
      data => {
        if (data.location.lat) {
          if (this.customer_fb.address == null) {
            this.customer_fb.address = {
              lat: data.location.lat,
              lng: data.location.lng
            };
          } else {
            this.customer_fb.address.lat = data.location.lat;
            this.customer_fb.address.lng = data.location.lng;
          }
          this.locationIsSet = data.locationIsSet;
        } else {
          console.log('Schedule.ts - onOpenMap function - New User - Pressed Cancel - Not selected location ');
          this.locationIsSet = false;
        }
      }
    );
  }

  onInputAddress() {
    this.checkUsrProfileLoaded(this.isUserAuthenticated);
    var addressObject = this.customer_fb.address;
    if (this.isUserAuthenticated) {
      console.log(this.customer_fb);
      addressObject = this.customer_fb.address;
      console.log(addressObject);
    } else {
      console.log('Schedule.ts - onInputAddress function - User is NOT authenticated.');
      addressObject = this.address;
    }
    this.createAddressManuallyAlert(addressObject.street, addressObject.city, addressObject.postCode).present();
  }

  checkUsrProfileLoaded(isUserLoggedIn: boolean) {
    if (isUserLoggedIn) {
      Object.assign(this.customer_fb, this.authService.loadUserProfileFromFirebase(this.userToken));
    }

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
          handler: data => {
            if (data) {
              if (this.customer_fb.address == null) {
                this.locationIsSet = false;
              } else if (this.customer_fb.address.street != null ||
                this.customer_fb.address.city != null ||
                this.customer_fb.address.postCode != null) {
                this.locationIsSet = true;
              }
            }
          },
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
            if (this.customer_fb.address != null) {

              this.customer_fb.address.street = data.street;
              this.customer_fb.address.city = data.city;
              this.customer_fb.address.postCode = data.postCode;
              this.locationIsSet = true;
            } else {
              console.log('Schedule.ts - Add Address function - Press Add button - Customer NULL');
              this.locationIsSet = true;
              this.customer_fb.address = {
                street: data.street,
                city: data.city,
                postCode: data.postCode
              }
            }
            const toast = this.toastCtrl.create({
              message: 'Address added!',
              duration: 1000,
              position: 'bottom'
            });
            this.locationIsSet = true;
            toast.present();
          }
        }
      ]
    });
  }
}
