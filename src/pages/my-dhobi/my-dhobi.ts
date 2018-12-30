import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AuthService} from "../../services/auth";
import {UserService} from "../../services/user";


@IonicPage()
@Component({
  selector: 'page-my-dhobi',
  templateUrl: 'my-dhobi.html',
})
export class MyDhobiPage {
  items: any = [];
  itemExpandHeight: number = 100;
  chooseTypeClicked:boolean=false;

  expanderRightSideSign:String='+';


  constructor(public navCtrl: NavController) {
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad MyDhobiPage');

  }

  ionViewDidEnter(){
    console.log('ionViewDidEnter MyDhobiPage');
  }

  toggle(){
    console.log('Toggling');
    this.chooseTypeClicked = !this.chooseTypeClicked;
    this.expanderRightSideSign = this.chooseTypeClicked?'-':'+';
  }


  expandItem(item){

    this.items.map((listItem) => {

      if(item == listItem){
        listItem.expanded = !listItem.expanded;
      } else {
        listItem.expanded = false;
      }

      return listItem;

    });

  }
}
