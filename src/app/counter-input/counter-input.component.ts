import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { CounterState } from '../counter/store/counter.state';
import { decrement, increment, reset } from '../counter/store/counter.action';

@Component({
  selector: 'app-counter-input',
  standalone: true,
  imports: [],
  templateUrl: './counter-input.component.html',
  styleUrl: './counter-input.component.css',
})
export class CounterInputComponent {
  constructor(private store: Store<{ count: CounterState }>) {}

  increment() {
    this.store.dispatch(increment());
  }

  decrement() {
    this.store.dispatch(decrement());
  }

  reset() {
    this.store.dispatch(reset());
  }
}
