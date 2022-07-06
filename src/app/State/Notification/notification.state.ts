import { Notification } from './../../Models/notification';



export interface NotificationsState {
    notifications: Notification[];
}

export const initialState: NotificationsState = {
    notifications: null,
};