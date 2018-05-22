import firebase from 'firebase';

export class AuthService {
  signup(email: string, password: string) {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
  }

  signin(email: string, password: string) {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  signinAnonymous(email: string, phone: string,name:string) {
    return firebase.auth().signInAnonymously();
  }
  logout() {
    firebase.auth().signOut();
  }

  getActiveUser() {
    return firebase.auth().currentUser;
  }
}
