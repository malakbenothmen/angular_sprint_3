import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VoyageService } from '../services/voyage.service';
import { Voyage } from '../model/voyage.model';
import { Type } from '../model/type.model';
import { Image } from '../model/image.model';

@Component({
  selector: 'app-update-voyage',
  templateUrl: './update-voyage.component.html'
})
export class UpdateVoyageComponent implements OnInit {

  currentVoyage = new Voyage();
  types! : Type[];
  updatedTypeId! : number;
  myImage! : string; 
  uploadedImage!: File; 
  isImageUpdated: Boolean=false; 


  constructor(private activatedRoute: ActivatedRoute,
    private router : Router,
    private voyageService: VoyageService)
  {}


 /* ngOnInit(): void {
    this.voyageService.listeTypes().
    subscribe(tps => {this.types = tps._embedded.types;
    console.log(this.types);
    });
    this.voyageService.consulterVoyage(this.activatedRoute.snapshot.params['id']).
    subscribe( voy =>{ this.currentVoyage = voy; 
                  this.updatedTypeId =  this.currentVoyage.type.idType;
                  console.log(this.updatedTypeId);

                  this.voyageService 
                  .loadImage(this.currentVoyage.image.idImage) 
                  .subscribe((img: Image) => { 
                  this.myImage = 'data:' + img.type + ';base64,' + img.image; 
});    
 } ) ; }*/

 ngOnInit(): void { 
  this.voyageService.listeTypes(). 
  subscribe(cats => {this.types = cats._embedded.types; 
  }); 

 this.voyageService.consulterVoyage(this.activatedRoute.snapshot.params['id'])
.subscribe( voy =>{ this.currentVoyage = voy; 
      this.updatedTypeId =   voy.type.idType; 
  } ) ; 
  } 

 /* updateVoyage()
  { this.currentVoyage.type = this.types.find(cat => cat.idType == this.updatedTypeId)!;

     //tester si l'image du produit a été modifiée 
     if (this.isImageUpdated) 
      {     
        this.voyageService 
        .uploadImage(this.uploadedImage, this.uploadedImage.name) 
        .subscribe((img: Image) => { 
          this.currentVoyage.image = img; 
        
                 this.voyageService 
                   .updateVoyage(this.currentVoyage) 
                   .subscribe((voy) => { 
                      this.router.navigate(['voyages']); 
                                }); 
          }); 
        }
        else { 
   
    this.voyageService.updateVoyage(this.currentVoyage).subscribe(voy => {
    this.router.navigate(['voyages']); }
      )
    }
  }*/

    updateVoyage() { 
      this.currentVoyage.type = this.types.find(cat => cat.idType == 
  this.updatedTypeId)!;         
            this.voyageService 
              .updateVoyage(this.currentVoyage) 
              .subscribe((voy) => { 
                this.router.navigate(['voyages']); 
              }); 
    } 

  onImageUpload(event: any) { 
    if(event.target.files && event.target.files.length) { 
      this.uploadedImage = event.target.files[0]; 
       this.isImageUpdated =true; 
      const reader = new FileReader(); 
      reader.readAsDataURL(this.uploadedImage); 
      reader.onload = () => { this.myImage = reader.result as string;  }; 
    } 
 } 

  onAddImageVoyage() { 
    this.voyageService
    .uploadImageVoy(this.uploadedImage, this.uploadedImage.name,this.currentVoyage.idVoyage) 
    .subscribe( (img : Image)  => { 
            this.currentVoyage.images.push(img); 
            }); 
  } 

  supprimerImage(img: Image){ 
    let conf = confirm("Etes-vous sûr ?"); 
    if (conf) 
       this.voyageService.supprimerImage(img.idImage).subscribe(() => { 
          //supprimer image du tableau currentProduit.images     
          const index = this.currentVoyage.images.indexOf(img, 0); 
          if (index > -1) { 
            this.currentVoyage.images.splice(index, 1); 
          } 
     }); 
   } 


}
