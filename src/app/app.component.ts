import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { getLoading, getErrorMessage } from './State/Shared/shared.selector';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from './State/app.state';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild(MatSidenav) sidenav!: MatSidenav;
  title = 'notification-app';
  showLoading: Observable<boolean>;
  errorMessage: Observable<string>;
  constructor(private store: Store<AppState>, private observer: BreakpointObserver, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.showLoading = this.store.select(getLoading);
    this.errorMessage = this.store.select(getErrorMessage);
  }

  ngAfterViewInit() {
    this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });
    this.cdr.detectChanges();
  }
}
