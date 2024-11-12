import { Type } from "./type.model";

export class Voyage {
    idVoyage! : number; 
    destination! : string;
    dateDepart! : Date; 
    dateRetour! : Date; 
    prixVoyage! : number; 
    nbPersonnes! : number; 
    moyTransport! : string; 
    description! : string;
    type! : Type ;

}