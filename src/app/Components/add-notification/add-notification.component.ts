import { Notification } from './../../Models/notification';
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Store } from "@ngrx/store";
import { MasterService } from 'src/app/Services/master.service';
import { NotificationService } from 'src/app/Services/notification.service';
import { AppState } from "src/app/State/app.state";
import { addNotification } from "src/app/State/Notification/notification.action";


@Component({
  selector: 'app-add-notification',
  templateUrl: './add-notification.component.html',
  styleUrls: ['./add-notification.component.scss']
})
export class AddNotificationComponent implements OnInit {
  companyTypeList: { id: number; name: string; }[];
  marketList: { id: number; name: string; }[];

  basicForm = new FormGroup({
    companyName: new FormControl(),
    companyNumber: new FormControl(),
    companyType: new FormControl(),
    market: new FormControl(),
  });
  constructor(private masterService: MasterService,
    private notificationSerive: NotificationService,
    private store: Store<AppState>) { }

  ngOnInit(): void {
    this.companyTypeList = this.masterService.getCompanyType();
    this.marketList = this.masterService.getMarket();
  }
  submitCompanyDetails() {
    // var data = this.basicForm.value;
    // this.notificationSerive.addNotifucation(data);
    // this.valueChange.emit();
    const notification: Notification = {
      companyName: this.basicForm.value.companyName,
      companyNumber: this.basicForm.value.companyNumber,
      companyType: this.basicForm.value.companyType,
      market: this.basicForm.value.market,
    };
    this.store.dispatch(addNotification({ notification }));
  }

}
