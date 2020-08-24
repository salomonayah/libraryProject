import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';


@Component({
  selector: 'app-bookLibrary-layout',
  templateUrl: './bookLibrary-layout.component.html',
  styleUrls: ['./bookLibrary-layout.component.scss']
})
export class BookLibraryLayoutComponent implements OnInit {

  isAuth: boolean;

  ngOnInit(){
    firebase.auth().onAuthStateChanged(
    (user) => {
      if(user) {
        this.isAuth = true   
      } else {
        this.isAuth = false   
      }
    })
  }
}
