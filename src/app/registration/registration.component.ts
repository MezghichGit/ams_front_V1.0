import { Component, OnInit } from '@angular/core';
import { RegistrationService } from '../services/registration.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(private service: RegistrationService, private router: Router) { }

  ngOnInit(): void {
  }

  createUser(myform){
    this.service.createUser(myform).subscribe(
      response => {
        console.log(response);
        alert("Inscription avec succes!")
        this.router.navigate(['login']);
      }
    );
  }

}
