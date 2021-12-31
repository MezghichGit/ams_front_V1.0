import { Component, OnInit } from '@angular/core';
import { ProviderService } from './../services/provider.service';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-update-provider',
  templateUrl: './update-provider.component.html',
  styleUrls: ['./update-provider.component.css']
})
export class UpdateProviderComponent implements OnInit {
  public urlUpload = environment.urlUploadImage;
  public id;
  private providerToUpdate;
  public name;
  public email;
  public adress;
  public nomImage;
  selectedFile: File;

  constructor(private service: ProviderService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(
      params => {
        this.id = params.get('id');
      }
    );
    this.providerToUpdate = this.service.getProvider(this.id).subscribe(
      response => {
        //console.log(response);
        this.name = response["name"];
        this.email = response["email"];
        this.adress = response["address"];
        this.nomImage = response["nomImage"];
      }

    );
    // this.initFormUpdateProvider(myform);
  }

  //Gets called when the user selects an image
  public onFileChanged(event) {
    //Select File
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
  }

  updateProvider() {
    this.providerToUpdate = {
      'name': this.name,
      'email': this.email,
      'address': this.adress,
      'id': this.id
    }

    const provider = new FormData();
    provider.append('imageFile', this.selectedFile, this.selectedFile.name);
    provider.append('imageName',this.selectedFile.name);
    provider.append('name', this.name);
    provider.append('email', this.email);
    provider.append('address', this.adress);
    provider.append('id', this.id);

    //this.service.updateProvider(this.providerToUpdate).subscribe(
      this.service.updateProvider(provider,this.id).subscribe(
      response => {
        console.log(response);
        this.router.navigate(['providerList']);
      }
    );

  }

}
