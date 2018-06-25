import { Component } from '@angular/core';
import {
  IonicPage, NavController, NavParams, LoadingController, AlertController, Modal,
  ModalController
} from 'ionic-angular';
import { NgForm } from "@angular/forms";
import {Order} from "../../models/order";
import {Customer} from "../../models/customer";
import { FormGroup, FormControl, Validators, FormArray } from "@angular/forms";
import { AuthService } from "../../services/auth";

import 'rxjs/Rx';
import firebase from "firebase";
import {HistoryPage} from "../history/history";
import {SchedulePage} from "../schedule/schedule";
import {SetOrderTimePage} from "../set-order-time/set-order-time";
import {AddItemsPage} from "../add-items/add-items";

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


  public orderItems = {

  };

  //Constructor
  constructor(public navCtrl: NavController,
              private loadingCtrl: LoadingController,
              public navParams: NavParams,
              private alertCtrl: AlertController,
              private authService: AuthService,
              private modalCtrl:ModalController) {

  }

  ngOnInit() {
    console.log("scheudle2.ts - ngOnInit Function - Inside the NG ON INIT METHOD");

    //If customer exists, set to Existing
    this.initializeForm();
  }

  ionViewDidEnter(){
    this.isUserAuthenticated=this.authService.isUserLoggedIn();
    this.newOrder = this.navParams.get('newOrder');
    if(this.isUserAuthenticated) {
      console.log('User is logged in');
      this.firebaseCustUid = this.authService.getActiveUserId();
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
    const loading = this.loadingCtrl.create({
      content: 'Signing you in...'
    });

    const value = this.custDetailsForm.value;
    //Create order in firebase

    //this.createFireBaseOrder(value.name,value.email,value.phone);
    this.customer=new Customer(value.name,value.phone,value.email,this.newOrder.address);
  /*  this.customer.name=value.name;
    this.customer.email=value.email;
    this.customer.phone=value.phone;*/
    this.newOrder.customer=this.customer;
    this.newUserSignIn();

    this.orderPlacedAlert();

  }

  private newUserSignIn(){
    const loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
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
    this.authService.getActiveUser().getIdToken()
      .then(
        (token: string) => {
          this.createNewOrder()
        }
      );
  }



  private createNewOrder() {
    console.log('scheudle2.ts - createNewOrder');
    console.log(this.newOrder.orderType + " - "
      + this.newOrder.address.lng + " - "
      + this.newOrder.address.lat + " - "
      + this.newOrder.address.street + " - "
      + this.newOrder.address.city + " - "
      + this.newOrder.address.postCode + " - "
      + this.newOrder.pickupDate + " - "
      + this.newOrder.pickupTime + " - "
      + this.newOrder.dropDate + " - "
      + this.newOrder.dropTime + " -- "
      + this.newOrder.customerId
    );

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
        buttons: [
          {
            text: 'Done',
            handler: data => {
              console.log('Refer a friend');
              this.navCtrl.popToRoot();
            }
          },
          {
            text: 'Order History',
            handler: data => {
              //this.navCtrl.remove(0);
              this.navCtrl.setRoot(SchedulePage).then(
                this.navCtrl.parent.select(1)
              );
              }
          }
        ]
      });
      prompt.present();
    }

  private initializeForm() {
    let name = this.userProfileData.name;
    let email = this.userProfileData.email;
    let phone = this.userProfileData.phone;

    this.custDetailsForm = new FormGroup({
      'name': new FormControl(name, Validators.required),
      'email': new FormControl(email, Validators.required),
      'phone': new FormControl(phone, Validators.required)
    });
  }

  addItemsToOrder(){
    const modal = this.modalCtrl.create(AddItemsPage,
      {
        order: this.newOrder,
      });
    modal.present();
    modal.onDidDismiss(
      data => {
        if (data) {
          this.orderItems = data.event;
        } else {
          //Todo DoNothing for now
        }
      }
    );
  }

}
