import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClothesService } from '../clothes.service';
import { ClotheDetailComponent } from '..';

@Component({
  selector: 'app-clothe-delete',
  templateUrl: './clothe-delete.component.html',
  styleUrls: ['./clothe-delete.component.css']
})
export class ClotheDeleteComponent implements OnInit {
   
   @Input() idClothe; //contient l'id du vêtement cliqué dans clothe-detail, élément parent

  constructor(public activeModal: NgbActiveModal, private service: ClothesService, private modalService: NgbModal) { }

  ngOnInit() {
  }

  onDeleteConfirm(){
   this.service.deleteClothe(this.idClothe).subscribe(response => { //Supprime la classe dans la BDD selon l'id
      console.log("Le vêtement a bien été supprimé");
      console.log(this.idClothe);
      this.activeModal.close();
   },
      error => {
         console.log(error);
         console.log("Le vêtement n'a pas été supprimé - Erreur lors de l'appel au service");
      })
     
  }

}
