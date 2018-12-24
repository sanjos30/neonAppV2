import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {TabsPage} from "../pages/tabs/tabs";
import firebase from "firebase";
import { Storage } from '@ionic/storage';


import { LoadingController } from 'ionic-angular';
import {AuthService} from "../services/auth";
import {GetStartedPage} from "../pages/get-started/get-started";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  //rootPage:any = TabsPage;
  rootPage:any;
  loader: any;

  constructor(platform: Platform, statusBar: StatusBar, private storage: Storage, splashScreen: SplashScreen,
              public loadingCtrl: LoadingController
              ) {

    //this.presentLoading();


    firebase.initializeApp({
      apiKey: "AIzaSyC4b_qyg3xGPWXEdH4B-VLCRu1ClbjNBwk",
      authDomain: "neonappservertest.firebaseapp.com",
      databaseURL: "https://neonappservertest.firebaseio.com",
    });
/*    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log('user authenticated.');
      } else {
        console.log('user unauthenticated.');
      }
    });*/


    platform.ready().then(() => {

      // Get the status from the storage
      this.storage.get('isRegistered').then(isRegistered => {
        this.rootPage = isRegistered ? TabsPage : GetStartedPage;
        //splashScreen.hide();
        statusBar.styleDefault();
        splashScreen.hide();
      });


    // Okay, so the platform is ready and our plugins are available.
    // Here you can do any higher level native things you might need.
   // statusBar.styleDefault();
    //splashScreen.hide();

    /*
      //If the user is already registered, no need to show the get-started page again

      console.log('The user is registered :' + storage.get('isRegistered').hasOwnProperty('isRegistered'));

      storage.get('isRegistered').then((result) => {


        if(result.hasOwnProperty('isRegistered')){
          this.rootPage = TabsPage;
        } else {
          this.rootPage = GetStartedPage;
        }

        this.loader.dismiss();
      });

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      */
    });
  }


  presentLoading() {

    this.loader = this.loadingCtrl.create({
      content: "Authenticating..."
    });

    this.loader.present();

  }

}

