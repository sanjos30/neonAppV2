import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import {Schedule3Page} from "../schedule3/schedule3";
import { NgForm } from "@angular/forms";
import {Order} from "../../models/order";

@IonicPage()
@Component({
  selector: 'page-schedule2',
  templateUrl: 'schedule2.html',
})
export class Schedule2Page {

  constructor(public navCtrl: NavController,
              private loadingCtrl: LoadingController,
              public navParams: NavParams) {
  }

  public order = Order;

  goToStep3(){
    console.log('Lets go to the step 3 of ordering');
    //this.navCtrl.push(Schedule2Page, {selectedDateTime: this.order});
    this.navCtrl.push(Schedule3Page, {order:this.order});
  }

  createOrder(form: NgForm){
    console.log('Customer submitted order. Lets get the job done !');
    const loading = this.loadingCtrl.create({
      content: 'Signing you in...'
    });
    loading.present();

  }

}
