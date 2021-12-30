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
    //const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(this.username + ':' + this.password) });

    //return this.Http.get(this.baseUrl  + '/list',{ headers });
    return this.Http.get(this.baseUrl  + '/list');
  }
  createProvider(myform) {
    //const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(this.username + ':' + this.password) });
    this.provider = {
      'name': myform.value.providerName,
      'email': myform.value.providerEmail,
      'address': myform.value.providerAdress
    }
    //return this.Http.post(this.baseUrl  + '/add', this.provider,{ headers });
    return this.Http.post(this.baseUrl  + '/add', this.provider);
  }
  updateProvider(myObj) {
   // const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(this.username + ':' + this.password) });
    //return this.Http.put(this.baseUrl  + '/' + myObj['id'], myObj,{ headers });
    return this.Http.put(this.baseUrl  + '/' + myObj['id'], myObj);
  }
  deleteProvider(myObj) {
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(this.username + ':' + this.password) });
    //return this.Http.delete(this.baseUrl  + '/' + myObj['id'],{ headers })
    return this.Http.delete(this.baseUrl  + '/' + myObj['id'])
  }
  getProvider(id) {
    //const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(this.username + ':' + this.password) });
    //return this.Http.get(this.baseUrl + '/' + id,{ headers })
    return this.Http.get(this.baseUrl + '/' + id)
  }
}
