import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { LoadingSpinnerComponent } from './shared/components/loading-spinner/loading-spinner.component';
import { SHARED_LOADING_SLICE } from './shared/store/shared.reducer';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  getErrorMessageSelector,
  getLoadingSelector,
} from './shared/store/shared.selector';
import { CommonModule } from '@angular/common';
import { setAutoLoginAction } from './auth/state/auth.actions';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeaderComponent,
    RouterOutlet,
    LoadingSpinnerComponent,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'counter-store';
  loadingStatus$: Observable<boolean>;
  errorMessage$: Observable<string>;

  constructor(private store: Store<SHARED_LOADING_SLICE>) {}

  ngOnInit() {
    this.loadingStatus$ = this.store.select(getLoadingSelector);
    this.errorMessage$ = this.store.select(getErrorMessageSelector);
    this.store.dispatch(setAutoLoginAction());
  }
}
