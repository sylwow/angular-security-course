import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../services/auth.service";

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css', '../common/forms.css']
})
export class SignupComponent implements OnInit {

  form: FormGroup;

  errors: string[] = [];

  errorMessages = {
    min: 'min os 10 chanrs',
    uppercase: 'at least one uppercase',
    digits: 'at least 2 digits'
  };

  constructor(private fb: FormBuilder, private authService: AuthService) {

    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirm: ['', Validators.required]
    });


  }

  ngOnInit() {

  }


  signUp() {
    const val = this.form.value;

    if (val.email && val.password && val.password === val.confirm) {

      this.authService.signUp(val.email, val.password)
        .subscribe(
          () => {
            console.log("User created successfully")
            this.errors = [];
          },
          response => this.errors = response.error.errors
        );

    }

  }

}



