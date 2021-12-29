import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ProviderService {

  baseUrl = environment.urlProviders;
  provider: any;
  constructor(private Http: HttpClient) { }
  listProviders() {
    return this.Http.get(this.baseUrl  + '/list');
  }
  createProvider(myform) {
    this.provider = {
      'name': myform.value.providerName,
      'email': myform.value.providerEmail,
      'address': myform.value.providerAdress
    }
    return this.Http.post(this.baseUrl  + '/add', this.provider);
  }
  updateProvider(myObj) {
    return this.Http.put(this.baseUrl  + '/' + myObj['id'], myObj);
  }
  deleteProvider(myObj) {
    return this.Http.delete(this.baseUrl  + '/' + myObj['id'])
  }
  getProvider(id) {
    return this.Http.get(this.baseUrl + '/' + id)
  }
}
