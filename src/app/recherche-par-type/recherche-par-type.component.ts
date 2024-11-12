import { Component, OnInit } from '@angular/core';
import { Voyage } from '../model/voyage.model';
import { Type } from '../model/type.model';
import { VoyageService } from '../services/voyage.service';

@Component({
  selector: 'app-recherche-par-type',
  templateUrl: './recherche-par-type.component.html'
})
export class RechercheParTypeComponent implements OnInit {
  IdType! : number ;
  types! : Type[] ;
  voyages! : Voyage[];

  constructor( private voyageService : VoyageService)
  {}

  ngOnInit(): void {
    this.voyageService.listeTypes().
subscribe(cats => {this.types = cats ._embedded.types
});
  }
  onChange() {
    this.voyageService.rechercherParType(this.IdType).
    subscribe(prods =>{this.voyages=prods});
  }
    

}

