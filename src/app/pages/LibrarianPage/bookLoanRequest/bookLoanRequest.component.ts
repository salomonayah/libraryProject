import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BookService } from 'app/services/bookServices/book.service';
import { Router } from '@angular/router';
import { Book } from 'app/models/Book.model';

@Component({
    selector: 'bookLoanRequest-cmp',
    moduleId: module.id,
    templateUrl: 'bookLoanRequest.component.html'
})

export class BookLoanRequestComponent implements OnInit{
    
    wordToSearch = ''

    books: Book[] = []
    requestedBooks: Book[] = []
    bookSubscription: Subscription

    constructor(
        private bookService: BookService,
        private router: Router,
    ) {

    }
    
    ngOnInit(){
        // get book list
        this.getAllBookList() 
    }

    getAllBookList() {
        // get book list
        this.bookSubscription = this.bookService.bookSubject.subscribe(
            (books: Book[]) => {
                this.books = books;
                this.requestedBooks =  this.books.filter( 
                    (book) => {
                      if (book.status == 'REQUESTED') {
                        return true;
                      }
                });
            })
        this.bookService.getAllBook();
        this.bookService.emitBooks();
    }

    openSingleBookPage(id: string) {
        this.router.navigate(['singleBook', id])
    }

    filterBook(event: any) {
        console.log(event.target.value);
        
        this.getAllBookList();
        this.requestedBooks = this.requestedBooks.filter( 
          (book) => {
            const bookTitle = book.title.toLowerCase();
            if (bookTitle.match(this.wordToSearch.toLowerCase()) ) {
              return true;
            }
        });
    }

    statusUpdate(id: any, status:string) {
        const booktoUpdate = this.requestedBooks[id];

        this.requestedBooks[id].status = status;
        
        const newBook = this.requestedBooks[id];

        this.bookService.updateABookData(booktoUpdate,newBook);
    }

    ngOnDestroy() {
        this.bookSubscription.unsubscribe()
    }
}
