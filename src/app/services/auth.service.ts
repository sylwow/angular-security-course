
import { tap, shareReplay, map, filter, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, BehaviorSubject, of } from "rxjs";
import { User } from "../model/user";

export const ANONYMOUS_USER: User = {
  id: undefined,
  email: ''
}


@Injectable()
export class AuthService {

  private subject = new BehaviorSubject<User>(undefined);

  user$: Observable<User> = this.subject.asObservable().pipe(filter(user => !!user));

  isLoggedIn$: Observable<boolean> = this.user$.pipe(map(user => !!user.id));

  isLoggedOut$: Observable<boolean> = this.isLoggedIn$.pipe(map(isLoggedIn => !isLoggedIn));

  constructor(private http: HttpClient) {

    http.get<User>('/api/user').pipe(
      catchError(() => of(ANONYMOUS_USER))
    ).subscribe(user => this.subject.next(!!user ? user : ANONYMOUS_USER));
  }

  signUp(email: string, password: string) {

    return this.http.post<User>('/api/signup', { email, password }).pipe(
      tap(user => this.subject.next(user)),
      shareReplay());

  }

  login(email: any, password: any) {
    return this.http.post<User>('/api/login', { email, password }).pipe(
      tap(user => this.subject.next(user)),
      shareReplay());
  }

  logout(): Observable<any> {
    return this.http.post<any>('/api/logout', null).pipe(
      catchError(() => of(ANONYMOUS_USER)),
      tap(_ => this.subject.next({ ...ANONYMOUS_USER })),
      shareReplay());
  }
}
