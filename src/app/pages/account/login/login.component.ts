import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;

  users: String;

  constructor(
    private formBuilder: FormBuilder,
    public auth: AngularFireAuth,
    public router: Router
  ) { }

  ngOnInit(): void {

    this.users = localStorage.getItem('user')

    if (!(this.users.toString() === 'null')){
      this.router.navigate(['/pages/profile/'])
    }

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
  }, {
  });
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    // display form values on success
    this.auth.signInWithEmailAndPassword(this.loginForm.value['email'], this.loginForm.value['password'])
    .then((user) => {
      localStorage.setItem('user', user.user.uid);
      this.router.navigate(['/pages/profile/']);
    });
    ;
  }
}