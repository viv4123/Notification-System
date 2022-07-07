import { Notification } from './../../Models/notification';
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { MasterService } from 'src/app/Services/master.service';
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
    companyName: new FormControl('', [Validators.required]),
    companyNumber: new FormControl('', [Validators.required]),
    companyType: new FormControl('', [Validators.required]),
    market: new FormControl('', [Validators.required]),
  });
  constructor(private masterService: MasterService,
    private store: Store<AppState>) { }

  ngOnInit(): void {
    this.companyTypeList = this.masterService.getCompanyType();
    this.marketList = this.masterService.getMarket();
  }
  submitCompanyDetails() {
    if (!this.basicForm.valid) {
      return;
    }
    const notification: Notification = {
      companyName: this.basicForm.value.companyName,
      companyNumber: this.basicForm.value.companyNumber,
      companyType: this.basicForm.value.companyType,
      market: this.basicForm.value.market,
    };
    this.store.dispatch(addNotification({ notification }));
  }

}
