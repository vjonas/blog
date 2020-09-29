import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { from } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-google-login',
  template: `
    <ng-container *ngIf="!(afAuth.authState | async)">
      <button class="login" mat-raised-button (click)="signIn($event)">
        <img src="/assets/google-logo.svg" />
        Login with Google
      </button>
    </ng-container>

    <ng-container *ngIf="afAuth.authState | async as user" class="logout">
      <button class="logout" mat-raised-button (click)="afAuth.signOut()">
        <img class="avatar" [src]="user.photoURL || 'assets/default-user.svg'" />
        Logout
      </button>
    </ng-container>
  `,
  styles: [
    `
      .login img {
        width: 1.25em;
        padding-right: 0.5rem;
      }

      .logout {
        padding-left: 0.5rem;
        padding-right: 1rem;
        background: white;
      }

      .logout img {
        padding-right: 0.5rem;
        height: 100%;
        width: 1.75rem;
        border-radius: 0.25rem;
      }
    `,
  ],
})
export class GoogleSigninComponent {
  constructor(public afAuth: AngularFireAuth) {
    console.log('google signin comp');
  }

  signIn(event: Event) {
    console.log('test');

    event.preventDefault();
    from(this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider()))
      .pipe(
        tap(() => console.log('succesfully logged in')),
        catchError(err => {
          console.log('error loggin in', err);
          return err;
        }),
      )
      .subscribe();
  }
}
