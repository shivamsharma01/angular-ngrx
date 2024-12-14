import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  CUSTOM_INCREMENT_ACTION,
  CHANNEL_NAME_ACTION as cName,
} from '../counter-store/counter.actions';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { channelNameSelector } from '../counter-store/counter.selector';
import { CommonModule } from '@angular/common';
import { CounterSlice } from '../counter-store/counter.reducer';

@Component({
  selector: 'app-counter-input-custom',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './counter-input-custom.component.html',
  styleUrl: './counter-input-custom.component.css',
})
export class CounterInputCustomComponent {
  value: number;
  channelName$: Observable<string>;

  constructor(private store: Store<CounterSlice>) {
    this.value = 0;
    this.channelName$ = this.store.select(channelNameSelector);
  }

  add() {
    this.store.dispatch(CUSTOM_INCREMENT_ACTION({ value: +this.value }));
  }

  addChannelName() {
    this.store.dispatch(cName());
  }
}
