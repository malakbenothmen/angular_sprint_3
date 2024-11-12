import { Component, OnInit } from '@angular/core';
import { Voyage } from '../model/voyage.model';
import { VoyageService } from '../services/voyage.service';

@Component({
  selector: 'app-recherche-par-destination',
  templateUrl: './recherche-par-destination.component.html'
})
export class RechercheParDestinationComponent implements OnInit{

  destinationVoy! : string ;
  searchTerm! : string ;
  voyages! : Voyage[];
  Allvoyages! : Voyage[];

  constructor(private voyageService : VoyageService){}
  ngOnInit(): void {
    this.voyageService.listeVoyages().subscribe(prods => {
      console.log(prods);
      this.Allvoyages = prods;
      this.voyages =prods ;
      });
    
  }

  onKeyUp(filterText : string){
    this.voyages = this.Allvoyages.filter(item =>
    item.destination.toLowerCase().includes(filterText));
    }
    


  rechercherVoys(){
    this.voyageService.rechercherParDestination(this.destinationVoy).
    subscribe(voys => {
    this.voyages = voys; 
    console.log(voys)});
    }

}
