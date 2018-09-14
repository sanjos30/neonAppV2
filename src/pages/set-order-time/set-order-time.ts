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

  mondays:Date[];


  public event = {
    pickupDate: new Date(),
    pickupTime: '',
    dropOffDate: '',
    dropOffTime: ''
  }

  //The default date selected from device.
  public eventList = [
    {
      pickupDate: '2018-09-12',
      pickupTime: '10:30',
      dropOffDate: '2018-05-04',
      dropOffTime: '10:45'
    },
    {
      pickupDate: '2018-05-04',
      pickupTime: '10:30',
      dropOffDate: '2018-05-04',
      dropOffTime: '10:45'
    },
    {
      pickupDate: '2018-05-04',
      pickupTime: '10:30',
      dropOffDate: '2018-05-04',
      dropOffTime: '10:45'
    }
  ]

  ionViewDidLoad() {
    console.log('ionViewDidLoad Select Order Date and Time');
    this.alertText='';
    this.event.dropOffDate='05-05-2018';
    this.mondays=this.loadMonday();


  }

  loadMonday(){
    var mondaysLocal = [];
    var m=1000*60*60*24,
      now=new Date(),
      nowTime=now.getTime(),
      mondayOffSet=7-(now.getDay()-1);

    for(var i=0;i<8;i++){
      mondaysLocal.push(new Date(nowTime+((m*mondayOffSet) + (m*7*i))));
    };

    return mondaysLocal;
  }

  constructor(public navParams: NavParams,
              private viewCtrl: ViewController,
              private alertCtrl: AlertController) {
    console.log('Set Order Date and Time Page Constructor');
    this.orderType=this.navParams.get('isExpressDelivery');
    this.event=this.navParams.get('event');

    this.alertText='';
    console.log('SetLocationPage: Selected Order Type '+ this.event.dropOffDate+this.event.dropOffTime
                +this.event.pickupDate+this.event.pickupTime);
  }


  onConfirm() {
    console.log('pickup ' + this.event.pickupDate + ' - ' + this.event.pickupTime+' - '+
    this.event.dropOffDate + ' - ' + this.event.dropOffTime + ' - ' + this.alertText);

    console.log(new Date().toLocaleDateString());
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
