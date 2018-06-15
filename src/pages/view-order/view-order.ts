import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {Order} from "../../models/order";
import {SchedulePage} from "../schedule/schedule";
import {HistoryPage} from "../history/history";

@IonicPage()
@Component({
  selector: 'page-view-order',
  templateUrl: 'view-order.html',
})
export class ViewOrderPage {

  mode='view';
  selectedOrder:Order;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private viewCtrl: ViewController) {
  }

  ngOnInit(){
    this.mode=this.navParams.get('mode');
    if(this.mode=='edit'){
      console.log('The order is allowed for cancelling');
    }
    this.selectedOrder = this.navParams.get('order');
  }

  goToOrderHistoryPage(){
    this.viewCtrl.dismiss();
  }
}
