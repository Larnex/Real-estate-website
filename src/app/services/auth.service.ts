import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/auth';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Observable, of } from 'rxjs';
import { switchMap, windowTime } from 'rxjs/operators';
import { User } from 'src/app/interfaces/user';
import * as auth from 'firebase/auth';

// import * as admin from 'firebase-admin';
// import * as functions from 'firebase-functions';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<User | null | undefined>;
  user: any;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    public ngZone: NgZone
  ) {
    // this.user$ = this.afAuth.authState.pipe(
    //   switchMap((user) => {
    //     if (user) {
    //       console.log('user:', user);
    //       return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
    //     } else {
    //       return of(null);
    //     }
    //   })
    // );

    // Get auth data then get firestore user document || null
    this.afAuth.authState.subscribe((user) => {
      console.log('user:', user);
      if (user) {
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });

    this.isLogged;

    this.user = afAuth.currentUser;

    console.log(this.user);
  }

  get isLogged(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    console.log('user:', user);

    return user !== null && user.emailVerified !== false ? true : false;
  }

  async isLoggedIn() {
    const isLoggedIn: any = await new Promise((resolve: any, reject: any) =>
      this.afAuth.onAuthStateChanged(
        (user: any) => {
          resolve(user);
        },
        (e: any) => {
          reject(e);
        }
      )
    );

    return !!isLoggedIn;

    // return isLoggedIn;
  }

  login(email: string, password: string) {
    console.log('password:', password);
    console.log('email:', email);

    this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((value) => {
        console.log(value);

        this.ngZone.run(() => {
          this.router.navigate(['/']);
        });

        this.updateUserData(value.user);

        // console.log('value:', value.user);
        // this.updateUserData(value.user);
        // console.log('You logged in');
        // window.location.reload();
        // this.isLogged();
      })
      .catch((err) => {
        console.log('Something wrong: ', err.message);
      });
  }

  signUp(email: string, password: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((value) => {
        this.sendVerificationMail();
        this.updateUserData(value.user);
      })
      .catch((err) => {
        console.log('Something wrong: ', err.message);
      });
  }

  sendVerificationMail() {
    return this.afAuth.currentUser
      .then((u: any) => u.sendEmailVerification())
      .then(() => {
        this.router.navigate(['verify-email-address']);
      });
  }

  forgotPassword(passwordResetEmail: string) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      })
      .catch((err) => {
        window.alert(err);
      });
  }

  createUser(user: User) {
    console.log('user:', user);

    this.afAuth
      .createUserWithEmailAndPassword(
        user.email as string,
        user.password as string
      )
      .then((value) =>
        this.addUserToFirestore(value.user?.uid as string, user)
      );
  }

  googleAuth() {
    return this.authLogin(new auth.GoogleAuthProvider()).then((res: any) => {
      if (res) {
        this.router.navigate(['/']);
      }
    });
  }

  authLogin(provider: any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['/']);
        });

        this.updateUserData(result.user);
      })
      .catch((err) => {
        window.alert(err);
      });
  }

  // signOut() {
  //   console.log('Sign out completed');
  //   this.afAuth.signOut();
  //   window.location.reload();
  //   this.isLogged;
  // }

  signOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      // this.router.navigate(['/']);
      window.location.reload();
    });
  }

  async addUserToFirestore(valueUid: string, user: any) {
    const docRef = await this.afs.collection('users').add({
      email: user.email,
      roles: user.roles,
    });

    console.log(valueUid);

    docRef.update({ uid: valueUid });
  }

  private updateUserData(user: any) {
    console.log('user:', user);
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    console.log('userRef:', userRef);
    const data: User = {
      uid: user.uid,
      email: user.email,
      roles: {
        registered: true,
      },
      emailVerified: true,
    };
    console.log('data:', data);
    return userRef.set(data, { merge: true });
  }

  ///// Role-based Authorization //////

  canRead(user: User): boolean {
    const allowed = ['admin', 'registered'];
    return this.checkAuthorization(user, allowed);
  }

  canEdit(user: User): boolean {
    const allowed = ['admin'];
    return this.checkAuthorization(user, allowed);
  }

  canDelete(user: User): boolean {
    const allowed = ['admin'];
    return this.checkAuthorization(user, allowed);
  }

  // determines if user has matching role
  private checkAuthorization(user: User, allowedRoles: string[]): boolean {
    if (!user) return false;
    for (const role of allowedRoles) {
      if ((user.roles as any)[role]) {
        return true;
      }
    }
    return false;
  }
}
