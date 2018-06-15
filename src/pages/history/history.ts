import { Component } from '@angular/core';
import {AlertController, IonicPage, LoadingController, ModalController, NavController, NavParams} from 'ionic-angular';
import {AuthService} from "../../services/auth";
import {Order} from "../../models/order";
import {SetOrderTimePage} from "../set-order-time/set-order-time";
import {ViewOrderPage} from "../view-order/view-order";

@IonicPage()
@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage {

  firebaseCustUid:string;
  previousOrders:any;

  isUserAuthenticated: boolean = false;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private authService: AuthService,
              private modalCtrl:ModalController) { }

   ionViewDidEnter(){
     this.isUserAuthenticated = this.authService.isUserLoggedIn();
     this.firebaseCustUid=this.authService.getActiveUserId();
     console.log('History Page - ionViewDidEnter(). Active user is - ' + this.firebaseCustUid);
     var orders = this.authService.getPreviousOrders(this.firebaseCustUid);
     orders.on('value', itemSnapshot => {
       this.previousOrders = [];
       itemSnapshot.forEach( itemSnap => {
         this.previousOrders.push(itemSnap.val());
         return false;
       });
     });
   }

  itemSelected(userSelectedOrder: Order) {
    console.log("Selected Order is");
    console.log(userSelectedOrder);
    const modal = this.modalCtrl.create(ViewOrderPage,
      {
        order: userSelectedOrder,
      });
    modal.present();
    modal.onDidDismiss(
      data => {
        if (data) {
          //this.event = data.event;
          console.log('Back to the order history page');
        } else {
          console.log('Something wrong - Back to the order history page');
          //Todo DoNothing for now
        }
      }
    );
  }
}
