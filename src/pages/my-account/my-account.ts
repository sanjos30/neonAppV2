import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AuthService} from "../../services/auth";
import {User} from "../../models/user";
import {UserService} from "../../services/user";

@IonicPage()
@Component({
  selector: 'page-my-account',
  templateUrl: 'my-account.html',
})
export class MyAccountPage {

  userProfile:User;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private authService: AuthService,
              private userService:UserService
              ) {

    console.log('MyAccountPage - constructor');
  }

  ionViewDidEnter() {
    console.log('MyAccountPage - IonicViewDidEnter');
    this.userProfile=this.authService.getCurrentUserProfileData();
  }

  ngOnInit() {

    var userUid = this.authService.getActiveUserId();
    this.userProfile=this.userService.fetchUserDetails(userUid);
    console.log('MyAccountPage - ngOnInit - The user Id is: '+ userUid);
  }

}
