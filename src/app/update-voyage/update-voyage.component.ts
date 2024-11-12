import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VoyageService } from '../services/voyage.service';
import { Voyage } from '../model/voyage.model';
import { Type } from '../model/type.model';

@Component({
  selector: 'app-update-voyage',
  templateUrl: './update-voyage.component.html'
})
export class UpdateVoyageComponent implements OnInit {

  currentVoyage = new Voyage();
  types! : Type[];
  updatedTypeId! : number;


  constructor(private activatedRoute: ActivatedRoute,
    private router : Router,
    private voyageService: VoyageService)
  {}


  ngOnInit(): void {
    this.voyageService.listeTypes().
    subscribe(tps => {this.types = tps._embedded.types;
    console.log(this.types);
    });
    this.voyageService.consulterVoyage(this.activatedRoute.snapshot.params['id']).
    subscribe( voy =>{ this.currentVoyage = voy; 
                  this.updatedTypeId =  this.currentVoyage.type.idType;
                  console.log(this.updatedTypeId);
 } ) ;
    

    
  }

  updateVoyage()
  { this.currentVoyage.type = this.types.find(cat => cat.idType == this.updatedTypeId)!;
   
    this.voyageService.updateVoyage(this.currentVoyage).subscribe(voy => {
    this.router.navigate(['voyages']); }
      )
  }


}
