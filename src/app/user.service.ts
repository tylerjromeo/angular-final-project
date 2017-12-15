import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { ActivatedRoute } from '@angular/router';

export interface User {
  displayName: String;
}

@Injectable()
export class UserService {

  constructor(private afAuth: AngularFireAuth, private route: ActivatedRoute) { }

  login() {
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  getUser(): Observable<User> {
    return this.afAuth.authState.map(firebaseUser => {
      if (firebaseUser) {
        return {
          displayName: firebaseUser.displayName
        };
      }
    });
  }

}

