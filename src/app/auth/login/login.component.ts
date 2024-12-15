import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthSlice } from '../state/auth.reducer';
import { LOGIN_START_ACTION } from '../state/auth.actions';
import { SHOW_LOADING_ACTION } from '../../shared/store/shared.actions';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginGroup: FormGroup;

  constructor(private store: Store<AuthSlice>) {}

  ngOnInit() {
    this.loginGroup = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  loginSubmit() {
    const email = this.loginGroup.value.email;
    const password = this.loginGroup.value.password;
    this.store.dispatch(SHOW_LOADING_ACTION({ status: true }));
    this.store.dispatch(LOGIN_START_ACTION({ email, password }));
  }
}
