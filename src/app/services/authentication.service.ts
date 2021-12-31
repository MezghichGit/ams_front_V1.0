import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public susername = sessionStorage.getItem("username");;
  public sfname = sessionStorage.getItem("name");
  public slname = sessionStorage.getItem("lname");
  public srole = sessionStorage.getItem("role");


  constructor(private httpClient: HttpClient) { }

  authenticate(username, password) {

    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });

    return this.httpClient.get(environment.urlAuth, { headers }).pipe
      (
        map(
          userData => {
            console.log("Avant :" + userData);
            sessionStorage.setItem('username', username);
            sessionStorage.setItem('name', userData["name"]);
            sessionStorage.setItem('lname', userData["lastName"]);
            sessionStorage.setItem('role', userData["temp"]);
            //sessionStorage.setItem('token', userData["jwttoken"]);


            this.susername =sessionStorage.getItem("username");
            this.sfname =sessionStorage.getItem("name");
            this.slname =sessionStorage.getItem("lname");
            this.srole =sessionStorage.getItem("role");

            //NavbarComponent.user = sessionStorage.getItem('username');
            //sessionStorage.setItem('password', password);
            //console.log(username + " " + password);
            console.log(userData);

            let authString = 'Basic ' + btoa(username + ':' + password);
            sessionStorage.setItem('basicauth', authString);
            return userData;
          }
        )
      );

    /*if (username === "amine" && password === "1234") {
      sessionStorage.setItem('username', username)
      sessionStorage.setItem('password', password)
      return true;
    } else {
      return false;
    }*/
  }
  isUserLoggedIn() {
    let user = sessionStorage.getItem('username')
   // console.log(!(user === null))
    return !(user === null)
  }
  logOut() {
    sessionStorage.removeItem('username')
    sessionStorage.removeItem('password')
  }
}
