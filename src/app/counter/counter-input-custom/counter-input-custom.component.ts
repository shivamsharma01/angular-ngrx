import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { CounterState } from '../counter-store/counter.state';
import {
  customIncrement,
  channelName as cName,
} from '../counter-store/counter.action';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { channelName } from '../counter-store/counter.selector';
import { CommonModule } from '@angular/common';
import { AppState } from '../../store/app.state';

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

  constructor(private store: Store<AppState>) {
    this.value = 0;
    this.channelName$ = this.store.select(channelName);
  }

  add() {
    this.store.dispatch(customIncrement({ value: +this.value }));
  }

  addChannelName() {
    this.store.dispatch(cName());
  }
}
