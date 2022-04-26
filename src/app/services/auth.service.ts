
import { filter, shareReplay, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, BehaviorSubject } from "rxjs";
import { User } from "../model/user";
import * as auth0 from 'auth0-js';
import { Router } from "@angular/router";
import * as moment from 'moment';

export const ANONYMOUS_USER: User = {
    id: undefined,
    email: ''
};

const AUTH_CONFIG = {
    clientID: 'M6WNUKMcT9gdaggaqaiK6Vtsad3qy7Pu',
    domain: "dev-94jle6hd.us.auth0.com"
};


@Injectable()
export class AuthService {


    auth0 = new auth0.WebAuth({
        clientID: AUTH_CONFIG.clientID,
        domain: AUTH_CONFIG.domain,
        responseType: 'token id_token',
        redirectUri: 'https://localhost:4200/lessons',
        scope: 'openid email'
    });

    private subject = new BehaviorSubject<User>(undefined);

    user$ = this.subject.pipe(filter(u => !!u));

    constructor(private http: HttpClient, private router: Router) {
        if (this.isLoggedIn()) {
            this.userInfo();
        }
    }

    login() {
        this.auth0.authorize({
            initialScreen: 'login'
        });
    }

    signUp() {
        this.auth0.authorize({
            initialScreen: 'signup'
        });
    }

    logout() {
        localStorage.removeItem('id_token');
        localStorage.removeItem('expiresAt');
        this.router.navigate(['/lessons']);
    }

    retreiveAuthInfoFromUrl() {
        this.auth0.parseHash((error, result) => {
            if (error) {
                console.log(error);
            }
            else if (result && result.idToken) {
                window.location.hash = '';
                console.log(result);

                this.setSession(result);

                this.userInfo();
            }
        });
    }

    private userInfo() {
        this.http.put<User>('/api/userinfo', null).pipe(
            shareReplay(),
            tap(u => this.subject.next(u))
        ).subscribe();
    }

    private setSession(result: any) {
        const expiresAt = moment().add(result.expiresIn, 'second');

        localStorage.setItem('id_token', result.idToken);
        localStorage.setItem('expiresAt', JSON.stringify(expiresAt.valueOf()));
    }

    getExpiration() {
        const expiration = localStorage.getItem('expiresAt');
        const expiresAt = JSON.parse(expiration);
        return moment(expiresAt);
    }

    public isLoggedIn() {
        return moment().isBefore(this.getExpiration());
    }

    isLoggedOut() {
        return !this.isLoggedIn();
    }

}







