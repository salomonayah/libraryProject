import { Component, OnInit } from '@angular/core';
import { Book } from 'app/models/Book.model';
import { Subscription } from 'rxjs';
import { BookService } from 'app/services/bookServices/book.service';
import { Router } from '@angular/router';


@Component({
    selector: 'allAvailableBooks-cmp',
    moduleId: module.id,
    templateUrl: 'allAvailableBooks.component.html'
})

export class AllAvailableBooksComponent implements OnInit{

    wordToSearch = ''

    books: Book[] = []
    availableBooks: Book[] = []
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
                this.availableBooks =  this.books.filter( 
                    (book) => {
                      if ((book.status != 'REQUESTED') && (book.status != 'BORROWED') ) {
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
        this.availableBooks = this.availableBooks.filter( 
          (book) => {
            const bookTitle = book.title.toLowerCase();
            if (bookTitle.match(this.wordToSearch.toLowerCase()) ) {
              return true;
            }
        });
    }

    statusUpdate(id: any, status:string) {

        const booktoUpdate = this.availableBooks[id];

        this.availableBooks[id].status = status;
        
        const newBook = this.availableBooks[id];

        this.bookService.updateABookData(booktoUpdate,newBook);
    }

    ngOnDestroy() {
        this.bookSubscription.unsubscribe()
    }
}
