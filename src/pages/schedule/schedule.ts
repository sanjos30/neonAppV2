import { Component } from '@angular/core';
import { ModalController, ToastController,IonicPage,AlertController,LoadingController,NavController } from 'ionic-angular';
import { SetLocationPage } from "../set-location/set-location";
import { Location } from "../../models/location";
import {Order} from "../../models/order";
import { Geolocation } from '@ionic-native/geolocation';
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

  public isExpressDelivery : boolean = false;
  orderType:string;
  public orderTypeNote: string ="MIN 2 DAYS DELIVERY";
  newOrder:Order;
  customer:Customer;

  defaultLocation: Location = {
    lat: 24.623299562653035,
    lng: 73.40927124023438
  };

  address:Address= {
    street:'Your Street Address',
    city:'Your City',
    postCode:'Postcode',
    location:this.defaultLocation
  };

  public event = {
    pickupDate: '2018-05-01',
    pickupTime: '10:00',
    dropOffDate: '2018-05-04',
    dropOffTime: '10:30'
  }

  locationIsSet = false;

  isAuthenticated=false;

  userPersonalDetails:any;

  constructor(private modalCtrl: ModalController,
              private alertCtrl: AlertController,
              private toastCtrl: ToastController,
              private geolocation: Geolocation,
              private loadingCtrl: LoadingController,
              private navCtrl: NavController,
              private authService: AuthService

              ) {
  //  this.customer=new Customer('','','',null);
/*    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log('user authenticated.');
      } else {
        console.log('user unauthenticated.');
      }
    });
    console.log('constructor:');
    var user = firebase.auth().currentUser;

    if (user) {
      // User is signed in.
      console.log('constructor:User is signed in.');

    } else {
      // No user is signed in.
      console.log('constructor:No User is signed in.');
    }*/
/*    var currentUser=this.authService.getActiveUser();
    if (currentUser) {
      // User is signed in.
      this.isAuthenticated=true;
      var currentUserDetails=this.authService.getCurrentUserDetails(currentUser.uid);

      currentUserDetails.on('value', itemSnapshot => {
        itemSnapshot.forEach( itemSnap => {
          if(itemSnap.key=='name'){
            this.customer.name=itemSnap.val();
          }
          if(itemSnap.key=='email'){
            this.customer.email=itemSnap.val();
          }
          if(itemSnap.key=='phone'){
            this.customer.phone=itemSnap.val();
          }
          return false;
        });
      });
    } else {
      // No user is signed in.
      this.isAuthenticated=false;
    }*/}

  ionViewDidEnter() {
    console.log('schedule1 page: ionViewDidEnter');
    var isUserAuthenticated=false;
    if(firebase.auth().currentUser!=null) {
      isUserAuthenticated=this.authService.isUserLoggedIn();
      console.log('schedule1 page. User logged in flag is ' + isUserAuthenticated);
    }else{
      console.log('schedule1 page. User logged in flag is ' + isUserAuthenticated);
    }
    this.isAuthenticated=isUserAuthenticated;
  }

  placeFinalOrder(){
    console.log("Schedule Page : placeFinalOrder Function Starts");
    //this.recipesService.addRecipe(value.title, value.description, value.difficulty, ingredients);
   // this.orders.push(new Order(orderType, location,address,pickupDate,pickupTime,dropDate,dropTime,customerId));

/*    this.orderService.addOrder(
      this.orderType,
      this.location,
      this.address,
      this.event.pickupDate,
      this.event.pickupTime,
      this.event.dropOffDate,
      this.event.dropOffTime,
      this.getRandomStringId()
      )*/
    console.log("Schedule Page : placeFinalOrder Function Ends");
  }

  placeFinalOrderFireBase(){
    console.log("Schedule Page : placeFinalOrderFireBase Function Starts");
    //this.recipesService.addRecipe(value.title, value.description, value.difficulty, ingredients);
    // this.orders.push(new Order(orderType, location,address,pickupDate,pickupTime,dropDate,dropTime,customerId));
    this.newOrder=new Order(this.orderType,
                            this.address,
                            this.event.pickupDate,
                            this.event.pickupTime,
                            this.event.dropOffDate,
                            this.event.dropOffTime,
                            this.getRandomStringId(),
                            null,
                            new Date().toISOString()
                            );
/*    this.newOrder=new Order(this.orderType, this.address,this.event.pickupDate,this.event.pickupTime,
      this.event.dropOffDate,this.event.dropOffTime,'asas');*/

    console.log("Schedule Page : placeFinalOrderFireBase Function Ends");
  }

  getRandomNumberId() {
    return Math.floor((Math.random()*6)+1);
  }

  getRandomStringId() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
      return text;
  }

  goToStep2(){
  console.log("Schedule Page: Setup the order object");
    this.newOrder=new Order(this.orderType,
      this.address,
      this.event.pickupDate,
      this.event.pickupTime,
      this.event.dropOffDate,
      this.event.dropOffTime,
      this.getRandomStringId(),
      null,
      new Date().toISOString()
    );

    console.log ("Order is "  + this.newOrder.orderType + " - "
      + this.newOrder.address.location.lng + " - "
      + this.newOrder.address.location.lat + " - "
      + this.newOrder.address + " - "
      + this.newOrder.pickupDate + " - "
      + this.newOrder.pickupTime + " - "
      + this.newOrder.dropDate + " - "
      + this.newOrder.dropTime + " -- "
      + this.newOrder.customerId
    );


    //this.navCtrl.push(Schedule2Page, {isExpressDelivery: this.isExpressDelivery, location: this.location});
    this.navCtrl.push(Schedule2Page, {
      newOrder:this.newOrder,
      signedInCustomer:this.customer,
      isUserAuthenticate:this.isAuthenticated});
  }



  public toggleBackgroundColor(): void {
    if(this.isExpressDelivery) {
      this.isExpressDelivery=false;
      this.orderTypeNote="MIN 2 DAYS DELIVERY";
      this.orderType='Normal';
    } else {
      this.isExpressDelivery=true;
      this.orderTypeNote="NEXT DAY DELIVERY";
      this.orderType='Express';
    }
  }

  selectOrderDateTime() {
    const modal = this.modalCtrl.create(SetOrderTimePage,
      {orderType: this.isExpressDelivery,
            event:this.event
          });
    modal.present();
    modal.onDidDismiss(
      data => {
        if (data) {
          console.log('Selected Time and date is -  '+
            data.event.pickupDate +' - ' +
            data.event.pickupTime  +' - ' +
            data.event.dropOffDate + ' - ' +
            data.event.dropOffTime
 );

          this.event=data.event;
        }else{

        }
      }
    );
  }

  onOpenMap() {
    console.log("Schedule Page : onOpenMap Function Starts");
    const loader = this.loadingCtrl.create({
      content: 'Getting your Location...'
    });
    //loader.present();

    //this.getUserLocation();
    //loader.dismiss();
    //console.log('Opening Google Map - current location getting'+this.location.lat);
    const modal = this.modalCtrl.create(SetLocationPage,
      {location: this.defaultLocation, locationIsSet: this.locationIsSet});
    modal.present();
    modal.onDidDismiss(
      data => {
        if (data) {
          console.log('selected location from overlay page was - '+ data.location.lat + '--' + data.location.lng
          +'--' + data.locationIsSet);
          this.address.location = data.location;
          this.locationIsSet = true;
        }else{
          console.log('No location is selected'+this.locationIsSet);
        }
      }
    );
  }

  getUserLocation(){

    this.geolocation.getCurrentPosition()
      .then(
        location => {
         // loader.dismiss();
          this.defaultLocation.lat = location.coords.latitude;
          this.defaultLocation.lng = location.coords.longitude;
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

  onInputAddress(){
    console.log('Manually entering address');
    this.createAddressManuallyAlert().present();
  }
  private createAddressManuallyAlert() {
    return this.alertCtrl.create({
      title: 'Enter Your Address',
      inputs: [
        {
          name: 'street',
          placeholder: 'Street Address',
          value:this.address.street
        },
        {
          name: 'city',
          placeholder: 'City',
          value:this.address.city
        },
        {
          name: 'postCode',
          placeholder: 'PostCode',
          value:this.address.postCode
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
            this.locationIsSet=true;
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
