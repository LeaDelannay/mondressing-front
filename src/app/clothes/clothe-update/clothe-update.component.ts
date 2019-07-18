import { Component, OnInit, Input } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { ClothesService } from '../clothes.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Clothe } from '../clothe';
import { NgForm } from '@angular/forms';

@Component({
   selector: 'app-clothe-update',
   templateUrl: './clothe-update.component.html',
   styleUrls: ['./clothe-update.component.css']
})
export class ClotheUpdateComponent implements OnInit {

   idClothe: any;
   statusCode = null;
   clotheDetail: Clothe = new Clothe(); //récupère le contenu renvoyé par le back

   //servent à l'ajout des éléments manquants en base de données
   brands: any[] = [];
   categories: any[] = [];
   colors: any[] = [];
   features: any[] = [];
   notes: any[] = [];
   occasions: any[] = [];

   // ngIf - sert côté front pour recharger la liste des éléments une fois le nouvel élément enregistré en bdd
   brandExists = true;
   categoryExists = true;
   colorExists = true;
   featureExists = true;
   occasionExists = true;

   // ngIf - sert côté front pour l'affichage de la phrase indiquant que le nom saisi existe déjà en bdd
   brandNameExists = false;
   categoryNameExists = false;
   clotheNameExists = false;
   colorNameExists = false;
   featureNameExists = false;
   occasionNameExists = false;

   // récupère la valeur saisie dans l'input pour ensuite le passer à la bdd via une fonction
   newBrand: string = "";
   newCategory: string = "";
   newColor: string = "";
   newFeature: string = "";
   newOccasion: string = "";

   //récupère la liste des noms en bdd - sert à vérifier si le nom saisi dans l'input existe en bdd
   brandNameJson: any[] = [];
   categoryNameJson: any[] = [];
   clotheNameJson: any[] = [];
   colorNameJson: any[] = [];
   featureNameJson: any[] = [];
   occasionNameJson: any[] = [];

   //Upload d'images
   URL = 'http://localhost:3000/api/upload';
   public uploader: FileUploader = new FileUploader({ url: this.URL });
   public clotheImg: any;
   public urlImage: string = "assets/pictures/tshirt.png";

   constructor(private service: ClothesService, private router: Router, private route: ActivatedRoute) { }

   ngOnInit() {
      this.idClothe = this.route.snapshot.paramMap.get('idClothe');
      console.log(this.idClothe);

      this.service.getSpecificClothe(this.idClothe).subscribe(response => {
         this.clotheDetail = response.body;
         console.log(this.clotheDetail);
         // console.log(JSON.stringify(specificFeatureFromService));
         this.statusCode = response.status;

         //récupère le chemin de l'image
         this.urlImage = this.clotheDetail.IMG_VET; 


         //getAllColors est appelé ici car sinon pas possible d'affecter checked aux couleurs du tableau colors, ça n'a pas fini de s'initialiser
      this.service.getAllColors().subscribe(response => {
         this.colors = response.body;
         // console.log(JSON.stringify(colorFromService));
         this.statusCode = response.status;
         //dans la callback de getAllColors car a besoin qu'elle ait fini de s'initialiser pour fonctionner
         //affecte true à chaque couleur présente dans clotheDetail ce qui signifie qu'elles sont sélectionnées par défaut pour ce vêtement
         console.log(this.clotheDetail);
         console.log(this.clotheDetail.idCouleurs);
         this.clotheDetail.idCouleurs.split(",").forEach(idColor => {
            this.colors.forEach(color => {
               if (idColor == color.ID_COUL) {
                  color.checked = true;
               }
            });
         });
      },
         error => {
            this.statusCode = error.status; //Récupère la réponse du serveur (erreur) et l'insère dans erreur
            console.log("Erreur lors de l'appel au service clothes.service - colors -- " + error);
         });

         this.service.getAllFeatures().subscribe(response => {
            this.features = response.body;
            // console.log(JSON.stringify(featFromService));
            this.statusCode = response.status;
             //dans la callback de getAllFeatures car a besoin qu'elle ait fini de s'initialiser pour fonctionner
            //affecte true à chaque caractéristique présente dans clotheDetail ce qui signifie qu'elles sont sélectionnées par défaut pour ce vêtement
            this.clotheDetail.idCaracteristiques.split(",").forEach(idFeature => {
               this.features.forEach(feature => {
                  if (idFeature == feature.ID_CARACT) {
                     feature.checked = true;
                  }
               });
            });
         },
            error => {
               this.statusCode = error.status; //Récupère la réponse du serveur (erreur) et l'insère dans erreur
               console.log("Erreur lors de l'appel au service clothes.service - features -- " + error);
            });

            this.service.getAllOccasions().subscribe(response => {
               this.occasions = response.body;
               // console.log(JSON.stringify(occasFromService));
               this.statusCode = response.status;
               //dans la callback de getAllOccasions car a besoin qu'elle ait fini de s'initialiser pour fonctionner
               //affecte true à chaque occasion présente dans clotheDetail ce qui signifie qu'elles sont sélectionnées par défaut pour ce vêtement
               this.clotheDetail.idOccasions.split(",").forEach(idOccasion => {
                  this.occasions.forEach(occasion => {
                     if (idOccasion == occasion.ID_OCCAS) {
                        occasion.checked = true;
                     }
                  });
               });
            },
               error => {
                  this.statusCode = error.status; //Récupère la réponse du serveur (erreur) et l'insère dans erreur
                  console.log("Erreur lors de l'appel au service clothes.service - occasions -- " + error);
               });


      },
         error => {
            this.statusCode = error.status; //Récupère la réponse du serveur (erreur) et l'insère dans statusCode
            console.log("Erreur lors de l'appel au service clothes.service - specificFilterOpt -- " + error);
         });

      this.service.getAllBrands().subscribe(response => {
         this.brands = response.body;
         // console.log(JSON.stringify(brandFromService));
         this.statusCode = response.status;
      },
         error => {
            this.statusCode = error.status; //Récupère la réponse du serveur (erreur) et l'insère dans erreur
            console.log("Erreur lors de l'appel au service clothes.service - brands -- " + error);
         });

      this.service.getAllCategories().subscribe(response => {
         this.categories = response.body;
         // console.log(JSON.stringify(categoryFromService));
         this.statusCode = response.status;
      },
         error => {
            this.statusCode = error.status; //Récupère la réponse du serveur (erreur) et l'insère dans erreur
            console.log("Erreur lors de l'appel au service clothes.service - categories -- " + error);
         });

      this.service.getAllNotes().subscribe(response => {
         this.notes = response.body;
         // console.log(JSON.stringify(occasFromService));
         this.statusCode = response.status;
      },
         error => {
            this.statusCode = error.status; //Récupère la réponse du serveur (erreur) et l'insère dans erreur
            console.log("Erreur lors de l'appel au service clothes.service - notes -- " + error);
         });
      
      //récupère tous les noms des marques (objet Json)
      this.service.getAllBrandsName().subscribe(response => {
         this.brandNameJson = response.body;
         this.statusCode = response.status;
      },
         error => {
            this.statusCode = error.status; //Récupère la réponse du serveur (erreur) et l'insère dans erreur
            console.log("Erreur lors de l'appel au service clothes.service - brands/brandname -- " + error);
         });

      //récupère tous les noms des catégories (objet Json)
      this.service.getAllCategoriesName().subscribe(response => {
         this.categoryNameJson = response.body;
         this.statusCode = response.status;
      },
         error => {
            this.statusCode = error.status; //Récupère la réponse du serveur (erreur) et l'insère dans erreur
            console.log("Erreur lors de l'appel au service clothes.service - categories/categoryname -- " + error);
         });

      //récupère tous les noms des vêtements (objet Json)
      this.service.getAllClothesName().subscribe(response => {
         this.clotheNameJson = response.body;
         this.statusCode = response.status;
      },
         error => {
            this.statusCode = error.status; //Récupère la réponse du serveur (erreur) et l'insère dans erreur
            console.log("Erreur lors de l'appel au service clothes.service - clothes/clothename -- " + error);
         });

      //récupère tous les noms des couleurs (objet Json)
      this.service.getAllColorsName().subscribe(response => {
         this.colorNameJson = response.body;
         this.statusCode = response.status;
      },
         error => {
            this.statusCode = error.status; //Récupère la réponse du serveur (erreur) et l'insère dans erreur
            console.log("Erreur lors de l'appel au service clothes.service - colors/colorname -- " + error);
         });

      //récupère tous les noms des caractéristiques (objet Json)
      this.service.getAllFeaturesName().subscribe(response => {
         this.featureNameJson = response.body;
         this.statusCode = response.status;
      },
         error => {
            this.statusCode = error.status; //Récupère la réponse du serveur (erreur) et l'insère dans erreur
            console.log("Erreur lors de l'appel au service clothes.service - features/featurename -- " + error);
         });

      //récupère tous les noms des occasion (objet Json)
      this.service.getAllOccasionsName().subscribe(response => {
         this.occasionNameJson = response.body;
         this.statusCode = response.status;
      },
         error => {
            this.statusCode = error.status; //Récupère la réponse du serveur (erreur) et l'insère dans erreur
            console.log("Erreur lors de l'appel au service clothes.service - occasions/occasionname -- " + error);
         });



      //uploader une image
      this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
      this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
         console.log('ImageUpload:uploaded:', item, status, response);
         this.urlImage = this.URL + "/" + this.clotheImg.replace(/^.*(\\|\/|\:)/, ''); //récupère le nom du fichier (tout ce qui vient après le dernier / du path) pour l'afficher dans la div du front
         alert("Fichier bien téléchargé"); //fichier bien téléchargé
      }
   }

   // permet de récupérer les valeurs des checkboxes
   // ngModel ajoute le checked sur la couleur sélectionnée
   //.filter ne renvoie que les id qui sont à true (.checked)
   //.map indique que la réponse ne sera constituée que des id
   get selectedColors() {
      return this.colors
         .filter(color => color.checked)
         .map(color => color.ID_COUL);
   }
   get selectedFeatures() {
      return this.features
         .filter(feature => feature.checked)
         .map(feature => feature.ID_CARACT);
   }
   get selectedOccasions() {
      return this.occasions
         .filter(occasion => occasion.checked)
         .map(occasion => occasion.ID_OCCAS);
   }

   onSubmit(form: NgForm) {
      if (form.valid == true) { //Si tous les champs du formulaire sont remplis

         this.clotheDetail.idOccasions = this.selectedOccasions.join(',');
         this.clotheDetail.idCouleurs = this.selectedColors.join(',');
         this.clotheDetail.idCaracteristiques = this.selectedFeatures.join(',');

         this.service.updateClothe(this.clotheDetail).subscribe(response => { //envoie le tableau au back
            this.statusCode = response.status;
            console.log("Les requêtes ont bien été enregistrées");
            this.router.navigate(['clothes-list']);
         },
            error => {
               this.statusCode = error.status; //Récupère la réponse du serveur (erreur) et l'insère dans erreur
               console.log(error); //Affiche le retour du serveur
               console.log(this.statusCode); //Affiche la variable erreur qui a été injectée par error.status
               console.log(" Les requêtes n'ont pas été enregistrées / Erreur lors de l'appel au service clothes.service - clothes -- " + error);
            });
      }
   }

   onCancel(){
      this.router.navigate(['clothes-list']);
   }

   //au click sur le lien XX inexistant dans la liste/revenir à la liste des XX, permet d'afficher la liste des éléments OU l'input permettant un nouvel ajout
   onClickBrand() {
      this.brandExists = !this.brandExists;
   }
   onClickCategory() {
      this.categoryExists = !this.categoryExists;
   }
   onClickColor() {
      this.colorExists = !this.colorExists;
   }
   onClickFeature() {
      this.featureExists = !this.featureExists;
   }
   onClickOccasion() {
      this.occasionExists = !this.occasionExists;
   }

   //au click sur le plus, ajoute l'élément en bdd et recharge la page
   onSubmitBrand() {
      let brandArray = new Clothe;
      brandArray.NOM_MARQUE = this.newBrand;
      //ajoute la marque en BDD
      this.service.addNewBrand(brandArray).subscribe(response => { //envoie le tableau au back
         this.statusCode = response.status;
         console.log("La requête a bien été enregistrée");
         this.service.getAllBrands().subscribe(response => {
            this.brands = response.body;
            this.statusCode = response.status;
         },
            error => {
               this.statusCode = error.status; //Récupère la réponse du serveur (erreur) et l'insère dans erreur
               console.log("Erreur lors de l'appel au service clothes.service - brands -- " + error);
            });
      },
         error => {
            this.statusCode = error.status; //Récupère la réponse du serveur (erreur) et l'insère dans erreur
            console.log(error); //Affiche le retour du serveur
            console.log(this.statusCode); //Affiche la variable erreur qui a été injectée par error.status
            console.log("La requête n'a pas été enregistrée / Erreur lors de l'appel au service clothes.service - brand -- " + error);
         });
      //recharge les éléments du select

      this.brandExists = true;
   }

   onSubmitCategorie() {
      let categoryArray = new Clothe;
      categoryArray.LIBEL_CAT = this.newCategory;
      //ajoute la catégorie en BDD
      this.service.addNewCategory(categoryArray).subscribe(response => { //envoie le tableau au back
         this.statusCode = response.status;
         console.log("La requête a bien été enregistrée");
         this.service.getAllCategories().subscribe(response => {
            this.categories = response.body;
            this.statusCode = response.status;
         },
            error => {
               this.statusCode = error.status; //Récupère la réponse du serveur (erreur) et l'insère dans erreur
               console.log("Erreur lors de l'appel au service clothes.service - categories -- " + error);
            });
      },
         error => {
            this.statusCode = error.status; //Récupère la réponse du serveur (erreur) et l'insère dans erreur
            console.log(error); //Affiche le retour du serveur
            console.log(this.statusCode); //Affiche la variable erreur qui a été injectée par error.status
            console.log("La requête n'a pas été enregistrée / Erreur lors de l'appel au service clothes.service - category -- " + error);
         });
      //recharge les éléments du select

      this.categoryExists = true;
   }

   onSubmitColor() {
      let coloryArray = new Clothe;
      coloryArray.LIBEL_COUL = this.newColor;
      //ajoute la couleur en BDD
      this.service.addNewColor(coloryArray).subscribe(response => { //envoie le tableau au back
         this.statusCode = response.status;
         console.log("La requête a bien été enregistrée");
         this.service.getAllColors().subscribe(response => {
            this.colors = response.body;
            this.statusCode = response.status;
         },
            error => {
               this.statusCode = error.status; //Récupère la réponse du serveur (erreur) et l'insère dans erreur
               console.log("Erreur lors de l'appel au service clothes.service - colors -- " + error);
            });
      },
         error => {
            this.statusCode = error.status; //Récupère la réponse du serveur (erreur) et l'insère dans erreur
            console.log(error); //Affiche le retour du serveur
            console.log(this.statusCode); //Affiche la variable erreur qui a été injectée par error.status
            console.log("La requête n'a pas été enregistrée / Erreur lors de l'appel au service clothes.service - color -- " + error);
         });
      //recharge les éléments du select

      this.colorExists = true;
   }

   onSubmitFeature() {
      let featureArray = new Clothe;
      featureArray.LIBEL_CARACT = this.newFeature;
      //ajoute la caractéristique en BDD
      this.service.addNewFeature(featureArray).subscribe(response => { //envoie le tableau au back
         this.statusCode = response.status;
         console.log("La requête a bien été enregistrée");
         this.service.getAllFeatures().subscribe(response => {
            this.features = response.body;
            this.statusCode = response.status;
         },
            error => {
               this.statusCode = error.status; //Récupère la réponse du serveur (erreur) et l'insère dans erreur
               console.log("Erreur lors de l'appel au service clothes.service - features -- " + error);
            });
      },
         error => {
            this.statusCode = error.status; //Récupère la réponse du serveur (erreur) et l'insère dans erreur
            console.log(error); //Affiche le retour du serveur
            console.log(this.statusCode); //Affiche la variable erreur qui a été injectée par error.status
            console.log("La requête n'a pas été enregistrée / Erreur lors de l'appel au service clothes.service - feature -- " + error);
         });
      //recharge les éléments du select

      this.featureExists = true;
   }

   onSubmitOccasion() {
      let occasionArray = new Clothe;
      occasionArray.LIBEL_OCCAS = this.newOccasion;
      //ajoute l'occasion en BDD
      this.service.addNewOccasion(occasionArray).subscribe(response => { //envoie le tableau au back
         this.statusCode = response.status;
         console.log("La requête a bien été enregistrée");
         this.service.getAllOccasions().subscribe(response => {
            this.occasions = response.body;
            this.statusCode = response.status;
         },
            error => {
               this.statusCode = error.status; //Récupère la réponse du serveur (erreur) et l'insère dans erreur
               console.log("Erreur lors de l'appel au service clothes.service - occasions -- " + error);
            });
      },
         error => {
            this.statusCode = error.status; //Récupère la réponse du serveur (erreur) et l'insère dans erreur
            console.log(error); //Affiche le retour du serveur
            console.log(this.statusCode); //Affiche la variable erreur qui a été injectée par error.status
            console.log("La requête n'a pas été enregistrée / Erreur lors de l'appel au service clothes.service - occasion -- " + error);
         });
      //recharge les éléments du select

      this.occasionExists = true;
   }

   //fonctions permettant de vérifier l'unicité des noms
   fctBrandNameExists() {
      if (this.newBrand.length >= 3) {
         console.log(this.newBrand); //récupère la saisie dans l'input
         console.log(this.brandNameJson); //affiche le tableau json de tous les noms
         for (let elementBrand of this.brandNameJson) {
            if (elementBrand.NOM_MARQUE === this.newBrand) {
               console.log("Cette marque existe déjà");
               this.brandNameExists = true;
               break;
            } else {
               this.brandNameExists = false;
            }
         }
      }
   }

   fctCategoryNameExists() {
      if (this.newCategory.length >= 3) {
         console.log(this.newCategory); //récupère la saisie dans l'input
         console.log(this.categoryNameJson); //affiche le tableau json de tous les noms
         for (let elementCat of this.categoryNameJson) {
            if (elementCat.LIBEL_CAT === this.newCategory) {
               console.log("Cette catégorie existe déjà");
               this.categoryNameExists = true;
               break;
            } else {
               this.categoryNameExists = false;
            }
         }
      }
   }

   fctClotheNameExists() {
      if (this.clotheDetail.NOM_VET.length >= 3) {
         // console.log(this.clotheDetail.NOM_VET); //récupère la saisie dans l'input
         // console.log(this.clotheNameJson); //affiche le tableau json de tous les noms
         for (let elementVet of this.clotheNameJson) {
            if (elementVet.NOM_VET === this.clotheDetail.NOM_VET) {
               console.log("Ce nom de vêtement existe déjà");
               this.clotheNameExists = true;
               break;
            } else {
               this.clotheNameExists = false;
            }
         }
      }
   }

   fctColorNameExists() {
      if (this.newColor.length >= 3) {
         // console.log(this.newColor); //récupère la saisie dans l'input
         // console.log(this.colorNameJson); //affiche le tableau json de tous les noms
         for (let elementCol of this.colorNameJson) {
            if (elementCol.LIBEL_COUL === this.newColor) {
               console.log("Ce nom de couleur existe déjà");
               this.colorNameExists = true;
               break;
            } else {
               this.colorNameExists = false;
            }
         }
      }
   }

   fctFeatureNameExists() {
      if (this.newFeature.length >= 3) {
         // console.log(this.newFeature); //récupère la saisie dans l'input
         // console.log(this.featureNameJson); //affiche le tableau json de tous les noms
         for (let elementFeat of this.featureNameJson) {
            if (elementFeat.LIBEL_CARACT === this.newFeature) {
               console.log("Ce nom de caractéristique existe déjà");
               this.featureNameExists = true;
               break;
            } else {
               this.featureNameExists = false;
            }
         }
      }
   }

   fctOccasionNameExists() {
      if (this.newOccasion.length >= 3) {
         // console.log(this.newOccasion); //récupère la saisie dans l'input
         // console.log(this.occasionNameJson); //affiche le tableau json de tous les noms
         for (let elementOccas of this.occasionNameJson) {
            if (elementOccas.LIBEL_OCCAS === this.newOccasion) {
               console.log("Ce nom d'occasion existe déjà");
               this.occasionNameExists = true;
               break;
            } else {
               this.occasionNameExists = false;
            }
         }
      }
   }

}
