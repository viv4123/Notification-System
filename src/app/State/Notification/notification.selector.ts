import { NotificationsState } from './notification.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';

const getNotificationsState = createFeatureSelector<NotificationsState>('notifications');

export const getNotifications = createSelector(getNotificationsState, (state) => {
    return state.notifications;
});

export const getNotificationById = createSelector(getNotificationsState, (state, props) => {
    return state.notifications.find((n) => n.id === props.id);
});