import { Component } from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {AuthService} from "../../services/auth";
import {Order} from "../../models/order";

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
              private authService: AuthService) { }

  ngOnInit() {
    console.log("Inside the NG ON INIT METHOD");
    //this.previousOrders=this.authService.getPreviousOrders(this.firebaseCustUid);
    /*var orders = this.authService.getPreviousOrders(this.firebaseCustUid);
    orders.on('value', itemSnapshot => {
      this.previousOrders = [];
      itemSnapshot.forEach( itemSnap => {
        this.previousOrders.push(itemSnap.val());
        return false;
      });
    });

    console.log(orders + 'getting from firebase');*/
  }

   ionViewDidEnter(){
     //this.previousOrders=this.authService.getPreviousOrders(this.firebaseCustUid);
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



  itemSelected(item: string) {
    console.log("Selected Item", item);
  }
}
