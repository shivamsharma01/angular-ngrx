import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { counterSelector } from '../counter-store/counter.selector';
import { CounterSlice } from '../counter-store/counter.reducer';

@Component({
  selector: 'app-counter-output',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './counter-output.component.html',
  styleUrl: './counter-output.component.css',
})
export class CounterOutputComponent {
  counter$: Observable<number>;

  constructor(private store: Store<CounterSlice>) {}

  ngOnInit() {
    this.counter$ = this.store.select(counterSelector);
  }
}
