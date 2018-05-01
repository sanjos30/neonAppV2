import { Component } from '@angular/core';
import {IonicPage, AlertController, NavParams, ViewController} from 'ionic-angular';
import {Order} from "../../models/order";
import { DatePicker } from '@ionic-native/date-picker';

@IonicPage()
@Component({
  selector: 'page-set-order-time',
  templateUrl: 'set-order-time.html',
})
export class SetOrderTimePage {

  orderType: boolean;
  order:Order;
  alertText:string;
  public event = {
    pickupDate: null,
    pickupTime: '09:00',
    dropOffDate: null,
    dropOffTime: '09:00'
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Set Order Page');
    this.alertText='';
    this.event.pickupDate=null;
    this.event.dropOffDate=null;
  }

  constructor(public navParams: NavParams,
              private viewCtrl: ViewController,
              private alertCtrl: AlertController) {
    this.orderType=this.navParams.get('isExpressDelivery');
    this.alertText='';
    console.log('SetLocationPage: Selected Order Type '+ this.orderType);
  }


  onConfirm() {
    console.log('pickup ' + this.event.pickupDate + ' - ' + this.event.pickupTime+' - '+
    this.event.dropOffDate + ' - ' + this.event.dropOffTime + ' - ' + this.alertText);

    if(this.event.pickupDate==null){
      this.alertText='Please select order pickup date';
    }else if(this.event.pickupTime.trim().length === 0){
      this.alertText='Please select order pickup time';
    }else if(this.event.dropOffDate==null){
      this.alertText='Please select order dropOff date';
    }else if(this.event.dropOffTime.trim().length === 0){
      this.alertText='Please select order dropOff time';
    }
    if(this.alertText.trim().length > 3){
      const alert = this.alertCtrl.create({
        title: 'A selection is required.',
        message: this.alertText,
        buttons: ['Ok']
      });
      alert.present();
      this.alertText='';
    }else{
    console.log('Confirmed');
      this.alertText='';
    this.viewCtrl.dismiss({event: this.event});
    }
  }

  onAbort() {
    console.log('Aborted');
    this.viewCtrl.dismiss();
  }

}
