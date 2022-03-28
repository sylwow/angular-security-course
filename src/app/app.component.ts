import { Component, OnInit } from '@angular/core';
import { AuthService } from "./services/auth.service";
import { Observable } from "rxjs";
import { User } from "./model/user";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  isLoggedIn$ = this.authService.isLoggedIn$;
  isLoggedOut$ = this.authService.isLoggedOut$;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
  }

  logout() {
    this.authService.logout().subscribe();
  }
}

