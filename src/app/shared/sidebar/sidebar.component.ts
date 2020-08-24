import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/services/authServices/auth.service';


export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const USER_MENU_ROUTES: RouteInfo[] = [
    { path: '/allAvailableBooks',     title: 'Available books',         icon:'nc-tile-56',       class: '' },
    { path: '/userBorrowedBooks',     title: 'Borrowed books',         icon:'nc-cart-simple',       class: '' }
];

export const LIBRARIAN_MENU_ROUTES: RouteInfo[] = [
    { path: '/booksManagement',     title: 'Books management',         icon:'nc-tile-56',       class: '' },
    { path: '/bookLoanRequest',     title: 'Books request',         icon:'nc-bullet-list-67',       class: '' },
];


@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {

    public user_menuItems: any[];
    public profil_menuItems: any[];
    public librarian_menuItems: any[];
    public default_menuItems: any[];

    constructor(private authServce: AuthService) {}

    ngOnInit() {
        this.user_menuItems = USER_MENU_ROUTES.filter(menuItem => menuItem);
        this.librarian_menuItems = LIBRARIAN_MENU_ROUTES.filter(menuItem => menuItem);
    }

    onSignOut() {
        this.authServce.signOut()
    }
}
