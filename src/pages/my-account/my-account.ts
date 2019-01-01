import {Component} from '@angular/core';
import {DateTime, IonicPage, NavController, NavParams} from 'ionic-angular';
import {AuthService} from "../../services/auth";
import {User} from "../../models/user";
import {UserService} from "../../services/user";

@IonicPage()
@Component({
  selector: 'page-my-account',
  templateUrl: 'my-account.html',
})
export class MyAccountPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private authService: AuthService,
              private userService: UserService) {

    console.log('MyAccountPage - constructor');
  }


  userProfile: User;

  pickUpDates = [
    new Date(),
    new Date(),
    new Date(),
    new Date()];


  colors = [
    {_id:1, name: 'Green', selected: true},
    {_id:2, name: 'Red', selected: true},
    {_id:3, name: 'Blue', selected: true},
  ];

  selectedColor = this.colors[2];


  public event = {
    pickupDate: new Date(),
    pickupTime: '',
    dropOffDate: new Date(),
    dropOffTime: ''
  };

  date1: Date;
  date2: Date;

  countries: ['AU', 'NZ'];

  zones = [
    {country: "Australia", name: "Adelaide", value: "%"},
    {country: "Australia", name: "Victoria", value: "A"},
    {country: "NZ", name: "ChristChurch", value: "ChritsChurh"},
    {country: "NZ", name: "Otago", value: "Otago"},
    {country: "NZ", name: "Wellington", value: "Wellington"}
  ];

  ionViewDidEnter() {
    console.log('MyAccountPage - IonicViewDidEnter');
    this.userProfile = this.authService.getCurrentUserProfileData();
  }


/*
  getAllDays() {
    var e = moment();
    var s = moment().subtract('months', 1);
    var a = []
    // While the updated start date is older, perform the loop.
    while(s.isBefore(e)) {
      // Update the format according to moment js documentations format().
      a.push(s.format("MMM - DD"));
      s = s.add('days', 1);
    }
    return a;
  }
*/


  ngOnInit() {

    var userUid = this.authService.getActiveUserId();
    this.userProfile = this.userService.fetchUserDetails(userUid);
    console.log('MyAccountPage - ngOnInit - The user Id is: ' + userUid);

    this.date1 = new Date();
    this.date1.setDate(this.date1.getDate());

    if (true) {
      this.date2 = new Date('MM/dd/yyyy');
      this.date2.setDate(this.date1.getDate() + 2);
    } /*else {
      this.date2 = new Date();
      this.date2.setDate(this.date1.getDate() + 1);

    }*/
  }

  RefreshPickUpDate() {
    console.log('Refresing the pickup date ' + this.event.pickupDate);
    var dayAfterTomorrow = new Date();

  }

}
