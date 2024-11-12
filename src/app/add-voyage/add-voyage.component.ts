import { Component, OnInit } from '@angular/core';
import { Voyage } from '../model/voyage.model';
import { VoyageService } from '../services/voyage.service';
import { types } from 'util';
import { Type } from '../model/type.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-voyage',
  templateUrl: './add-voyage.component.html'
})
export class AddVoyageComponent implements OnInit{
  newVoyage = new Voyage();

  types! : Type[];
  newIdType! : number ;
  newType! : Type ;


  constructor(private voyageService :VoyageService,
    private router : Router
  ){}


  ngOnInit(): void {
    this.voyageService.listeTypes().
    subscribe(tps => {this.types = tps._embedded.types;
    console.log(this.types);
  });

    
    
  }

  /*addVoyage() {
    //console.log(this.newVoyage);
    this.newType = this.voyageService.consulterType(this.newIdType);
    this.newVoyage.type=this.newType;
    this.voyageService.ajouterVoyage(this.newVoyage);
    this.router.navigate(['voyages']);
  }*/

  addVoyage(){
    this.newVoyage.type = this.types.find(cat => cat.idType == this.newIdType)!;
    this.voyageService.ajouterVoyage(this.newVoyage).subscribe(voy => {
    console.log(voy);
    this.router.navigate(['voyages']);
    });
    }
    

}
