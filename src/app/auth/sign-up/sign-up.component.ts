import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthSlice } from '../state/auth.reducer';
import { setShowLoadingAction } from '../../shared/store/shared.actions';
import { setSignUpStartAction } from '../state/auth.actions';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {
  signUpGroup: FormGroup;

  constructor(private store: Store<AuthSlice>) {}

  ngOnInit() {
    this.signUpGroup = new FormGroup({
      email: new FormControl('shivam@gmail.com', [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  signUpSubmit() {
    const email = this.signUpGroup.value.email;
    const password = this.signUpGroup.value.password;
    this.store.dispatch(setShowLoadingAction({ status: true }));
    this.store.dispatch(setSignUpStartAction({ email, password }));
  }
}
