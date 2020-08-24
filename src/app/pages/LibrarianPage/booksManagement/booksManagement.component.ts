import { Component, OnInit, OnDestroy } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { Book } from 'app/models/Book.model';
import { BookService } from 'app/services/bookServices/book.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
    selector: 'booksManagement-cmp',
    moduleId: module.id,
    templateUrl: 'booksManagement.component.html'
})

export class BooksManagementComponent implements OnInit, OnDestroy {

    books: Book[] = []
    bookSubscription: Subscription

    activeBookForm = false;
    activeBookUpdateForm = false;
    activeBookList = true;

    //Image cropper variable
    imgToCropSelected = false;
    imageChangedEvent: any = '';
    croppedImage: any = '';
    imgToCrop = false;
    croppingValidated = false;
    bookImg =  null;
    fileTypeError: string;
    //End Image cropper variable

    bookToUpdate: Book;
    updatedBookData: Book;

    newBook = {
        title: '',
        resume: '',
        pages: '',
        author: '',
        status: '',
    }

    wordToSearch = ''

    constructor(
        private bookService: BookService,
        private router: Router,
    ) {

    }

    openBookList() {
        this.activeBookList =  true;
        this.activeBookForm =  false;
        this.activeBookUpdateForm =  false;
    }

    openBookForm() {
        this.activeBookList =  false;
        this.activeBookForm =  true;
        this.activeBookUpdateForm =  false;
    }

    ngOnInit(){
        // get book list
        this.getAllBookList() 
    }

    getAllBookList() {
        // get book list
        this.bookSubscription = this.bookService.bookSubject.subscribe(
            (books: Book[]) => {
                console.log('bookSubject')
                console.log(books)
                this.books = [...books];
            })
        this.bookService.getAllBook();
        this.bookService.emitBooks(); 
        
    }

    openSingleBookPage(id: string) {
        this.router.navigate(['singleBook', id])
    }


    onDeleteBook(id : any) {
        this.bookService.removeABook(this.books[id]);
    }

    onUpdateButtonClicked(id: any) {
        this.bookToUpdate = this.books[id];
        this.updatedBookData = this.books[id];

        this.activeBookUpdateForm =  true;
        this.activeBookForm =  false;
        this.activeBookList =  false;
    }

    onUpdatedBookSaved() {
        this.bookService.updateABookData(this.bookToUpdate, this.updatedBookData);
        this.activeBookUpdateForm =  false;
        this.activeBookForm =  false;
        this.activeBookList =  true;
    }

    saveNewBook() {
        const theNewBook =  this.newBook;
        this.bookService.createNewBook(theNewBook)

        this.activeBookList =  true;
        this.activeBookForm =  false;
        this.activeBookUpdateForm =  false;
    }

    
    filterBook(event: any) {
        console.log(event.target.value);
        
        this.getAllBookList();
        this.books = this.books.filter( 
          (book) => {
            const bookTitle = book.title.toLowerCase();
            if (bookTitle.match(this.wordToSearch.toLowerCase()) ) {
              return true;
            }
        });
    }

    ngOnDestroy() {
        this.bookSubscription.unsubscribe()
    }


























































    //FILE UPLOAD CROP AND SEND

    fileChangeEvent(event: any): void {
        this.imageChangedEvent = event;
        this.imgToCropSelected = true;
    }

    imageCropped(event: ImageCroppedEvent) {
        console.log(event)
        this.croppedImage = event.base64;
        this.imgToCrop = true;
        //let blobData = event.file;
        //this.beforeImgUpload(this.blobToFile(blobData, 'farmerProfil'))
        this.beforeImgUpload(this.blobToFile(this.croppedImage, 'farmerProfil'))
    }

    blobToFile(theBlob: Blob, fileName:string): File {
        var b: any = theBlob;
        //A Blob() is almost a File() - it's just missing the two properties below which we will add
        b.lastModifiedDate = new Date();
        b.name = fileName;

        //Cast to a File() type
        return <File>theBlob;
    }

    validCropping() {
        this.croppingValidated = true;
    }

    rejectCropping() {
        this.croppingValidated = false;
        this.imgToCropSelected = false;
    }

    beforeImgUpload(file: any) {
        const validImage = this.controlImage(file);
        if (validImage) {
            this.bookImg = file;
            return true;
        } else {
        return false;
        }
    };

    controlImage = (file: File) => {
        const isJPGPNG = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg';
        if (!isJPGPNG) {
        this.fileTypeError = 'Vous ne pouvez que téléversez des images au format JPEG|JPG|PNG';
        }
        const isLt1M = file.size / 1024 / 1024 <= 1;    
        if (!isLt1M) {
        this.fileTypeError = 'Téléversez des images de taille moins de 1Mo';
        }
        return isJPGPNG && isLt1M;
    };

    fileImgUploader(imgOwnerId: any) {
        const fd = new FormData();

        fd.append('image', this.bookImg, this.bookImg.name)

        // this.technicienService.addProfilImgUser(fd, imgOwnerId).subscribe(
        // (resp) => {
        // this.getAllTechnicien();
        // },
        // (error) => {
        // if(error.status == 200) {
        //     this.getAllTechnicien();
        // } else {
        //     console.log(error);
        //     this.getAllTechnicien();
        // }
        // });
    }

    //END FILE UPLOAD CROP AND SEND

}
