import { NotificationsState } from './Notification/notification.state';
import { SharedState } from './Shared/shared.state';
import { SHARED_STATE_NAME } from './Shared/shared.selector';
import { SharedReducer } from './Shared/shared.reducer';

import { notificationsReducer } from './Notification/notification.reducer';


export interface AppState {
    notifications: NotificationsState;
    [SHARED_STATE_NAME]: SharedState;
}

export const appReducer = {
    notifications: notificationsReducer,
    [SHARED_STATE_NAME]: SharedReducer,
};