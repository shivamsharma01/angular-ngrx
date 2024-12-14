import { Component } from '@angular/core';
import { CounterOutputComponent } from '../counter-output/counter-output.component';
import { CounterInputComponent } from '../counter-input/counter-input.component';
import { CounterInputCustomComponent } from '../counter-input-custom/counter-input-custom.component';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [
    CounterOutputComponent,
    CounterInputComponent,
    CounterInputCustomComponent,
  ],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css',
})
export class CounterComponent {}
