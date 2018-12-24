import { Component } from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import Firebase from 'firebase';
import * as firebase from "firebase";
import {SchedulePage} from "../schedule/schedule";
import {Storage} from "@ionic/storage";

@IonicPage()
@Component({
  selector: 'page-otp-verify',
  templateUrl: 'otp-verify.html',
})
export class OtpVerifyPage {

  verification_id: any;
  otp:string='';

  constructor(public navCtrl: NavController,public navParams: NavParams,
              private loadingCtrl: LoadingController,
              private alertCtrl: AlertController,private toastCtrl: ToastController,
              private storage: Storage) {
    this.verification_id = this.navParams.get('verificationid');
  }

  verifyOTP() {
    //this.api.presentLoader('Verifying your OTP');
    const loader = this.loadingCtrl.create({
      content: 'Verifying your OTP'
    });
    loader.present();

    var signInCredential = firebase.auth.PhoneAuthProvider.credential(this.verification_id,this.otp);
    firebase.auth().signInWithCredential(signInCredential).then(()=>{
      console.log(signInCredential);
      loader.dismiss();
      setTimeout(()=>{

        const toast = this.toastCtrl.create({
          message: 'OTP Verified',
          duration: 2000
        });
        toast.present();

        //this.api.presentToast('OTP Verified');
      },2000);



      this.storage.set('isRegistered',true);
      this.navCtrl.setRoot(SchedulePage);
    }).catch(()=>{
      loader.dismiss();
      const toast = this.toastCtrl.create({
        message: 'Failed to verify OTP',
        duration: 1500
      });
      toast.present();
      //this.api.dismissLoader();
      //this.api.presentSimplesAlert('OTP Failed','Failed to verify OTP');
      console.log('Erorr in OTP');
    });

  }

}
