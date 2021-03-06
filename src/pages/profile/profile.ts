import {Component} from '@angular/core';
import {
  AlertController, IonicPage, LoadingController, ModalController, NavController, NavParams,
  ToastController
} from 'ionic-angular';
import {AuthService} from "../../services/auth";
import {SetLocationPage} from "../set-location/set-location";
import {Geolocation} from "@ionic-native/geolocation";
import {Location} from "../../models/location";
import {Address} from "../../models/address";
import firebase from "firebase";

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  firebaseCustUid: string;
  //public userProfileData = {};


  isUserAuthenticated: boolean = false;

  address: any = {
    street: 'Your Street Address',
    city: 'Your City',
    postCode: 'Postcode',
    lat: 24.623299562653035,
    lng: 73.40927124023438
  };

  public userProfileData = {
    name: '',
    phone: '',
    email: '',
    address: this.address
  };

  locationIsSet = false;

  constructor(private modalCtrl: ModalController,
              private toastCtrl: ToastController,
              private geolocation: Geolocation,
              public navCtrl: NavController,
              private loadingCtrl: LoadingController,
              public navParams: NavParams,
              private alertCtrl: AlertController,
              private authService: AuthService) {
  }

  ionViewDidEnter() {
    this.isUserAuthenticated = this.authService.isUserLoggedIn();
    console.log(('User login info from profile page is ' + this.isUserAuthenticated));
    if (this.isUserAuthenticated) {
      console.log('User is logged in');
      this.firebaseCustUid = this.authService.getActiveUserId();
      console.log(this.authService.getUserPhone() + ': is the user phone number and id is: ' + this.firebaseCustUid);
      var userProfileDataFirebase = this.authService.getCurrentUserDetails(this.firebaseCustUid);
      //For users who are registered but haven't ordered yet or their first order with us failed.
      if(userProfileDataFirebase!=null){

        userProfileDataFirebase.on('value', userSnapshot => {
          if(userSnapshot.val()!=null)
            this.userProfileData = userSnapshot.val();
          else {
            console.log('schedule.ts - ionViewDidEnter - This is the first time a user is ordering with us');
            //Since the phone number is already available, use it to prepopulate the form
            this.userProfileData.phone=this.authService.getUserPhone();

          }
        });
      }
    } else {
      console.log('User is not logged in');
    }
  }

  updateUserProfileInFirebase() {
    console.log('saving');
    console.log(this.userProfileData);
    this.updateUserFirebaseProfile();
  }

  private updateUserFirebaseProfile() {
    // Get a key for a new Post.
    var newOrderKey = firebase.database().ref().child('orders').push().key;
    // Update the users profile.
    var updates = {};
    updates['/users/' + this.firebaseCustUid] = this.userProfileData;

    const toast = this.toastCtrl.create({
      message: 'Profile Updated!',
      duration: 1500,
      position: 'bottom'
    });
    toast.present();
    //return firebase.database().ref().update(updates);
    return firebase.database().ref().update(updates).then(function () {
      toast.present();
    }).catch(function (error) {
      alert("Data could not be saved." + error);
    });
    ;
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
          this.userProfileData.address.lat=data.location.lat;
          this.userProfileData.address.lng=data.location.lng;
          this.locationIsSet = true;
        } else {
          console.log('No location is selected' + this.locationIsSet);
        }
      }
    );
  }

  onInputAddress() {
    var addressObject = this.address;
    if (this.isUserAuthenticated) {
      console.log('User is authenticated. So using his last populated address'+this.firebaseCustUid);
      console.log(this.userProfileData);
      addressObject = this.userProfileData.address;
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
          handler:data=> {
            if (
              !((data.street.trim() == '' || data.street == null) ||
                (data.city.trim() == '' || data.city == null))){
              this.locationIsSet=true
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
            console.log('Manually entered address is -  ' + this.address.street + '-' + this.address.city +
              '-' + this.address.postCode);
            this.userProfileData.address=this.address;
            toast.present();
          }
        }
      ]
    });
  }

}
