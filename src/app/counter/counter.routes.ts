import { Routes } from '@angular/router';
import { CounterComponent } from './counter-dashboard/counter.component';
import { counterFeature } from './counter-store/counter.reducer';
import { provideState } from '@ngrx/store';

export const COUNTER_ROUTES: Routes = [
  {
    path: '',
    component: CounterComponent,
    providers: [provideState(counterFeature)],
  },
];
