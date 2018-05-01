import { Component,OnInit } from '@angular/core';
import {
  AlertController, IonicPage, LoadingController, ModalController, NavController, NavParams,
  ToastController
} from 'ionic-angular';
import {SetLocationPage} from "../set-location/set-location";
import {Geolocation} from "@ionic-native/geolocation";
import {Order} from "../../models/order";
import {SetOrderTimePage} from "../set-order-time/set-order-time";
import {Location} from "../../models/location";

@IonicPage()
@Component({
  selector: 'page-schedule3',
  templateUrl: 'schedule3.html',
})
export class Schedule3Page {

  public isExpressDelivery : boolean = false;
  orderType: string;
  lat:string;lng:string;

  constructor(private modalCtrl: ModalController,
              public navParams: NavParams,
              private toastCtrl: ToastController,
              private geolocation: Geolocation,
              private loadingCtrl: LoadingController,
              private navCtrl: NavController) {



  }

  ngOnInit() {
    this.lat=this.navParams.get('lat');
    this.lng=this.navParams.get('lng');
    this.orderType=this.navParams.get('orderType');
    console.log('Test string from previous page was '+ this.navParams.get('testStr'));
    console.log('Latitude' + this.lat);
    console.log('Longitude' + this.lng);
    console.log('OrderType' + this.orderType);
  }
  public order = Order;
  ionViewDidLoad() {
    console.log('ionViewDidLoad Schedule3Page' + this.orderType);
  }

  os: string;

  onOpenMap() {
    const modal = this.modalCtrl.create(SetOrderTimePage,
      {orderType: this.orderType});
    modal.present();
    modal.onDidDismiss(
      data => {
        if (data) {
          console.log('selected location '+ data.event.dropoffTime);
        }else{

        }
      }
    );
  }
}
