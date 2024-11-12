import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { Voyage } from '../model/voyage.model';
import { Type } from '../model/type.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiURL } from '../config';
import { TypeWrapper } from '../model/typeWrapped.model';

const httpOptions = {
headers: new HttpHeaders( {'Content-Type': 'application/json'} )
};

@Injectable({
  providedIn: 'root'
})
export class VoyageService {

  apiURLType: string = 'http://localhost:8080/voyages/type';


 
  voyages! : Voyage[];
  types! : Type[];


  constructor(private http : HttpClient,
    private authService : AuthService
  ) {


   }

 
    listeVoyages(): Observable<Voyage[]>{
      return this.http.get<Voyage[]>(apiURL+"/all"); 
      }



    ajouterVoyage( voy: Voyage):Observable<Voyage>{
      let jwt = this.authService.getToken(); 
      jwt = "Bearer "+jwt; 
      let httpHeaders = new HttpHeaders({"Authorization":jwt})  
   return this.http.post<Voyage>(apiURL+"/addvoy", voy, {headers:httpHeaders});
      }



    supprimerVoyage(id : number) {
      const url = `${apiURL}/delvoy/${id}`; 
      let jwt = this.authService.getToken(); 
      jwt = "Bearer "+jwt; 
      let httpHeaders = new HttpHeaders({"Authorization":jwt})  
        return this.http.delete(url,  {headers:httpHeaders});
      }
      



      consulterVoyage(id: number): Observable<Voyage> {
        const url = `${apiURL}/getbyid/${id}`; 
        let jwt = this.authService.getToken(); 
        jwt = "Bearer "+jwt; 
        let httpHeaders = new HttpHeaders({"Authorization":jwt})  
          return this.http.get<Voyage>(url,{headers:httpHeaders}); 
      }
        

      trierVoyages(){
        this.voyages = this.voyages.sort((n1,n2) => {
        if (n1.idVoyage! > n2.idVoyage!) {
        return 1;
        }
        if (n1.idVoyage! < n2.idVoyage!) {
        return -1;
        }
        return 0;
        });
      }
        



    updateVoyage(voy :Voyage) : Observable<Voyage>
    {
      let jwt = this.authService.getToken(); 
          jwt = "Bearer "+jwt; 
          let httpHeaders = new HttpHeaders({"Authorization":jwt})  
      return this.http.put<Voyage>(apiURL+"/updatevoy", voy, {headers:httpHeaders});
    }



      consulterType(id:number): Type{ 
      return this.types.find(cat => cat.idType == id)!;
      }

      listeTypes():Observable<TypeWrapper>{
        let jwt = this.authService.getToken(); 
        jwt = "Bearer "+jwt; 
        let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
        return this.http.get<TypeWrapper>(this.apiURLType,{headers:httpHeaders});
        }


        rechercherParType(id: number):Observable< Voyage[]> {
          const url = `${apiURL}/voystype/${id}`;
          return this.http.get<Voyage[]>(url);
          }

          rechercherParDestination(dest: string):Observable< Voyage[]> {
            const url = `${apiURL}/voysByDestination/${dest}`;
            return this.http.get<Voyage[]>(url);
            }

            ajouterType( tp: Type):Observable<Type>{
              return this.http.post<Type>(this.apiURLType, tp, httpOptions);
              }
              
        
      

    

}
