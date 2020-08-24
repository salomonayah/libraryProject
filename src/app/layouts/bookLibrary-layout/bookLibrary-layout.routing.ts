import { Routes } from '@angular/router';

import { AllAvailableBooksComponent }   from '../../pages/userPage/allAvailableBooks/allAvailableBooks.component';
import { UserBorrowedBooksComponent }   from '../../pages/userPage/userBorrowedBooks/userBorrowedBooks.component';

import { BooksManagementComponent }     from '../../pages/LibrarianPage/booksManagement/booksManagement.component';
import { BookLoanRequestComponent }     from '../../pages/LibrarianPage/bookLoanRequest/bookLoanRequest.component';

import { UserComponent }                from '../../pages/defaultPage/user/user.component';
import { SignInComponent } from '../../pages/defaultPage/auth/signIn/signIn.component';
import { SignUpComponent } from '../../pages/defaultPage/auth/signUp/signUp.component';
import { AuthGuardService } from 'app/services/authGuardServices/auth-guard.service';

export const BookLibraryRoutes: Routes = [
    { path: 'allAvailableBooks', canActivate:[AuthGuardService], component: AllAvailableBooksComponent },
    { path: 'userBorrowedBooks',    canActivate:[AuthGuardService],   component: UserBorrowedBooksComponent },
    { path: 'booksManagement',    canActivate:[AuthGuardService],   component: BooksManagementComponent },
    { path: 'bookLoanRequest',   canActivate:[AuthGuardService],    component: BookLoanRequestComponent },
    { path: 'user',        canActivate:[AuthGuardService],    component: UserComponent },
    { path: 'signIn',           component: SignInComponent },
    { path: 'signUp',           component: SignUpComponent },
];
