import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { Voyage } from '../model/voyage.model';
import { Type } from '../model/type.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiURL } from '../config';
import { TypeWrapper } from '../model/typeWrapped.model';
import { Image } from '../model/image.model';

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


      uploadImage(file: File, filename: string): Observable<Image>{ 
          const imageFormData = new FormData(); 
          imageFormData.append('image', file, filename); 
          const url = `${apiURL + '/image/upload'}`; 
          return this.http.post<Image>(url, imageFormData); 
             } 
         
      loadImage(id: number): Observable<Image> { 
          const url = `${apiURL + '/image/get/info'}/${id}`; 
          return this.http.get<Image>(url); 
        }

        uploadImageVoy(file: File, filename: string, idVoy:number): Observable<any>{ 
          const imageFormData = new FormData(); 
          imageFormData.append('image', file, filename); 
          const url = `${apiURL + '/image/uplaodImageVoy'}/${idVoy}`; 
          return this.http.post(url, imageFormData); 
        } 

        supprimerImage(id : number) { 
          const url = `${apiURL}/image/delete/${id}`; 
          return this.http.delete(url, httpOptions); 
          } 
              
        
      

    

}
