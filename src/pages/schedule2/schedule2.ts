import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, LoadingController, AlertController} from 'ionic-angular';
import {Schedule3Page} from "../schedule3/schedule3";
import { NgForm } from "@angular/forms";
import {Order} from "../../models/order";
import {Customer} from "../../models/customer";
import {OrderService} from "../../services/orders";
import { FormGroup, FormControl, Validators, FormArray } from "@angular/forms";
import { AuthService } from "../../services/auth";
import { Http, Response } from "@angular/http";
import 'rxjs/Rx';

@IonicPage()
@Component({
  selector: 'page-schedule2',
  templateUrl: 'schedule2.html',
})
export class Schedule2Page {
  newOrder: Order;
  custDetailsForm: FormGroup;
  customer: Customer;
  mode = 'New'; //existing for returning customers
  constructor(public navCtrl: NavController,
              private loadingCtrl: LoadingController,
              public navParams: NavParams,
              private alertCtrl: AlertController,
              private authService: AuthService,
              private http: Http) {
    this.newOrder = this.navParams.get('newOrder');
    console.log("Order is " + this.newOrder.orderType + " - "
      + this.newOrder.address.location.lng + " - "
      + this.newOrder.address.location.lat + " - "
      + this.newOrder.address + " - "
      + this.newOrder.pickupDate + " - "
      + this.newOrder.pickupTime + " - "
      + this.newOrder.dropDate + " - "
      + this.newOrder.dropTime + " - "
      + this.newOrder.customerId
    );

  }

  ngOnInit() {
    console.log("Inside the NG ON INIT METHOD");
    //If customer exists, set to Existing
    this.mode = this.navParams.get('mode');
    if (this.mode == 'Existing') {
      this.customer = this.navParams.get('customer');
    }
    this.initializeForm();
  }

  goToStep3() {
    console.log('Lets go to the step 3 of ordering');
    //this.navCtrl.push(Schedule2Page, {selectedDateTime: this.order});
    this.navCtrl.push(Schedule3Page, {order: this.newOrder});
  }

  createOrder(form: NgForm) {
    console.log('Customer submitted the form. Lets get the backend job done !');

    const loading = this.loadingCtrl.create({
      content: 'Signing you in...'
    });

    console.log("Submitting Order. Details are - " + this.newOrder.orderType + " - "
      + this.newOrder.address.location.lng + " - "
      + this.newOrder.address.location.lat + " - "
      + this.newOrder.address.street + ", " + this.newOrder.address.city + ", " + this.newOrder.address.postCode + " - "
      + this.newOrder.pickupDate + " - "
      + this.newOrder.pickupTime + " - "
      + this.newOrder.dropDate + " - "
      + this.newOrder.dropTime + " - "
      + this.newOrder.customerId
    );
    //loading.present();

    const value = this.custDetailsForm.value;
    //Create order in firebase

    this.createFireBaseOrder();
    console.log('Name: ' + value.name + " Email: " + value.email + " Phone: " + value.phone);
    this.orderPlacedAlert();

  }

  private createFireBaseOrder() {
    const loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.authService.getActiveUser().getIdToken()
      .then(
        (token: string) => {
          this.storeList(token)
            .subscribe(
              () => loading.dismiss(),
              error => {
                loading.dismiss();
                this.handleError(error.json().error);
              }
            );
        }
      );
  }

  private storeList(token: string) {
    const userId = this.authService.getActiveUser().uid;
    return this.http
      .put('https://neonappservertest.firebaseio.com/' + userId + '/shopping-list.json?auth=' + token, this.newOrder)
      .map((response: Response) => {
        return response.json();
      });
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
            text: 'Refer a friend',
            handler: data => {
              console.log('Refer a friend');
            }
          },
          {
            text: 'View past orders',
            handler: data => {
              console.log('Route to past orders page.');
            }
          }
        ]
      });
      prompt.present();
    }

  private initializeForm() {
    let name = null;
    let email = null;
    let phone = null;

    if (this.mode == 'Existing') {
      name = this.customer.name;
      email = this.customer.email;
      phone = this.customer.phone;
    }

    this.custDetailsForm = new FormGroup({
      'name': new FormControl(name, Validators.required),
      'email': new FormControl(email, Validators.required),
      'phone': new FormControl(phone, Validators.required)
    });
  }

}
