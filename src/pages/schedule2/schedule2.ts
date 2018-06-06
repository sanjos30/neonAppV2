import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, LoadingController, AlertController} from 'ionic-angular';
import { NgForm } from "@angular/forms";
import {Order} from "../../models/order";
import {Customer} from "../../models/customer";
import { FormGroup, FormControl, Validators, FormArray } from "@angular/forms";
import { AuthService } from "../../services/auth";

import 'rxjs/Rx';
import firebase from "firebase";
import {HistoryPage} from "../history/history";

@IonicPage()
@Component({
  selector: 'page-schedule2',
  templateUrl: 'schedule2.html',
})
export class Schedule2Page {
  newOrder: Order;
  custDetailsForm: FormGroup;
  customer: Customer;
  isUserAuthenticated = false; //existing for returning customers
  firebaseCustUid:string;

  address: any = {
    street: 'Your Street Address',
    city: 'Your City',
    postCode: 'Postcode',
    lat: 24.623299562653035,
    lng: 73.40927124023438
    //location: this.defaultLocation
  };

  public userProfileData = {
    name: '',
    phone: '',
    email: '',
    address: this.address
  };


  //Constructor
  constructor(public navCtrl: NavController,
              private loadingCtrl: LoadingController,
              public navParams: NavParams,
              private alertCtrl: AlertController,
              private authService: AuthService) {

  }

  ngOnInit() {
    console.log("Inside the NG ON INIT METHOD");
    //If customer exists, set to Existing
    this.initializeForm();
  }

  ionViewDidEnter(){
    this.isUserAuthenticated=this.authService.isUserLoggedIn();
    console.log(('User login info from schedule2 page is '+this.isUserAuthenticated));
    this.newOrder = this.navParams.get('newOrder');
    if(this.isUserAuthenticated) {
      console.log('User is logged in');
      this.firebaseCustUid = this.authService.getActiveUserId();
      console.log('Schedule2 Page - ionViewDidEnter(). Active user is - ' + this.firebaseCustUid);
      var userProfileDataFirebase = this.authService.getCurrentUserDetails(this.firebaseCustUid);
      //For users who are registered but haven't ordered yet or their first order with us failed.
      if(userProfileDataFirebase!=null){
        console.log(userProfileDataFirebase);
        userProfileDataFirebase.on('value', userSnapshot => {
          this.userProfileData = userSnapshot.val();
        });
      }

    }else{
      console.log('User is not logged in');
    }
  }

  createOrder(form: NgForm) {
    console.log('Customer submitted the form. Lets get the backend job done !');

    const loading = this.loadingCtrl.create({
      content: 'Signing you in...'
    });

    const value = this.custDetailsForm.value;
    //Create order in firebase

    //this.createFireBaseOrder(value.name,value.email,value.phone);
    console.log('Name: ' + value.name +
      " Email: " + value.email +
      " Phone: " + value.phone +
      " OrderType" + this.newOrder.orderType +
      " City " + this.newOrder.address.city);

    this.customer=new Customer(value.name,value.phone,value.email,this.newOrder.address);
  /*  this.customer.name=value.name;
    this.customer.email=value.email;
    this.customer.phone=value.phone;*/
    this.newOrder.customer=this.customer;
    this.newUserSignIn();

    console.log('Name: ' + value.name +
                " Email: " + value.email +
                " Phone: " + value.phone);
    this.orderPlacedAlert();

  }

  private newUserSignIn(){
    const loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    console.log('signing in started');
    this.authService.signinAnonymous()
      .then(data => {
        this.firebaseCustUid = firebase.auth().currentUser.uid;
        this.createFireBaseOrder();
        loading.dismiss();
      })
      .catch(error => {
        loading.dismiss();
        const alert = this.alertCtrl.create({
          title: 'Signin failed!',
          message: error.message,
          buttons: ['Ok']
        });
        alert.present();
      });
    }

  private createFireBaseOrder() {
    console.log('before creating fb order');
    this.authService.getActiveUser().getIdToken()
      .then(
        (token: string) => {
          this.createNewOrder()
        }
      );
  }



  private createNewOrder() {
    // Get a key for a new Post.
    var newOrderKey = firebase.database().ref().child('orders').push().key;

    // Write the new post's data simultaneously in the posts list and the user's post list.
    var updates = {};
    console.log(this.newOrder);
    updates['/orders/' + newOrderKey] = this.newOrder;
    updates['/user-orders/' + this.firebaseCustUid + '/' + newOrderKey] = this.newOrder;
    updates['/users/' + this.firebaseCustUid] = this.newOrder.customer;
    return firebase.database().ref().update(updates);
  }


  private handleError(errorMessage: string) {
    const alert = this.alertCtrl.create({
      title: 'An error occurred!',
      message: errorMessage,
      buttons: ['Ok']
    });
    alert.present();
  }

  private orderPlacedAlert(){
      let prompt = this.alertCtrl.create({
        title: 'Order Placed Successfully',
        message: "Thanks for placing an order with us",
/*        inputs: [
          {
            name: 'title',
            placeholder: 'Title'
          },
        ],*/
        buttons: [
          {
            text: 'Done',
            handler: data => {
              console.log('Refer a friend');
              this.navCtrl.popToRoot();
              //this.navCtrl.push(ProfilePage, {firebaseCustUid:this.firebaseCustUid});
            }
          },
          {
            text: 'View past orders',
            handler: data => {
              console.log('Route to past orders page.');
              this.navCtrl.remove(this.navCtrl.getPrevious().index);
              this.navCtrl.push(HistoryPage).then(
              this.navCtrl.parent.select(1));

            }
          }
        ]
      });
      prompt.present();
    }

  private initializeForm() {
    console.log('In the initialize form method on schedule2 page');
    let name = null;
    let email = null;
    let phone = null;

    name = this.userProfileData.name;
    email = this.userProfileData.email;
    phone = this.userProfileData.phone;

/*    if (this.isUserAuthenticated) {
      console.log('user authenticated ' + this.customer.name);
      name = this.customer.name;
      email = this.customer.email;
      phone = this.customer.phone;
    }else {
      console.log('New User');
      name = '';
      email = '';
      phone = '';
    }*/

    this.custDetailsForm = new FormGroup({
      'name': new FormControl(name, Validators.required),
      'email': new FormControl(email, Validators.required),
      'phone': new FormControl(phone, Validators.required)
    });
  }

  private createNewOrderUsingCustomerModel(token:string,uid:string){
    /*firebase.database().ref('users/' + token).set({
      orderType : this.newOrder.orderType
    });*/
    //firebase.database().ref('users').push(this.newOrder);
    firebase.database().ref('users/'+uid).set(this.newOrder);
  }
}
