import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthSlice } from '../../../auth/state/auth.reducer';
import { Observable } from 'rxjs';
import { getIsAuthenticatedSelector } from '../../../auth/state/auth.selector';
import { CommonModule } from '@angular/common';
import { setLogoutAction } from '../../../auth/state/auth.actions';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  isAuthenticated$: Observable<boolean>;

  constructor(private store: Store<AuthSlice>) {}

  ngOnInit() {
    this.isAuthenticated$ = this.store.select(getIsAuthenticatedSelector);
  }

  logout(event: Event) {
    event.preventDefault();
    this.store.dispatch(setLogoutAction());
  }
}
