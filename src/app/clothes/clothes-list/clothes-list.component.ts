import { Component, OnInit } from '@angular/core';
import { Clothe } from '../clothe';
import { ClothesService } from '../clothes.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClotheDetailComponent } from '../clothe-detail/clothe-detail.component';

@Component({
   selector: 'app-clothes-list',
   templateUrl: './clothes-list.component.html',
   styleUrls: ['./clothes-list.component.css']
})
export class ClothesListComponent implements OnInit {

   clothes: Clothe[] = [];
   codeHttp = null; //Création de la variable codeHttp pour afficher message du codeHttp dans le html

   brands: any[] = [];
   categories: any[] = [];
   colors: any[] = [];
   features: any[] = [];
   notes: any[] = [];
   occasions: any[] = [];

   _selectedFilter: string = "clothes"; //correspond au [(ngModel)] du html. _obligatoire pour éviter boucle infinie
   _selectedOption: string = ""; //correspond au [(ngModel)] du html. _obligatoire pour éviter boucle infinie

   selectedBrand: string = "";
   selectedCateg: string = "";
   selectedCol: string = "";
   selectedFeat: string = "";
   selectedOccas: string = "";

   //injection de dépendance de mon service ClothesService
   constructor(private service: ClothesService, private modalService: NgbModal) { }

   get selectedFilter(): string {
      return this._selectedFilter;
   }
   set selectedFilter(selectedFilter: string) {
      this._selectedOption = "";
      this._selectedFilter = selectedFilter;

      this.service.getSpecificFilter().subscribe(response => {
         this.clothes = response.body;
         // console.log(JSON.stringify(specificFeatureFromService));
         this.codeHttp = response.status;
      },
         error => {
            this.codeHttp = error.status; //Récupère la réponse du serveur (Erreur) et l'insère dans codeHttp
            console.log("Erreur lors de l'appel au service clothes.service - specificFilter -- " + error);
         });

      console.log(this._selectedFilter);
   }

   get selectedOption(): string {
      return this._selectedOption;
   }
   set selectedOption(selectedOption: string) {
      this._selectedOption = selectedOption;
      console.log(this._selectedOption);
      if (this._selectedOption) {
         this.service.getSpecificFilterOpt(this._selectedFilter, this._selectedOption).subscribe(response => {
            this.clothes = response.body;
            // console.log(JSON.stringify(specificFeatureFromService));
            this.codeHttp = response.status;
         },
            error => {
               this.codeHttp = error.status; //Récupère la réponse du serveur (Erreur) et l'insère dans codeHttp
               console.log("Erreur lors de l'appel au service clothes.service - specificFilterOpt -- " + error);
            });
      }
   }

   ngOnInit() {
      this.service.getAllBrands().subscribe(response => {
         this.brands = response.body;
         // console.log(JSON.stringify(brandFromService));
         this.codeHttp = response.status;
      },
         error => {
            this.codeHttp = error.status; //Récupère la réponse du serveur (codeHttp) et l'insère dans codeHttp
            console.log("Erreur lors de l'appel au service clothes.service - brands -- " + error);
         });

      this.service.getAllCategories().subscribe(response => {
         this.categories = response.body;
         // console.log(JSON.stringify(categoryFromService));
         this.codeHttp = response.status;
      },
         error => {
            this.codeHttp = error.status; //Récupère la réponse du serveur (Erreur) et l'insère dans codeHttp
            console.log("Erreur lors de l'appel au service clothes.service - categories -- " + error);
         });

      this.callGetAllClothes(); //appelle la fonction qui permet de récupérer tous les vêtements en bdd

      this.service.getAllColors().subscribe(response => {
         this.colors = response.body;
         // console.log(JSON.stringify(colorFromService));
         this.codeHttp = response.status;
      },
         error => {
            this.codeHttp = error.status; //Récupère la réponse du serveur (Erreur) et l'insère dans codeHttp
            console.log("Erreur lors de l'appel au service clothes.service - colors -- " + error);
         });

      this.service.getAllFeatures().subscribe(response => {
         this.features = response.body;
         // console.log(JSON.stringify(featFromService));
         this.codeHttp = response.status;
      },
         error => {
            this.codeHttp = error.status; //Récupère la réponse du serveur (Erreur) et l'insère dans codeHttp
            console.log("Erreur lors de l'appel au service clothes.service - features -- " + error);
         });

      this.service.getAllNotes().subscribe(response => {
         this.notes = response.body;
         // console.log(JSON.stringify(occasFromService));
         this.codeHttp = response.status;
      },
         error => {
            this.codeHttp = error.status; //Récupère la réponse du serveur (Erreur) et l'insère dans codeHttp
            console.log("Erreur lors de l'appel au service clothes.service - notes -- " + error);
         });

      this.service.getAllOccasions().subscribe(response => {
         this.occasions = response.body;
         // console.log(JSON.stringify(occasFromService));
         this.codeHttp = response.status;
      },
         error => {
            this.codeHttp = error.status; //Récupère la réponse du serveur (Erreur) et l'insère dans codeHttp
            console.log("Erreur lors de l'appel au service clothes.service - occasions -- " + error);
         });

   }

   //gestion de la modale
   //ouvre la modale en lui passant l'id du vêtement cliqué
   open(idClthe) {
      const modalRef = this.modalService.open(ClotheDetailComponent); //ouvre une modale dont le contenu est ClotheDetailComponent
      modalRef.componentInstance.idClothe = idClthe; //récupère l'id du vêtement cliqué et le passe au component modale

      //permet de recharger la liste des vêtements lorsque la modale est fermée
      //utilise la classe NgbModalRef
      modalRef.result.then((result) => {
         //quand on clique sur supprimer dans la modale, cette fonction rafraichit la liste des vêtements. Result : promesse résolue quand la modale est fermée.
         this.callGetAllClothes();
      }, (reason) => {
         //quand on ferme la modale d'une manière différente (par ex click à coté), cette fonction rafraichit la liste des vêtements. reason : Promesse rejetée quand modale dismiss.
         this.callGetAllClothes();
      });
   }

   //fonction permettant d'aller chercher dans le service la liste de tous les vêtements.
   private callGetAllClothes(){
      this.service.getAllClothes().subscribe(response => {
         this.clothes = response.body;
         this.codeHttp = response.status;
      },
         error => {
            this.codeHttp = error.status; //Récupère la réponse du serveur (Erreur) et l'insère dans codeHttp
            console.log("Erreur lors de l'appel au service clothes.service - clothes -- " + error);
         });
   }
}