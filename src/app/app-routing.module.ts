import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VoyagesComponent } from './voyages/voyages.component';
import { AddVoyageComponent } from './add-voyage/add-voyage.component';
import { UpdateVoyageComponent } from './update-voyage/update-voyage.component';
import { RechercheParTypeComponent } from './recherche-par-type/recherche-par-type.component';
import { RechercheParDestinationComponent } from './recherche-par-destination/recherche-par-destination.component';
import { ListeTypesComponent } from './liste-types/liste-types.component';
import { LoginComponent } from './login/login.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { voyageGuard } from './voyage.guard';
import { RegisterComponent } from './register/register.component';
import { VerifEmailComponent } from './verif-email/verif-email.component';

const routes: Routes = [
 { path: "voyages", component : VoyagesComponent},
 { path: "add-voyage", component : AddVoyageComponent , canActivate:[voyageGuard]},
 {path: "updateVoyage/:id", component: UpdateVoyageComponent},
 {path: "rechercheParType", component : RechercheParTypeComponent},
 {path: "rechercheParDestination", component : RechercheParDestinationComponent},
 {path: "listeTypes", component : ListeTypesComponent , canActivate:[voyageGuard]},
 {path: 'login', component: LoginComponent},
 {path: 'app-forbidden', component: ForbiddenComponent},
 {path:'register',component:RegisterComponent},
 { path: 'verifEmail', component: VerifEmailComponent },
 { path: "", redirectTo: "voyages", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
