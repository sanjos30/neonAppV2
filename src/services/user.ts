import {User} from "../models/user";
import {AuthService} from "./auth";
import firebase from "firebase";

export class UserService {

  user: User;

  constructor() {
  }

  fetchUserDetails(activeUserUid: string) {
    if (!(activeUserUid == null || activeUserUid == '')) {
      var userProfileDataFirebase = firebase.database().ref('users/' + activeUserUid);
      if (userProfileDataFirebase != null) {
        userProfileDataFirebase.on('value', userSnapshot => {
            this.user = userSnapshot.val();

        });
      }
    } else {
        //Do Nothing
    }
    return this.user;
  }

}
