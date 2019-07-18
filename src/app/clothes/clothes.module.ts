import { NgModule } from '@angular/core';
import { AppRoutingModule } from '../app-routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';

import { ClothesListComponent } from './clothes-list/clothes-list.component';
import { ClotheDetailComponent } from './clothe-detail/clothe-detail.component';
import { ClotheCreateComponent } from './clothe-create/clothe-create.component';
import { ClotheUpdateComponent } from './clothe-update/clothe-update.component';
import { ClotheDeleteComponent } from './clothe-delete/clothe-delete.component';

@NgModule({
  declarations: [
     ClothesListComponent,
     ClotheDetailComponent,
     ClotheCreateComponent,
     ClotheUpdateComponent,
     ClotheDeleteComponent
   ],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
    FileUploadModule
  ],
  exports: [
   ClothesListComponent,
   ClotheCreateComponent
  ],
  entryComponents: [
     ClotheDetailComponent, //permet de charger le contenu de ClotheDetailComponent dans la modale de ClothesListComponent
     ClotheDeleteComponent
   ],
})
export class ClothesModule { }
