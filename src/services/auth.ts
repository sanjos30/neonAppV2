import firebase from 'firebase';

import {Customer} from "../models/customer";
import {User} from "../models/user";

export class AuthService {

  private customer: Customer;
  private userUid: string = null;
  private productList: any = null;

  private address: any = {
    street: 'Your Street Address',
    city: 'Your City',
    postCode: 'Postcode',
    lat: 24.623299562653035,
    lng: 73.40927124023438
    //location: this.defaultLocation
  };

  private userProfileData : User = new User(false,'', '','',this.address,null);

  signup(email: string, password: string) {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
  }

  signin(email: string, password: string) {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  signinAnonymous() {
    return firebase.auth().signInAnonymously();
  }

  logout() {
    firebase.auth().signOut();
  }

  getActiveUser() {
    return firebase.auth().currentUser;
  }

  getUserPhone(){
    return this.getActiveUser().phoneNumber;
  }

  isUserLoggedIn() {
    var activeUserId = this.getActiveUserId();
    console.log('The phone number of the user is :' + this.getActiveUser().phoneNumber);
    if (activeUserId == null || activeUserId == '') {
      console.log('auth.ts isUserLoggedIn Returning False');
      return false;
    }
    else {
      console.log('auth.ts isUserLoggedIn Returning True');
      return true;
    }
  }

  getActiveUserId() {
    if (firebase.auth().currentUser != null) {
      this.userUid = firebase.auth().currentUser.uid;
      return this.userUid;
    }
    else
      return this.userUid;
  }

  getUserName(){
     var userName:string;
      if (firebase.auth().currentUser != null) {
        userName = firebase.auth().currentUser.displayName;
      }

        return userName;
  }
  getPreviousOrders(uid: string) {
    return firebase.database().ref('user-orders/' + uid);
  }

  getCurrentUserDetails(uid: string) {
    return firebase.database().ref('users/' + uid);
  }

  getActiveUserProfile() {
    var activeUserId = this.getActiveUserId();
    var userProfileDataFirebase = this.getCurrentUserDetails(activeUserId);
    userProfileDataFirebase.on('value', userSnapshot => {
      this.userProfileData = userSnapshot.val();
    })
    return this.userProfileData;
  }

  //Todo -- Firebase version sync issue needs to be fixed
  loadUserProfileFromFirebase(userToken: string) {
    if (this.customer == null) {
      console.log('auth.ts - loadUserProfileFromFirebase function - loading user from firebase with token '+userToken);
      if (this.isUserLoggedIn()) {
        var userProfileDataFirebase = firebase.database().ref('users/' + userToken);
        //For users who are registered but haven't ordered yet or their first order with us failed.
        if (userProfileDataFirebase != null) {
          userProfileDataFirebase.on('value', userSnapshot => {
            this.customer = userSnapshot.val();
          });
        } else {
          console.log('Exception scenario - CHECK - User logged in but no data could be loaded');
        }
      } else {
        console.log('auth.ts - loadUserProfileFromFirebase function - User is not logged in');
      }
      return this.customer;
    } else {
      console.log(' auth.ts - loadUserProfileFromFirebase function - Using previously loaded Customer from Auth Service');
      return this.customer;
    }
  }

  getCurrentUserProfileData(){
    var activeUserId = this.getActiveUserId();
    console.log('AUTH SERVICE '+activeUserId);
    if (!(activeUserId == null || activeUserId == '')){
      console.log('User is logged in');
      var userProfileDataFirebase =firebase.database().ref('users/' + activeUserId);
      if(userProfileDataFirebase!=null){
        userProfileDataFirebase.on('value', userSnapshot => {
          if(userSnapshot.val()!=null) {
           console.log(userSnapshot.val());
            this.userProfileData = userSnapshot.val();
          }
          else {
            var userPhone=firebase.auth().currentUser.phoneNumber;
            console.log('schedule.ts - ionViewDidEnter - This is the first time a user is ordering with us with number '
            +  userPhone);
            //Since the phone number is already available, use it to prepopulate the form
            this.userProfileData.phone=userPhone;
            this.userProfileData.isUserAuthenticated=true;
          }
        });
      }
    } else {
      console.log('User is not logged in');
    }
    return this.userProfileData;
  }
}
