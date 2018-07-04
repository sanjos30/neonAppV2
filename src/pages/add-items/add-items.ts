import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import firebase from "firebase";
import {Items} from "../../models/items";

/**
 * Generated class for the AddItemsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-items',
  templateUrl: 'add-items.html',
})
export class AddItemsPage {

  quickOrder: [
    { itemName: 'Shirt', itemPrice: 3.50, serviceType: 'Ironing', quantity: 0, isActive: true },
    { itemName: 'Pant', itemPrice: 2.50, serviceType: 'Ironing', quantity: 0, isActive: true },
    { itemName: 'Coat', itemPrice: 1.50, serviceType: 'Ironing', quantity: 0, isActive: true },
    { itemName: 'Jeans', itemPrice: 2.50, serviceType: 'Ironing', quantity: 0, isActive: true }
    ];

  orderItems: Items;

  itemList: Array<Items> = new Array<Items>();
  //Dry Cleaning items
  public dryCleanItems: Array<any> = [];
  public dryCleanItemsRef: firebase.database.Reference = firebase.database().ref('/pricing/dry-cleaning');

  //Ironing items
  public ironingItems: Array<any> = [];
  public ironingItemRef: firebase.database.Reference = firebase.database().ref('/pricing/ironing');

  //wash and iron items
  public washIronItems: Array<any> = [];
  public washIronItemsRef: firebase.database.Reference = firebase.database().ref('/pricing/wash-iron');

  qty: any;


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController) {
    this.qty = 0;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddItemsPage');
  }

  ionViewDidEnter() {
    this.loadDryCleanItemPriceList();
    this.loadIroningItemPriceList();
  }

  onAbort() {
    console.log('Aborted');
    this.viewCtrl.dismiss();
  }

  onConfirm() {
    console.log('onConfirm');
    this.viewCtrl.dismiss({});
  }

  // increment product qty
  incrementQty(selectedItem: Items) {
    console.log(this.qty + 1);
    console.log(selectedItem);
    this.itemList.push(selectedItem);
    this.orderItems.quantity += 1;
  }

  // decrement product qty
  decrementQty(ironItem: Array<any>) {
    console.log(ironItem);
    if (this.qty - 1 < 1) {
      this.qty = 1
      console.log('1->' + this.qty);
    } else {
      this.qty -= 1;
      console.log('2->' + this.qty);
    }
  }

  loadIroningItemPriceList() {
    this.ironingItemRef.on('value', irongingItemSnapshot => {
      this.ironingItems = [];
      irongingItemSnapshot.forEach(ironingItemSnap => {
        this.ironingItems.push(ironingItemSnap.val());

        return false;
      });
    });
  }

  loadDryCleanItemPriceList() {
    //Dry Cleaning
    this.dryCleanItemsRef.on('value', dryCleanItemSnapshot => {
      this.dryCleanItems = [];
      dryCleanItemSnapshot.forEach(dryCleanSnap => {
        this.dryCleanItems.push(dryCleanSnap.val());
        return false;
      });
    });
  }

  loadWashIronItemPriceList() {
    //Dry Cleaning
    this.washIronItemsRef.on('value', washIronItemSnapshot => {
      this.washIronItems = [];
      washIronItemSnapshot.forEach(washIronSnap => {
        this.washIronItems.push(washIronSnap.val());
        return false;
      });
    });
  }

}
