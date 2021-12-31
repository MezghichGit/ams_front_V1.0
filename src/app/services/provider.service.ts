import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ProviderService {


  username = sessionStorage.getItem('username');
  password = sessionStorage.getItem('password');

  baseUrl = environment.urlProviders;
  provider: any;
  constructor(private Http: HttpClient) { }
  listProviders() {
    return this.Http.get(this.baseUrl  + '/list');
  }
  createProvider(myform) {

    return this.Http.post(this.baseUrl  + '/add', myform);
  }

  updateProvider(myObj, id) {
       return this.Http.put(this.baseUrl  + '/' + id, myObj);
  }

  deleteProvider(myObj) {
    return this.Http.delete(this.baseUrl  + '/' + myObj['id'])
  }
  getProvider(id) {
    return this.Http.get(this.baseUrl + '/' + id)
  }
}
