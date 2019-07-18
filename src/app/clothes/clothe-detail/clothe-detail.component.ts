import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClothesService } from '../clothes.service';
import { Clothe } from '../clothe';
import { Router } from '@angular/router';
import { ClotheDeleteComponent } from '../clothe-delete/clothe-delete.component';

@Component({
   selector: 'app-clothe-detail',
   templateUrl: './clothe-detail.component.html',
   styleUrls: ['./clothe-detail.component.css']
})
export class ClotheDetailComponent implements OnInit {

   @Input() idClothe; //contient l'id du vêtement cliqué dans clothe-list, élément parent
   clotheDetail: Clothe = new Clothe(); //récupère le contenu renvoyé par le back
   statusCode = null; //Création de la variable statusCode pour afficher message d'erreur dans le html

   constructor(public activeModal: NgbActiveModal, private service: ClothesService, public router: Router, private modalService: NgbModal) { }

   ngOnInit() {

      this.service.getSpecificClothe(this.idClothe).subscribe(response => {
         this.clotheDetail = response.body;
         // console.log(JSON.stringify(specificFeatureFromService));
         this.statusCode = response.status;
      },
         error => {
            this.statusCode = error.status; //Récupère la réponse du serveur (erreur) et l'insère dans statusCode
            console.log("Erreur lors de l'appel au service clothes.service - specificFilterOpt -- " + error);
         });
   }

   onEdit() {
      this.activeModal.close();
      this.router.navigate(['clothe-update', this.idClothe]);
   }

   //gestion de la modale
   //ouvre la modale en lui passant l'id du vêtement cliqué
   onDelete(idClthe) {

      console.log("idClothe dans detail : " + this.idClothe);
         const modalRef = this.modalService.open(ClotheDeleteComponent); //ouvre une modale dont le contenu est ClotheDeleteComponent
         modalRef.componentInstance.idClothe = idClthe; //récupère l'id du vêtement cliqué et le passe au component modale

         modalRef.result.then((result) => {
            //quand on clique sur supprimer dans la modale de confirmation, ferme cette modale.
            this.activeModal.close();
         });
   }

}
