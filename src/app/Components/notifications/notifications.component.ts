import { getNotifications, getNotificationById } from './../../State/Notification/notification.selector';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { NotificationService } from 'src/app/Services/notification.service';
import { AppState } from 'src/app/State/app.state';
import { Observable } from 'rxjs';
import { Notification } from "../../Models/notification";
import { deleteNotification, loadNotifications } from 'src/app/State/Notification/notification.action';
import { MatPaginator } from '@angular/material/paginator';
import { MasterService } from 'src/app/Services/master.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  data: any;
  notificationDates: any;
  companyName: any;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  notifications: MatTableDataSource<Notification>;

  constructor(private notificationSerive: NotificationService,
    private store: Store<AppState>,
    private _snackBar: MatSnackBar,
    private masterService: MasterService,
  ) { }

  displayedColumns = [{ columnDef: 'companyName', header: 'Company Name', cell: (element: any) => element.companyName },
  { columnDef: 'companyNumber', header: 'Company Number', cell: (element: any) => element.companyNumber },
  { columnDef: 'companyType', header: 'Company Type', cell: (element: any) => this.masterService.getCompanyTypeById(element.companyType)?.name },
  { columnDef: 'market', header: 'Market', cell: (element: any) => this.masterService.getMarketById(element.market)?.name },
  { columnDef: 'action', header: 'Action', cell: (element: any) => element }];
  columnsToDisplay = this.displayedColumns.map(c => c.columnDef);
  ngOnInit(): void {
    //this.notifications = this.store.select(getNotifications);
    this.store
      .select(getNotifications)
      .subscribe((data) => {
        this.notifications = new MatTableDataSource(data);
        this.notifications.paginator = this.paginator;
      });
    this.store.dispatch(loadNotifications());

  }

  onDelete(rowItem: Notification) {
    let id = rowItem.id;
    if (confirm('Are you sure you want to delete')) {
      this.store.dispatch(deleteNotification({ id }));
    }
  }


  openDetails(rowItem) {
    // let id = rowItem.id;
    // this.store
    //   .select(getNotificationById, { id })
    //   .subscribe((data) => {
    //     this.notificationDates = data.scheduleNotification.length > 0 ? data.scheduleNotification : this._snackBar.open('No Notification Schedule.', '', {
    //       duration: 2000
    //     });
    //   });
    this.companyName = rowItem.companyName;
    let item = this.notificationSerive.getScheduleDtetails(rowItem.id);
    this.notificationDates = item.notificationDates?.length > 0 ? item.notificationDates : this._snackBar.open('No Notification Schedule.', '', {
      duration: 2000
    });

  }
}


