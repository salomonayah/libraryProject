import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Book } from 'app/models/Book.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  booksList: Book[] = [];

  bookSubject = new Subject<Book[]>();

  constructor() { }

  emitBooks() {
    this.bookSubject.next(this.booksList)
  }

  saveBooksList() {
    firebase.database().ref('/books').set(this.booksList)
  }

  createNewBook(newBook: Book) {
    this.booksList.push(newBook);
    this.saveBooksList();
    this.emitBooks();
  }

  getAllBook() {
    firebase.database().ref('/books').on('value', (data) => { // listen to change in database in realtime like a web socket
      this.booksList = data.val() ? data.val() : [] ;
      this.emitBooks();
      // console.log('this.booksList')
      // console.log(this.booksList)
    })
  }

  getAllBookWithNoneStatus() {
    firebase.database().ref('/books').on('value', (data) => { // listen to change in database in realtime like a web socket
      this.booksList = data.val() ? data.val() : [] ;
      this.booksList = this.booksList.filter( 
        (book) => {
          if ((book.status != 'REQUESTED') && (book.status != 'BORROWED') ) {
            return true;
          }
      });
      this.emitBooks();
    })
  }

  getAllBookWithBorrowedStatus() {
    firebase.database().ref('/books').on('value', (data) => { // listen to change in database in realtime like a web socket
      this.booksList = data.val() ? data.val() : [] ;
      this.booksList = this.booksList.filter( 
        (book) => {
          if (book.status == 'BORROWED') {
            return true;
          }
      });
      this.emitBooks();
    })
  }
  
  getAllBookWithRequestStatus() {
    firebase.database().ref('/books').on('value', (data) => { // listen to change in database in realtime like a web socket
      this.booksList = data.val() ? data.val() : [] ;
      this.booksList = this.booksList.filter( 
        (book) => {
          if (book.status == 'REQUESTED') {
            return true;
          }
      });
      this.emitBooks();
    })
  }

  getOneBook(id: string) {
    return new Promise( 
      (resolve, reject) => {
        firebase.database().ref('/books' + id).once('value')
        .then(
          (data) => { 
            resolve(data) ;
          }, 
          (error) => { 
            reject(error) ;
          },
        )
      })
  }

  updateABookData(bookToUpdate: Book, updatedBookData: Book ) {
    
    const bookIndexToUpdate = this.booksList.findIndex((eachBook) => {
      if(eachBook === bookToUpdate) {
        return true;
      }
    })
    this.booksList[bookIndexToUpdate] = updatedBookData;
    this.saveBooksList();
    this.emitBooks();
  }

  updateBookStatus(bookToUpdate: Book, status: String ) {
    const newbookStatus =  bookToUpdate
    newbookStatus.status = status; 
    this.updateABookData(bookToUpdate, newbookStatus);
  }

  removeABook(bookToremove: Book) {
    const bookIndexToRemove = this.booksList.findIndex((eachBook) => {
      if(eachBook === bookToremove) {
        return true;
      }
    })
    this.booksList.splice(bookIndexToRemove,1)
    this.saveBooksList();
    this.emitBooks();
  }

}