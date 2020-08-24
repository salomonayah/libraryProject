import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent  {

  constructor() {
    var firebaseConfig = {
      apiKey: "AIzaSyBRo8H_1wx2uERhoj1zobAw6Jzb4fVDEAs",
      authDomain: "booklibrary-2a6aa.firebaseapp.com",
      databaseURL: "https://booklibrary-2a6aa.firebaseio.com",
      projectId: "booklibrary-2a6aa",
      storageBucket: "booklibrary-2a6aa.appspot.com",
      messagingSenderId: "1086616279241",
      appId: "1:1086616279241:web:70fd6adad27570cdba9518",
      measurementId: "G-30WK5X20QH"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
  }


}
