import { addNotification, addNotificationSuccess, loadNotifications, loadNotificationsSuccess, deleteNotification, deleteNotificationSuccess } from './notification.action';
import { NotificationService } from '../../Services/notification.service';
import { map, mergeMap, switchMap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';

@Injectable()
export class NotificationsEffects {
    constructor(private actions$: Actions, private notificationSerive: NotificationService) { }

    loadNotifications$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(loadNotifications),
            mergeMap((action) => {
                return this.notificationSerive.getNotifications().pipe(
                    map((notifications) => {
                        return loadNotificationsSuccess({ notifications });
                    })
                );
            })
        );
    });

    addNotification$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(addNotification),
            mergeMap((action) => {
                return this.notificationSerive.addNotification(action.notification).pipe(
                    map((data) => {
                        const notification = { ...action.notification, id: data.id };
                        return addNotificationSuccess({ notification });
                    })
                );
            })
        );
    });

    deleteNotification$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(deleteNotification),
            switchMap((action) => {
                return this.notificationSerive.deleteNotification(action.id).pipe(
                    map((data) => {
                        return deleteNotificationSuccess({ id: action.id });
                    })
                );
            })
        );
    });
}