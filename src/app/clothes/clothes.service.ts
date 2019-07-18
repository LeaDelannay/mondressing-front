import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from "rxjs";
import { Clothe } from './clothe';

@Injectable({
   providedIn: 'root'
})
export class ClothesService {

   private baseUrl: string = "http://localhost:3000/api";

   constructor(public http: HttpClient) { }

   //création
   //Création d'une marque - permet d'envoyer les valeurs à enregistrer en base de données
   public addNewBrand(brand: any): Observable<HttpResponse<any[]>> {
      return this.http.post<any[]>(`${this.baseUrl}/brands`, brand, { observe: 'response' });
   }

   //Création d'une catégorie - permet d'envoyer les valeurs à enregistrer en base de données
   public addNewCategory(category: any): Observable<HttpResponse<any[]>> {
      return this.http.post<any[]>(`${this.baseUrl}/categories`, category, { observe: 'response' });
   }

   //Création d'un vêtement - permet d'envoyer les valeurs à enregistrer en base de données
   public addNewClothe(clothe: Clothe): Observable<HttpResponse<any[]>> {
      return this.http.post<any[]>(`${this.baseUrl}/clothes`, clothe, { observe: 'response' });
   }

   //Création d'une couleur - permet d'envoyer les valeurs à enregistrer en base de données
   public addNewColor(color: any): Observable<HttpResponse<any[]>> {
      return this.http.post<any[]>(`${this.baseUrl}/colors`, color, { observe: 'response' });
   }

   //Création d'une caractéristique/feature - permet d'envoyer les valeurs à enregistrer en base de données
   public addNewFeature(feature: any): Observable<HttpResponse<any[]>> {
      return this.http.post<any[]>(`${this.baseUrl}/features`, feature, { observe: 'response' });
   }

   //Création d'une occasion - permet d'envoyer les valeurs à enregistrer en base de données
   public addNewOccasion(occasion: any): Observable<HttpResponse<any[]>> {
      return this.http.post<any[]>(`${this.baseUrl}/occasions`, occasion, { observe: 'response' });
   }

   //récupère la liste de toutes les marques en base de données
   //on ajoute l'option {observe:'response'} afin de retourner toute la http response et pas juste le body
   //pour cela, on ajoute HttpResponse à l'observable : l'observable est typé HttpResponse qui contient lui même un tableau de any
   public getAllBrands(): Observable<HttpResponse<any[]>> {
      return this.http.get<any[]>(`${this.baseUrl}/brands`, { observe: 'response' });
   }

   //récupère la liste de toutes les catégories en base de données
   public getAllCategories(): Observable<HttpResponse<any[]>> {
      return this.http.get<any[]>(`${this.baseUrl}/categories`, { observe: 'response' });
   }

   //récupère la liste de tous les vêtements en base de données
   public getAllClothes(): Observable<HttpResponse<Clothe[]>> {
      return this.http.get<Clothe[]>(`${this.baseUrl}/clothes`, { observe: 'response' });
   }

   //récupère la liste de toutes les couleurs en base de données
   public getAllColors(): Observable<HttpResponse<any[]>> {
      return this.http.get<any[]>(`${this.baseUrl}/colors`, { observe: 'response' });
   }

   //récupère la liste de toutes les caracteristiques en base de données
   public getAllFeatures(): Observable<HttpResponse<any[]>> {
      return this.http.get<any[]>(`${this.baseUrl}/features`, { observe: 'response' });
   }

   //récupère la liste de toutes les notes en base de données
   public getAllNotes(): Observable<HttpResponse<any[]>> {
      return this.http.get<any[]>(`${this.baseUrl}/notes`, { observe: 'response' });
   }

   //récupère la liste de toutes les occasions en base de données
   public getAllOccasions(): Observable<HttpResponse<any[]>> {
      return this.http.get<any[]>(`${this.baseUrl}/occasions`, { observe: 'response' });
   }

   //récupère un vêtement spécifique grâce à l'id
   public getSpecificClothe(idClothe: number): Observable<HttpResponse<Clothe>> {
      return this.http.get<any>(`${this.baseUrl}/clothes/${idClothe}`, { observe: 'response' });
   }

   //récupère la liste des vetements contenant un filtre précis en base de données
   public getSpecificFilter(): Observable<HttpResponse<any[]>> {
      return this.http.get<any[]>(`${this.baseUrl}/clothes`, { observe: 'response' });
   }

   //récupère la liste des vetements contenant filtre et option précis en base de données
   public getSpecificFilterOpt(selectedFilter: string, selectedOption: string): Observable<HttpResponse<any[]>> {
      return this.http.get<any[]>(`${this.baseUrl}/${selectedFilter}/${selectedOption}`, { observe: 'response' });
   }

   //liste des noms de marques en base de données
   public getAllBrandsName(): Observable<HttpResponse<Clothe[]>> {
      return this.http.get<Clothe[]>(`${this.baseUrl}/brands/brandname`, { observe: 'response' });
   }

   //liste des noms de catégories en base de données
   public getAllCategoriesName(): Observable<HttpResponse<Clothe[]>> {
      return this.http.get<Clothe[]>(`${this.baseUrl}/categories/categoryname`, { observe: 'response' });
   }

   //liste des noms de vêtements en base de données
   public getAllClothesName(): Observable<HttpResponse<Clothe[]>> {
      return this.http.get<Clothe[]>(`${this.baseUrl}/clothes/clothename`, { observe: 'response' });
   }

   //liste des noms de couleurs en base de données
   public getAllColorsName(): Observable<HttpResponse<Clothe[]>> {
      return this.http.get<Clothe[]>(`${this.baseUrl}/colors/colorname`, { observe: 'response' });
   }

   //liste des noms de caractéristiques en base de données
   public getAllFeaturesName(): Observable<HttpResponse<Clothe[]>> {
      return this.http.get<Clothe[]>(`${this.baseUrl}/features/featurename`, { observe: 'response' });
   }

   //liste des noms de occasions en base de données
   public getAllOccasionsName(): Observable<HttpResponse<Clothe[]>> {
      return this.http.get<Clothe[]>(`${this.baseUrl}/occasions/occasionname`, { observe: 'response' });
   }

   //supression
   //supression d'un vêtement + tables associatives en base de données
   public deleteClothe(idClothe: number): Observable<HttpResponse<Clothe[]>> {
      return this.http.delete<Clothe[]>(`${this.baseUrl}/clothes/${idClothe}`, { observe: 'response' });
   }

   //modification
   //modification d'un vêtement + tables associatives en base de données
   public updateClothe(clothe: Clothe): Observable<HttpResponse<Clothe>> {
      return this.http.put<Clothe>(`${this.baseUrl}/clothes`, clothe, { observe: 'response' });
   }

}