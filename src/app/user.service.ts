import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {

  constructor(private afAuth: AngularFireAuth) { }

  login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  getUsername(): Observable<String> {
    return this.afAuth.authState.map(firebaseUser => {
      if (firebaseUser) {
        return firebaseUser.displayName;
      } else {
        return 'Anonymous';
      }
    });
  }

}
