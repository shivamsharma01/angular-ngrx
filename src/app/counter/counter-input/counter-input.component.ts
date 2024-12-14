import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { DECREMENT_ACTION, INCREMENT_ACTION, RESET_ACTION } from '../counter-store/counter.actions';
import { CounterSlice } from '../counter-store/counter.reducer';

@Component({
  selector: 'app-counter-input',
  standalone: true,
  imports: [],
  templateUrl: './counter-input.component.html',
  styleUrl: './counter-input.component.css',
})
export class CounterInputComponent {
  constructor(private store: Store<CounterSlice>) {}

  increment() {
    this.store.dispatch(INCREMENT_ACTION());
  }

  decrement() {
    this.store.dispatch(DECREMENT_ACTION());
  }

  reset() {
    this.store.dispatch(RESET_ACTION());
  }
}
