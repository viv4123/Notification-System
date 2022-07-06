import { addNotification, addNotificationSuccess, deleteNotification, deleteNotificationSuccess, loadNotificationsSuccess } from './notification.action';
import { createReducer, on } from '@ngrx/store';
import { initialState } from './notification.state';



const _notificationsReducer = createReducer(
    initialState,
    on(addNotificationSuccess, (state, action) => {
        let notification = { ...action.notification };
        return {
            ...state,
            notifications: [...state.notifications, notification],
        };
    }),

    on(deleteNotificationSuccess, (state, { id }) => {
        const updatedNotifications = state.notifications.filter((item) => {
            return item.id !== id;
        });

        return {
            ...state,
            notifications: updatedNotifications,
        };
    }),

    on(loadNotificationsSuccess, (state, action) => {
        return {
            ...state,
            notifications: action.notifications,
        };
    })
);



export function notificationsReducer(state, action) {
    return _notificationsReducer(state, action);
}