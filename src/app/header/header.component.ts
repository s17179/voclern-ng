import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private tokenSubscription!: Subscription;
  isAuthenticated = false;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.tokenSubscription = this.authService.token.subscribe(token => {
      this.isAuthenticated = !!token;
    });
  }

  ngOnDestroy(): void {
    this.tokenSubscription.unsubscribe();
  }

  onLogout(): void {
    this.authService.logout();
  }
}
