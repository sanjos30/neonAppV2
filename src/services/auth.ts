import firebase from 'firebase';

export class AuthService {
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

    if (activeUserId == null || activeUserId == '' )
    {
      return false;
    }
  else
    {
    return true;
  }

  }

  getActiveUserId(){
    return firebase.auth().currentUser.uid;
  }
  getPreviousOrders(uid:string){
    return firebase.database().ref('user-orders/'+uid);
  }

  getCurrentUserDetails(uid:string){
    return firebase.database().ref('users/'+uid);
  }

  getActiveUserProfile(){
    var activeUserId=this.getActiveUserId();
    console.log('Profile Page - ionViewDidEnter(). Active user is - ' + activeUserId);
    var userProfileDataFirebase = this.getCurrentUserDetails(activeUserId);
    userProfileDataFirebase.on('value', userSnapshot => {
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
  }
}
