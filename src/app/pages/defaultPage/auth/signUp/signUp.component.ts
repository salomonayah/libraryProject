import { Component } from '@angular/core';
import { AuthService } from 'app/services/authServices/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'signUp-cmp',
    moduleId: module.id,
    templateUrl: 'signUp.component.html'
})

export class SignUpComponent {
    
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

        this.authServce.createNewUser(this.userCredentials.email, this.userCredentials.password).then(
            () => {

                this.authServce.signInUser(this.userCredentials.email, this.userCredentials.password).then(
                    () => {
                        this.router.navigate(['booksManagement'])
                    }, 
                    (error) => {
                        this.errorMessage = error
                    }
                )

            }, 
            (error) => {
                this.errorMessage = error
            }
        )
    }

    onSignin() {
        this.router.navigate(['signIn'])
    }
}
