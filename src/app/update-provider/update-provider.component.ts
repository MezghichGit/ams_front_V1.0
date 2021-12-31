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
  public nomOldImage="";
  public nomNewImage="";
  selectedFile: File;

  constructor(private service: ProviderService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(
      params => {
        this.id = params.get('id');
      }
    );

    this.service.getProvider(this.id).subscribe(
      response => {
        this.name = response["name"];
        this.email = response["email"];
        this.adress = response["address"];
        this.nomOldImage = response["nomImage"];
      }

    );
  }

  //Gets called when the user selects an image
  public onFileChanged(event) {
    //Select File
    this.selectedFile = event.target.files[0];
  }

  updateProvider() {

    const provider = new FormData();
    provider.append('imageFile', this.selectedFile, this.selectedFile.name);
    provider.append('imageName',this.selectedFile.name);
    provider.append('name', this.name);
    provider.append('email', this.email);
    provider.append('address', this.adress);
    provider.append('id', this.id);

      this.service.updateProvider(provider,this.id).subscribe(
      response => {
        this.router.navigate(['listProvider']);
      }
    );

  }

}
