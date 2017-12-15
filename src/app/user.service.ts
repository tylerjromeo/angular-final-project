import { User } from './models/user';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { ActivatedRoute } from '@angular/router';

@Injectable()
export class UserService {

  constructor(private afAuth: AngularFireAuth,
    private afDb: AngularFireDatabase,
    private route: ActivatedRoute) { }

  login() {
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  getUserState(): Observable<firebase.User> {
    return this.afAuth.authState;
  }

  getCurrentUser(): Observable<User> {
    return this.getUserState().switchMap(user => {
      if (user) {
        return this.getUser(user.uid);
      } else {
        return Observable.of(null);
      }
    });
  }

  getUser(id: String): FirebaseObjectObservable<User> {
    return this.afDb.object('/users/' + id);
  }

  saveUser(user: User) {
    this.afDb.object('/users/' + user.id).update({
      displayName: user.displayName,
      email: user.email
    });
  }

}

