import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit, OnDestroy {
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
