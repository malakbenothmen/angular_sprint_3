import { Component, OnInit } from '@angular/core';
import { Voyage } from '../model/voyage.model';
import { VoyageService } from '../services/voyage.service';
import { types } from 'util';
import { Type } from '../model/type.model';
import { Router } from '@angular/router';
import { Image } from '../model/image.model';

@Component({
  selector: 'app-add-voyage',
  templateUrl: './add-voyage.component.html'
})
export class AddVoyageComponent implements OnInit{
  newVoyage = new Voyage();

  types! : Type[];
  newIdType! : number ;
  newType! : Type ;
  uploadedImage!: File; 
  imagePath: any; 


  constructor(private voyageService :VoyageService,
    private router : Router
  ){}


  ngOnInit(): void {
    this.voyageService.listeTypes().
    subscribe(tps => {this.types = tps._embedded.types;
    console.log(this.types);
  });

    
    
  }


    addVoyage(){ 
      this.voyageService 
      .uploadImage(this.uploadedImage, this.uploadedImage.name) 
      .subscribe((img: Image) => { 
        
           this.newVoyage.image=img; 
           this.newVoyage.type = this.types.find(cat => cat.idType == this.newIdType)!; 
            this.voyageService 
              .ajouterVoyage(this.newVoyage) 
              .subscribe(() => { 
                this.router.navigate(['voyages']); 
              }); 
      }); 
      }
      
      
  onImageUpload(event: any) { 
    this.uploadedImage = event.target.files[0]; 
     
    var reader = new FileReader(); 
    reader.readAsDataURL(this.uploadedImage); 
    reader.onload = (_event) => {  this.imagePath = reader.result;    } 
  } 

    

}
