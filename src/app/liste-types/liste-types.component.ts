import { Component, OnInit } from '@angular/core';
import { VoyageService } from '../services/voyage.service';
import { Type } from '../model/type.model';

@Component({
  selector: 'app-liste-types',
  templateUrl: './liste-types.component.html'
})
export class ListeTypesComponent implements OnInit{
  types! : Type[] ;
  updatedType :Type = {"idType":0,"nomType":"", "descriptionType":""};
  
  ajout:boolean=true;


  constructor(private voyageService : VoyageService){}
  ngOnInit(): void {
    this.voyageService.listeTypes().
    subscribe(cats => {this.types = cats._embedded.types;
    console.log(cats);
});
    
  }

  typeUpdated(cat:Type){
    console.log("Cat updated event",cat);
    this.voyageService.ajouterType(cat).
     subscribe( ()=> this.chargerCategories());
    }

    chargerCategories(){
      this.voyageService.listeTypes().
      subscribe(cats => {this.types = cats._embedded.types;
      console.log(cats);
      });
      }

      updateType(tp : Type)
      {this.updatedType=tp;
        this.ajout=false; 
      }
      

}
