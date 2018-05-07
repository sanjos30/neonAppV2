import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import {Schedule3Page} from "../schedule3/schedule3";
import { NgForm } from "@angular/forms";
import {Order} from "../../models/order";
import {Customer} from "../../models/customer";
import {OrderService} from "../../services/orders";
import { FormGroup, FormControl, Validators, FormArray } from "@angular/forms";

@IonicPage()
@Component({
  selector: 'page-schedule2',
  templateUrl: 'schedule2.html',
})
export class Schedule2Page {
  newOrder: Order;
  custDetailsForm: FormGroup;
  customer:Customer;
  mode = 'New'; //existing for returning customers
  constructor(public navCtrl: NavController,
              private loadingCtrl: LoadingController,
              public navParams: NavParams ) {
     this.newOrder= this.navParams.get('newOrder');
      console.log ("Order is "  + this.newOrder.orderType + " - "
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

  goToStep3(){
    console.log('Lets go to the step 3 of ordering');
    //this.navCtrl.push(Schedule2Page, {selectedDateTime: this.order});
    this.navCtrl.push(Schedule3Page, {order:this.newOrder});
  }

  createOrder(form: NgForm){
    console.log('Customer submitted order. Lets get the job done !');
    const loading = this.loadingCtrl.create({
      content: 'Signing you in...'
    });

    console.log ("Submitting Order. Details are - "  + this.newOrder.orderType + " - "
      + this.newOrder.address.location.lng + " - "
      + this.newOrder.address.location.lat + " - "
      + this.newOrder.address.street + ", " + this.newOrder.address.city+", " + this.newOrder.address.postCode+ " - "
      + this.newOrder.pickupDate + " - "
      + this.newOrder.pickupTime + " - "
      + this.newOrder.dropDate + " - "
      + this.newOrder.dropTime + " - "
      + this.newOrder.customerId
    );
    //loading.present();

    const value = this.custDetailsForm.value;

    console.log('Name: '+value.name + " Email: "+value.email + " Phone:" + value.phone);

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
