import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { CounterState } from '../counter-store/counter.state';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { counter } from '../counter-store/counter.selector';

@Component({
  selector: 'app-counter-output',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './counter-output.component.html',
  styleUrl: './counter-output.component.css',
})
export class CounterOutputComponent {
  counter$: Observable<number>;

  constructor(private store: Store<CounterState>) {}

  ngOnInit() {
    this.counter$ = this.store.select(counter);
  }
}
