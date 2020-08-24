import { Component } from '@angular/core';
import { AuthService } from 'app/services/authServices/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'signIn-cmp',
    moduleId: module.id,
    templateUrl: 'signIn.component.html'
})

export class SignInComponent {

    userCredentials = {
        email: '',
        password: '',
        confirmPassword: ''
    }
    errorMessage : string;

    constructor(
        private authServce: AuthService,
        private router: Router
    ) { }

    onSubmit() {
        this.authServce.signInUser(this.userCredentials.email, this.userCredentials.password).then(
            () => {
                this.router.navigate(['booksManagement'])
            }, 
            (error) => {
                this.errorMessage = error
            }
        )
    }

    onSignup() {
        this.router.navigate(['signUp'])
    }
}
