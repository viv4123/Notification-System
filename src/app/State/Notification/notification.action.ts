import { createAction, props } from '@ngrx/store';
import { Notification } from '../../Models/notification';




export const ADD_NOTIFICATION_ACTION = '[notifications page] add notification';
export const ADD_NOTIFICATION_SUCCESS = '[notifications page] add notification success';
export const DELETE_POST_ACTION = '[posts page] delete post';
export const DELETE_POST_SUCCESS = '[posts page] delete post success';
export const LOAD_NOTIFICATIONS = '[notifications page] load notifications';
export const LOAD_NOTIFICATIOS_SUCCESS = '[notifications page] load notifications success';


export const addNotification = createAction(ADD_NOTIFICATION_ACTION, props<{ notification: Notification }>());
export const addNotificationSuccess = createAction(
    ADD_NOTIFICATION_SUCCESS,
    props<{ notification: Notification }>()
);


export const deleteNotification = createAction(
    DELETE_POST_ACTION,
    props<{ id: any }>()
);
export const deleteNotificationSuccess = createAction(
    DELETE_POST_SUCCESS,
    props<{ id: any }>()
);


export const loadNotifications = createAction(LOAD_NOTIFICATIONS);
export const loadNotificationsSuccess = createAction(
    LOAD_NOTIFICATIOS_SUCCESS,
    props<{ notifications: Notification[] }>()
);



