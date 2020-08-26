import { BooksManagementComponent } from './booksManagement.component';
import { BookService } from '../../../services/bookServices/book.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase';


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


describe('BooksManagementComponent', () => {

  it('should add new book to the list', () => {

    let bookServices =  new BookService()
    let router:  Router;

    const component = new BooksManagementComponent(bookServices, router );

    component.getAllBookList() 

    const initialBookListLength =  component.books.length

    component.newBook = {
      title: 'my nodeJs book',
      resume: 'to learn node Js',
      pages: '1247',
      author: 'Alonso Maito',
      status: '',
    }

    component.saveNewBook()

    const finalBookListLength =  component.books.length;

    expect(initialBookListLength).toEqual(finalBookListLength-1);

  });

  it('should update an existing book data', () => {

    let bookServices =  new BookService()
    let router:  Router;

    const component = new BooksManagementComponent(bookServices, router );

    component.getAllBookList() 

    const initialBookList =  component.books

    component.bookToUpdate = component.books[0]

    component.updatedBookData = component.books[0]

    component.updatedBookData.status = "REQUESTED"
 
    component.onUpdatedBookSaved()

    const changeSaved = (initialBookList != component.books) ? true : false

    expect(changeSaved).toEqual(true);

  });

  it('should delete a book', () => {

    let bookServices =  new BookService()
    let router:  Router;

    const component = new BooksManagementComponent(bookServices, router );

    component.getAllBookList() 

    const initialBookList =  component.books 

    const bookToDeleteIndex = component.books.indexOf(component.books[0])
 
    component.onDeleteBook(bookToDeleteIndex)

    const changeSaved = (initialBookList != component.books) ? true : false

    expect(changeSaved).toEqual(true);

  });


});
