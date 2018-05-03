import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import {Schedule3Page} from "../schedule3/schedule3";
import { NgForm } from "@angular/forms";
import {Order} from "../../models/order";
import {OrderService} from "../../services/orders";

@IonicPage()
@Component({
  selector: 'page-schedule2',
  templateUrl: 'schedule2.html',
})
export class Schedule2Page {
  newOrder: Order;
  constructor(public navCtrl: NavController,
              private loadingCtrl: LoadingController,
              public navParams: NavParams ) {
     this.newOrder= this.navParams.get('newOrder')
      console.log ("Order is "  + this.newOrder.orderType + " - "
      + this.newOrder.address.location.lng + " - "
      + this.newOrder.address.location.lat + " - "
      + this.newOrder.address + " - "
      + this.newOrder.pickupDate + " - "
      + this.newOrder.pickupTime + " - "
      + this.newOrder.dropDate + " - "
      + this.newOrder.dropTime + " - "
      + this.newOrder.customerId
    );

  }
  goToStep3(){
    console.log('Lets go to the step 3 of ordering');
    //this.navCtrl.push(Schedule2Page, {selectedDateTime: this.order});
    this.navCtrl.push(Schedule3Page, {order:this.newOrder});
  }

  createOrder(form: NgForm){
    console.log('Customer submitted order. Lets get the job done !');
    const loading = this.loadingCtrl.create({
      content: 'Signing you in...'
    });
    //loading.present();

  }

}
