import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-schedule-details',
  templateUrl: './schedule-details.component.html',
  styleUrls: ['./schedule-details.component.scss']
})
export class ScheduleDetailsComponent implements OnInit {
  @Input() notificationDates: any;
  constructor() { }

  ngOnInit(): void {
  }

  showbasedOnDate(date, index) {
    if (index == 0)
      return false;
    else
      return new Date() <= new Date(date);
  }
  getDateCount(index) {
    return Math.floor((Date.parse(this.notificationDates[index + 1]) - Date.parse(this.notificationDates[index])) / (1000 * 60 * 60 * 24));
  }

  getProgressValue(date, index) {
    let maxDays = this.getDateCount(index);
    let currenDayDiff = Math.floor((Date.parse(new Date().toISOString()) - Date.parse(date)) / (1000 * 60 * 60 * 24));
    if (currenDayDiff > maxDays)
      return 100;
    else
      return currenDayDiff * 100 / maxDays


  }
}
