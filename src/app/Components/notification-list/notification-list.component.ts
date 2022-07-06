import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/Services/notification.service';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.scss']
})
export class NotificationListComponent implements OnInit {
  notificationList: any[];

  constructor(private notificationSerive: NotificationService) { }

  ngOnInit(): void {
    this.notificationList = this.notificationSerive.getALLScheduleDtetails();
  }

}
