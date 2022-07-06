import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const typeList = [
  { id: 1, name: 'Small' },
  { id: 2, name: 'Medium' },
  { id: 3, name: 'Large' }
]

const market = [
  { id: 1, name: 'Denmark' },
  { id: 2, name: 'Norway' },
  { id: 3, name: 'Sweden' },
  { id: 4, name: 'Finland' }
]

@Injectable({
  providedIn: 'root'
})

export class MasterService {

  constructor(private http: HttpClient) { }

  getCompanyType() {
    return typeList;
  }

  getMarket() {
    return market;
  }
  getCompanyTypeById(id) {
    return typeList.find(x => x.id == id)
  }
  getMarketById(id) {
    return market.find(x => x.id == id);
  }
}
