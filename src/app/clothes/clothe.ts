//définit la structure d'un vêtement
export class Clothe {
   ID_VET: number;
   FK_ID_CAT: number;
   FK_ID_MARQUE: number;
   FK_ID_NOTE: number;
   FK_ID_USER: number;
   NOM_VET: string;
   IMG_VET: any;
   DESCRIPT_VET: string;
   ID_CARACT: any[];
   ID_COUL: any[];
   ID_OCCAS: any[];

   NOM_MARQUE: string;
   LIBEL_CAT: string;
   LIBEL_COUL: string;
   LIBEL_CARACT: string;
   LIBEL_OCCAS: string;

   idCouleurs: string;
   idCaracteristiques: string;
   idOccasions: string;
}
