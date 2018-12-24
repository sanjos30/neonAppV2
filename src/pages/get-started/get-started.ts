import { Component } from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {AuthService} from "../../services/auth";
import Firebase from 'firebase';
import * as firebase from "firebase";
import {OtpVerifyPage} from "../otp-verify/otp-verify";
import {Storage} from "@ionic/storage";
import { FormBuilder,FormGroup } from "@angular/forms";
import { PhoneValidator } from  '../../validators/phone';


@IonicPage()
@Component({
  selector: 'page-get-started',
  templateUrl: 'get-started.html',
})
export class GetStartedPage {

  slideOneForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private authService: AuthService,
              private loadingCtrl: LoadingController,
              public alertCtrl: AlertController,public toastCtrl: ToastController,
              private storage: Storage,
              public formBuilder: FormBuilder) {

    this.slideOneForm = formBuilder.group({
      phone: ['', PhoneValidator.isValid]
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GetStartedPage');

  }

  public recaptchaVerifier: firebase.auth.RecaptchaVerifier;
  verificationId: any = '';
  phoneNumber: any = '';
  countryCode: any = '+61';
  result: any;
  alertText:any;


  signIn() {

    //Validate the input
console.log('The form is valid: ' + this.slideOneForm.valid + " and value of form is: " + this.phoneNumber);

    if(this.phoneNumber == null){
      const alert = this.alertCtrl.create({
        title: 'Enter a valid phone number!',
        message: 'Phone number is invalid.',
        buttons: ['Ok']
      });
      alert.present();
    }else {


//step 1 - show loader
      const loader = this.loadingCtrl.create({
        content: 'Sending OTP to your mobile number.'
      });
      loader.present();
//step 2 - get it
      let phoneNumber2 = this.countryCode + this.phoneNumber;

      console.log('user mumber is ' + phoneNumber2);

      this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
        'size': 'invisible',
        'callback': function (response) {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          //onSignInSubmit();
          console.log('User can sign-in now' + response);

        }
      });


      firebase.auth().signInWithPhoneNumber(phoneNumber2, this.recaptchaVerifier)
        .then(confirmationResult => {
          // SMS sent. Prompt user to type the code from the message, then sign the
          // user in with confirmationResult.confirm(code).
          console.log('logged in');
          loader.dismiss();
          this.navCtrl.push(OtpVerifyPage, {verificationid: confirmationResult.verificationId});
        })
        .catch(function (error) {
          loader.dismiss();
          const toast = this.toastCtrl.create({
            message: 'Failed to send OTP. Try again',
            duration: 2500
          });
          toast.present();

          console.error("SMS not sent", error);
        });

    }
  }
}
