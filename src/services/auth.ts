import firebase from 'firebase';
import {Customer} from "../models/customer";

export class AuthService {

  private address: any = {};

  private customer: Customer;

  private userUid: string = null;

  private productList: any = null;


  private userProfileData = {
    name: '',
    phone: '',
    email: '',
    address: this.address
  };

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

  isUserLoggedIn() {
    var activeUserId = this.getActiveUserId();
    if (activeUserId == null || activeUserId == '') {
      return false;
    }
    else {
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

  loadUserProfileFromFirebase(userToken: string) {
    if (this.customer == null) {
      console.log('auth.ts - loadUserProfileFromFirebase function - loading user from firebase');
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
      console.log(' auth.ts - loadUserProfileFromFirebase function -Using previously loaded Customer from Auth Service');
      return this.customer;
    }
  }
}
