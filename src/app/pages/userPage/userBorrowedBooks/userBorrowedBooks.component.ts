import { Component, OnInit } from '@angular/core';
import { Book } from 'app/models/Book.model';
import { Subscription } from 'rxjs';
import { BookService } from 'app/services/bookServices/book.service';
import { Router } from '@angular/router';


@Component({
    selector: 'userBorrowedBooks-cmp',
    moduleId: module.id,
    templateUrl: 'userBorrowedBooks.component.html'
})

export class UserBorrowedBooksComponent implements OnInit{

    
    wordToSearch = ''

    books: Book[] = []
    borrowedBooks: Book[] = []
    bookSubscription: Subscription

    constructor(
        private bookService: BookService,
        private router: Router,
    ) {

    }
    
    ngOnInit(){
        this.getAllBookList() 
    }

    getAllBookList() {
        this.bookSubscription = this.bookService.bookSubject.subscribe(
            (books: Book[]) => {
                this.books = books;
                this.borrowedBooks =  this.books.filter( 
                    (book) => {
                      if (book.status == 'BORROWED') {
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
        this.borrowedBooks = this.borrowedBooks.filter( 
          (book) => {
            const bookTitle = book.title.toLowerCase();
            if (bookTitle.match(this.wordToSearch.toLowerCase()) ) {
              return true;
            }
        });
    }

    statusUpdate(id: any, status:string) {
        const booktoUpdate = this.borrowedBooks[id];

        this.borrowedBooks[id].status = status;
        
        const newBook = this.borrowedBooks[id];

        this.bookService.updateABookData(booktoUpdate,newBook);
    }

    ngOnDestroy() {
        this.bookSubscription.unsubscribe()
    }
}
