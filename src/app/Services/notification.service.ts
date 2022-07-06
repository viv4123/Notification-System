import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';
import { Notification } from "../Models/notification";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http: HttpClient) { }

  notificationList = []
  notificationDateList = []


  getNotifications(): Observable<Notification[]> {
    /*TODO: Replace the URL*/
    /*
    return this.http
      .get<Notification[]>(`getNotificationURL`)
      .pipe(
        map((data) => {
          const notifications: Notification[] = [];
          return notifications;
        })
      );
      */
    this.getLocalStorage();
    const notifications: Notification[] = JSON.parse(localStorage.getItem("notificationList")) || [];
    return of(notifications);
  }


  addNotification(notification: Notification): Observable<{ id: any }> {
    /*TODO: Replace the URL*/
    /*
    return this.http.post<{ id: any }>(
      `https://vue-completecourse.firebaseio.com/posts.json`,
      notification
    );
    */

    let id = uuidv4();
    //logic to get the schedule based on creation date and other condtions
    let scheduleData = this.generateSchedule(notification, id);
    this.addItemToLocalStorage(notification, id, scheduleData);

    return of({ id: id });
  }

  getScheduleDtetails(id) {
    return this.notificationDateList.find(x => x.companyId == id);
  }

  getALLScheduleDtetails() {
    return JSON.parse(localStorage.getItem("notificationDateList")) || [];
  }

  deleteNotification(id: string) {
    /*TODO: Replace the URL*/
    // return this.http.delete(
    //   `URL/${id}.json`
    // );
    this.deleteItemFromLocalStorage(id);
    return of({ id })
  }


  private getLocalStorage() {
    this.notificationList = JSON.parse(localStorage.getItem("notificationList")) || [];
    this.notificationDateList = JSON.parse(localStorage.getItem("notificationDateList")) || [];
  }

  private setLocalStorage() {
    localStorage.setItem('notificationList', JSON.stringify(this.notificationList));
    localStorage.setItem('notificationDateList', JSON.stringify(this.notificationDateList));
  }
  private addItemToLocalStorage(notification, id, scheduleData) {
    notification.id = id;
    this.notificationList.push(notification);
    this.notificationDateList.push(scheduleData)
    this.setLocalStorage();
  }
  private deleteItemFromLocalStorage(id) {
    this.notificationList = this.notificationList.filter((item) => item.id !== id);
    this.notificationDateList = this.notificationDateList.filter((item) => item.companyId !== id);
    this.setLocalStorage();
  }

  private generateSchedule(details, id) {
    var sendDay, notificationDates = [];
    if (details.market == 1 || (details.market == 4 && details.compantType == 3)) {
      sendDay = [1, 5, 10, 15, 20];
    }
    else if (details.market == 2) {
      sendDay = [1, 5, 10, 20];
    }
    else if (details.market == 3 && (details.companyType == 1 || details.companyType == 2)) {
      sendDay = [1, 7, 14, 28];
    }
    else {
      return null;
    }

    for (var i = 0; i < sendDay.length; i++) {
      let date = new Date().setDate(new Date().getDate() + sendDay[i])
      notificationDates.push(new Date(date));
    }
    return { companyId: id, companyName: details.companyName, notificationDates: notificationDates };;
  }

}
