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

  getPreviousOrders(uid:string){
    return firebase.database().ref('user-orders/'+uid);
  }

  getCurrentUserDetails(uid:string){
    return firebase.database().ref('users/'+uid);
  }
}
