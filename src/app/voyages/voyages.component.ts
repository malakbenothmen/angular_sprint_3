import { Component, OnInit } from '@angular/core';
import { Voyage } from '../model/voyage.model';
import { VoyageService } from '../services/voyage.service';
import { AuthService } from '../services/auth.service';
import { Image } from '../model/image.model';

@Component({
  selector: 'app-voyages',
  templateUrl: './voyages.component.html'
})
export class VoyagesComponent implements  OnInit {

  voyages : Voyage[]=[];

 

  constructor(private voyageService : VoyageService,
    public authService: AuthService
  ) {
    
    
  }

  ngOnInit() : void
  {
    this.chargerVoyages();

      }

      chargerVoyages(){ 
        this.voyageService.listeVoyages().subscribe(voys => { 
          this.voyages = voys; 
     
          this.voyages.forEach((voy) => { 
       
              voy.imageStr = 'data:' +  voy.images[0].type + ';base64,' +  voy.images[0].image; 
            
          });          
        }); 
       }


 

      supprimerVoyage(v: Voyage)
      {
        let conf = confirm("Etes-vous sûr ?");
        if (conf)
        this.voyageService.supprimerVoyage(v.idVoyage).subscribe(() => {
        console.log("voyage supprimé");
        this.chargerVoyages();
      
        });
      } 



}
