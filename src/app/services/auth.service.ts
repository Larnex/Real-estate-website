import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from 'src/app/interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<User | null | undefined>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    // Get auth data then get firestore user document || null
    this.user$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  login(email: string, password: string) {
    this.signOut();
    console.log('password:', password);
    console.log('email:', email);

    this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((value) => {
        console.log(value);

        // this.checkIfAdmin(value.user);

        console.log('value:', value.user);
        this.updateUserData(value.user);
        console.log('You logged in');
      })
      .catch((err) => {
        console.log('Something wrong: ', err.message);
      });
  }

  // adminLogin(email: string, password: string) {
  //   this.signOut();

  //   this.afAuth.signInWithEmailAndPassword(email, password).then((value) => {
  //     if (!value.user!['roles']) {
  //       console.log('value.user!.roles.admin:', value.user);
  //       return;
  //     } else {
  //       this.updateUserData(value.user);
  //     }
  //   });
  // }

  // checkIfAdmin(user: any): boolean {
  //   console.log(user);

  //   if (!user.roles.admin) {
  //     console.log('not an admin');
  //     return false;
  //   }
  //   return true;
  // }

  signOut() {
    console.log('Sign out completed');
    this.afAuth.signOut();
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
