import firebase from 'firebase';

export class AuthService {

  private address: any = {};

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
      console.log('Auth Service : Login Check - FALSE');
      return false;
    }
    else {
      console.log('Auth Service : Login Check - TRUE');
      return true;
    }

  }

  getActiveUserId() {
    if (firebase.auth().currentUser != null)
      return firebase.auth().currentUser.uid;
    else
      return null;
  }

  getPreviousOrders(uid: string) {
    return firebase.database().ref('user-orders/' + uid);
  }

  getCurrentUserDetails(uid: string) {
    return firebase.database().ref('users/' + uid);
  }

  getActiveUserProfile() {
    var activeUserId = this.getActiveUserId();
    console.log('AUTH Service - ionViewDidEnter(). Active user is - ' + activeUserId);
    var userProfileDataFirebase = this.getCurrentUserDetails(activeUserId);
    userProfileDataFirebase.on('value', userSnapshot => {
      this.userProfileData = userSnapshot.val();
    })
    return this.userProfileData;
  }
}
/*  userProfileDataFirebase.on('value', userSnapshot => {
    var userProfileData = [];
    userSnapshot.forEach( userProfile => {
      console.log('User profile from firebase '+userProfile.val() + '-' + userProfile.key);
      var key22=userProfile.key;
      var val1=userProfile.val();
      userProfileData.push({
        [key22]:val1
      });

      //this.userProfileData.push(userProfile.val());
      return false;
    });
    console.log(('Returning user profile data from service to consumer ' + userProfileData));
    //This is a JSON object. Called can directly user userProfileData.name to get the name of  logged in customer.
    return userProfileData;
  });
}*/

