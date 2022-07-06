import { NotificationListComponent } from './Components/notification-list/notification-list.component';
import { HelpComponent } from './Shared/help/help.component';
import { NotificationsComponent } from './Components/notifications/notifications.component';
import { not } from '@angular/compiler/src/output/output_ast';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ScheduleDetailsComponent } from './Components/schedule-details/schedule-details.component';

const routes: Routes = [
  {
    path: '',
    component: NotificationsComponent,
  },
  {
    path: 'allnotifications',
    component: NotificationListComponent,
  },
  {
    path: 'help',
    component: HelpComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
