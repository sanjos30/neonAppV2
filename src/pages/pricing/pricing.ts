import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {AuthService} from "../../services/auth";
import firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-pricing',
  templateUrl: 'pricing.html',
})
export class PricingPage {

  service: string = "ironing";

  //This class calls the firebase get - as all the users are allowed to access the pricing list
  //Category items
  public categories: Array<any> = [];
  public catRef: firebase.database.Reference = firebase.database().ref('/pricing/categories');


  //Ironing items
  public ironingItems: Array<any> = [];
  public ironingItemRef: firebase.database.Reference = firebase.database().ref('/pricing/ironing');


  //Dry Cleaning items
  public dryCleanItems: Array<any> = [];
  public dryCleanItemsRef: firebase.database.Reference = firebase.database().ref('/pricing/dry-cleaning');

  //wash and iron items
  public washIronItems: Array<any> = [];
  public washIronItemsRef: firebase.database.Reference = firebase.database().ref('/pricing/wash-iron');



  constructor() {
  }

  ionViewDidEnter() {
    this.loadIroningItemPriceList();
    this.loadDryCleanItemPriceList();
    this.loadWashIronItemPriceList();
    this.loadSegmentCategories();
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

  loadDryCleanItemPriceList(){
    //Dry Cleaning
    this.dryCleanItemsRef.on('value', dryCleanItemSnapshot => {
      this.dryCleanItems = [];
      dryCleanItemSnapshot.forEach(dryCleanSnap => {
        this.dryCleanItems.push(dryCleanSnap.val());
        return false;
      });
    });
  }

  loadWashIronItemPriceList(){
    //Dry Cleaning
    this.washIronItemsRef.on('value', washIronItemSnapshot => {
      this.washIronItems = [];
      washIronItemSnapshot.forEach(washIronSnap => {
        this.washIronItems.push(washIronSnap.val());
        return false;
      });
    });
  }

  loadSegmentCategories(){
    this.catRef.on('value', catSnapshot => {
      this.categories = [];
      catSnapshot.forEach(catSnap => {
        this.categories.push(catSnap.val());
        return false;
      });
    });
    console.log(this.categories);
  }
}
