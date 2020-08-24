import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BookLibraryRoutes } from './bookLibrary-layout.routing';
import { UserBorrowedBooksComponent }         from '../../pages/userPage/userBorrowedBooks/userBorrowedBooks.component';

import { AllAvailableBooksComponent }         from '../../pages/userPage/allAvailableBooks/allAvailableBooks.component';
import { UserComponent }            from '../../pages/defaultPage/user/user.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { BookService } from 'app/services/bookServices/book.service';
import { AuthGuardService } from 'app/services/authGuardServices/auth-guard.service';
import { AuthService } from 'app/services/authServices/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { SignUpComponent } from 'app/pages/defaultPage/auth/signUp/signUp.component';
import { SignInComponent } from 'app/pages/defaultPage/auth/signIn/signIn.component';
import { UserDataService } from 'app/services/userDataServices/user-data.service';
import { BooksManagementComponent } from 'app/pages/LibrarianPage/booksManagement/booksManagement.component';
import { BookLoanRequestComponent } from 'app/pages/LibrarianPage/bookLoanRequest/bookLoanRequest.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(BookLibraryRoutes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NzIconModule,
    NgbModule
  ],
  declarations: [
    AllAvailableBooksComponent,
    UserBorrowedBooksComponent,
    SignUpComponent,
    SignInComponent,
    BooksManagementComponent,
    BookLoanRequestComponent,
    UserComponent,
  ],
  providers: [
    BookService,
    AuthGuardService,
    AuthService,
    UserDataService
  ],
})

export class BookLibraryModule {}
