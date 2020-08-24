import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  createNewUser(email: string, password: string) {
    return new Promise( 
      (resolve, reject) => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(() => {
          resolve()
        })
        .catch(
          function(error) {
            reject(error)
            var errorCode = error.code;
            var errorMessage = error.message;
          }
        );
      }
    )
  }

  signInUser(email: string, password: string) {
    return new Promise( 
      (resolve, reject) => {
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then((response) => {
          resolve()
        })
        .catch(
          function(error) {
            reject(error)
            var errorCode = error.code;
            var errorMessage = error.message;
          }
        );
      }
    )
  }

  signOut() {
    return new Promise( 
      (resolve, reject) => {
        firebase.auth().signOut()
        .then(()  => {
          resolve()
        }).catch(function(error) {
          reject()
        });
      }
    )
  }
}
