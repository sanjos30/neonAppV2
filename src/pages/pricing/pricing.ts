import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-pricing',
  templateUrl: 'pricing.html',
})
export class PricingPage {

  pet: string = "Ironing";


  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidEnter(){
    console.log('Pricing Page - ionViewDidEnter()');
  }

}
