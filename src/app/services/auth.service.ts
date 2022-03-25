import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';
import { User } from '../model/user';

export const ANONYMUS_USER: User = {
  id: undefined,
  email: "",
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private subject = new BehaviorSubject<User>(ANONYMUS_USER);

  user$: Observable<User> = this.subject.asObservable();

  isLoggedIn$ = this.user$.pipe(map(user => !!user.id));
  isLoggedOut$ = this.isLoggedIn$.pipe(map(loggedIn => !loggedIn));

  constructor(private http: HttpClient) { }

  signup(email: string, password: string) {
    return this.http.post<User>('/api/signup', { email, password })
      .pipe(
        tap(user => this.subject.next(user)),
        shareReplay(),
      );
  }
}
