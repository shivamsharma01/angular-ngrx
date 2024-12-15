import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { setDecrementAction, setIncrementAction, setResetAction } from '../counter-store/counter.actions';
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
    this.store.dispatch(setIncrementAction());
  }

  decrement() {
    this.store.dispatch(setDecrementAction());
  }

  reset() {
    this.store.dispatch(setResetAction());
  }
}
