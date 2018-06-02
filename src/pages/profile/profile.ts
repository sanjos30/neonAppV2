import { Component } from '@angular/core';
import {
  AlertController, IonicPage, LoadingController, ModalController, NavController, NavParams,
  ToastController
} from 'ionic-angular';
import {AuthService} from "../../services/auth";
import {SetLocationPage} from "../set-location/set-location";
import {Geolocation} from "@ionic-native/geolocation";
import {Location} from "../../models/location";
import {Address} from "../../models/address";

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  firebaseCustUid:string;
  //public userProfileData = {};
  public userProfileData = {
    name:'',
    phone:'',
    email:'',
    lastUsedAddressed:{
      city:'',
      street:'',
      postCode:'',
      location:{
        lat:'',
        lng:''
      }
    }
  };
  isUserAuthenticated:boolean;
  location: Location = {
    lat: 24.623299562653035,
    lng: 73.40927124023438
  };

  address:Address= {
    street:'Your Street Address',
    city:'Your City',
    postCode:'Postcode',
    location:null
  };

  constructor(private modalCtrl: ModalController,
              private toastCtrl: ToastController,
              private geolocation: Geolocation,
              public navCtrl: NavController,
              private loadingCtrl: LoadingController,
              public navParams: NavParams,
              private alertCtrl: AlertController,
              private authService: AuthService) {
  }

/*
  ionViewDidEnter() {
    var fbUserProfileData =this.authService.getActiveUserProfile();
    console.log('****************  '+fbUserProfileData);


  }
*/



  ionViewDidEnter(){
    this.isUserAuthenticated=this.authService.isUserLoggedIn();
    console.log(('User login info from profile page is '+this.isUserAuthenticated));
    if(this.isUserAuthenticated) {
      console.log('User is logged in');
      this.userProfileData =this.authService.getActiveUserProfile();
      console.log(this.userProfileData);
/*      this.firebaseCustUid = this.authService.getActiveUserId();
      console.log('Profile Page - ionViewDidEnter(). Active user is - ' + this.firebaseCustUid);
      var userProfileDataFirebase = this.authService.getCurrentUserDetails(this.firebaseCustUid);
      userProfileDataFirebase.on('value', userSnapshot => {
        this.userProfileData = userSnapshot.val();
      });*/
    }else{
      console.log('User is not logged in');
    }
  }

  updateUserProfileInFirebase(){
    console.log(this.userProfileData);
  }

  onOpenMap() {
    console.log("Schedule Page : onOpenMap Function Starts");
    const loader = this.loadingCtrl.create({
      content: 'Getting your Location...'
    });
    //this.userProfileData.lastUsedAddressed.location==null?true:false;
    const modal = this.modalCtrl.create(SetLocationPage,
      {userProfileData: this.userProfileData});
    modal.present();
    modal.onDidDismiss(
      data => {
        if (data) {
          console.log('selected location from overlay page was - '+ data.location.lat + '--' + data.location.lng
            +'--' + data.locationIsSet);
          this.userProfileData = data.userProfileData;
        }else{
          console.log('No location is edited');
        }
      }
    );
  }

  onInputAddress(){
    console.log('Manually entering address');
    //todo
    var city='udaipur',street='26 panchwati',postcode = '313001';
    var addressObject={
      street:'',
      city:'',
      postCode:''};
    addressObject=this.userProfileData.lastUsedAddressed;
    this.createAddressManuallyAlert(addressObject.street,addressObject.city,addressObject.postCode).present();
  }
  private createAddressManuallyAlert(street:string,city:string,postCode:string) {
    return this.alertCtrl.create({
      title: 'Enter Your Address',
      inputs: [
        {
          name: 'street',
          placeholder: 'Street Address',
          value:street
        },
        {
          name: 'city',
          placeholder: 'City',
          value:city
        },
        {
          name: 'postCode',
          placeholder: 'PostCode',
          value:postCode
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
            };
            if ((data.city.trim() == '' || data.city == null)) {
              const toast = this.toastCtrl.create({
                message: 'Please enter a valid city!',
                duration: 1500,
                position: 'bottom'
              });
              toast.present();
              return;
            };
            this.address.street=data.street;
            this.address.city=data.city;
            this.address.postCode=data.postCode;
            //(<FormArray>this.recipeForm.get('ingredients'))
            //  .push(new FormControl(data.name, Validators.required));
            const toast = this.toastCtrl.create({
              message: 'Address added!',
              duration: 1500,
              position: 'bottom'
            });
            //this.locationIsSet=true;
            //console.log('location selected manually in schedule page ' +this.locationIsSet);
            console.log('Manually entered address is -  ' +this.address.street + '-' +this.address.city+
              '-' +this.address.postCode);
            toast.present();
          }
        }
      ]
    });
  }

}
