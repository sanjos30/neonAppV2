import { Component } from '@angular/core';
import { ModalController,
  ToastController,IonicPage,AlertController,LoadingController,NavController } from 'ionic-angular';
import { SetLocationPage } from "../set-location/set-location";
import { Location } from "../../models/location";
import {Order} from "../../models/order";
import { Geolocation } from '@ionic-native/geolocation';
import {Schedule2Page} from "../schedule2/schedule2";
import {Schedule3Page} from "../schedule3/schedule3";
import {SetOrderTimePage} from "../set-order-time/set-order-time";
import {OrderService} from "../../services/orders";

@IonicPage()
@Component({
  selector: 'page-schedule',
  templateUrl: 'schedule.html',
})


export class SchedulePage {

  public isExpressDelivery : boolean = false;
  orderType:string;
  public orderTypeNote: string ="MIN 2 DAYS DELIVERY";
  neonOrder:Order;
  address:string;
  location: Location = {
    lat: 24.623299562653035,
    lng: 73.40927124023438
  };

  public event = {
    pickupDate: '',
    pickupTime: '',
    dropOffDate: '',
    dropOffTime: ''
  }

  locationIsSet = false;

  constructor(private modalCtrl: ModalController,
              private alertCtrl: AlertController,
              private toastCtrl: ToastController,
              private geolocation: Geolocation,
              private orderService:OrderService,
              private loadingCtrl: LoadingController,
              private navCtrl: NavController
              ) {


  }

  placeFinalOrder(){
    console.log("Schedule Page : placeFinalOrder Function Starts");
    //this.recipesService.addRecipe(value.title, value.description, value.difficulty, ingredients);
   // this.orders.push(new Order(orderType, location,address,pickupDate,pickupTime,dropDate,dropTime,customerId));

    this.orderService.addOrder(
      this.orderType,
      this.location,
      this.address,
      this.event.pickupDate,
      this.event.pickupTime,
      this.event.dropOffDate,
      this.event.dropOffTime,
      this.getRandomStringId()
      )
    console.log("Schedule Page : placeFinalOrder Function Ends");
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
    console.log('Before going to page 2 - lets print what we are sending '+this.isExpressDelivery + this.location.lat);
    //this.navCtrl.push(Schedule2Page, {isExpressDelivery: this.isExpressDelivery, location: this.location});
    this.navCtrl.push(Schedule3Page, {
      testStr:'Hi',
      orderType: this.isExpressDelivery,
      lat: this.location.lat,
      lng:this.location.lng});
  }

  ionViewDidLoad() {
    console.log("Schedule Page : IonViewDidLoad Function");
  }
  ionViewWillLeave() {
    console.log("Schedule Page : ionViewWillLeave Function");
  }

  ionViewWillEnter(){
    console.log("Schedule Page : ionViewWillEnter Function. Getting User current location here.");
    this.getUserLocation();
    console.log("Schedule Page : ionViewWillEnter Function. The user location is - "
      + this.location.lat + ' - '  + this.location.lng);
  }

  public toggleBackgroundColor(): void {
    console.log("Schedule Page : toggleBackgroundColor Function Starts");
    if(this.isExpressDelivery) {
      this.isExpressDelivery=false;
      this.orderTypeNote="MIN 2 DAYS DELIVERY";
      this.orderType='Normal';
    } else {
      this.isExpressDelivery=true;
      this.orderTypeNote="NEXT DAY DELIVERY";
      this.orderType='Express';
    }
    console.log("Schedule Page : toggleBackgroundColor Function Ends. OrderType from model is "
                + this.orderType);
  }

  selectOrderDateTime() {
    const modal = this.modalCtrl.create(SetOrderTimePage,
      {orderType: this.isExpressDelivery});
    modal.present();
    modal.onDidDismiss(
      data => {
        if (data) {
          console.log('Selected Time AND Date -  '+
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
      {location: this.location, locationIsSet: this.locationIsSet});
    modal.present();
    modal.onDidDismiss(
      data => {
        if (data) {
          console.log('selected location from overlay page was - '+ data.location.lat + '--' + data.location.lng
          +'--' + data.locationIsSet);
          this.location = data.location;
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
          this.location.lat = location.coords.latitude;
          this.location.lng = location.coords.longitude;
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
          name: 'address',
          placeholder: 'Street Address'
        },
        {
          name: 'city',
          placeholder: 'City'
        },
        {
          name: 'pincode',
          placeholder: 'Pincode'
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
            if ((data.address.trim() == '' || data.address == null)) {
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
            //(<FormArray>this.recipeForm.get('ingredients'))
            //  .push(new FormControl(data.name, Validators.required));
            const toast = this.toastCtrl.create({
              message: 'Address added!',
              duration: 1500,
              position: 'bottom'
            });
            this.locationIsSet=true;
            console.log('location selected manually in schedule page ' +this.locationIsSet);
            toast.present();
          }
        }
      ]
    });
  }
}
