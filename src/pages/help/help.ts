import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the HelpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-help',
  templateUrl: 'help.html',
})
export class HelpPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewCanEnter(){
    console.log('ionViewCanEnter()');
  }

  ionViewDidLoad(){
    console.log('ionViewDidLoad()');
  }

  ionViewDidEnter(){
    console.log('Help Page - ionViewDidEnter()');
  }

  ionViewCanLeave(){
    console.log('ionViewCanLeave()');
  }

  ionViewWillLeave(){
    console.log('ionViewCanLeave()');
  }

  ionViewDidLeave(){
    console.log('ionViewCanLeave()');
  }

  ionViewWillUnload(){
    console.log('ionViewCanLeave()');
  }

}
