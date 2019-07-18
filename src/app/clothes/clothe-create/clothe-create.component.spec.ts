import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClotheCreateComponent } from './clothe-create.component';

describe('ClotheCreateComponent', () => {
  let component: ClotheCreateComponent;
  let fixture: ComponentFixture<ClotheCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClotheCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClotheCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should test new brand', () => {
     component.newBrand = "fvffff"; //définir des valeurs en dur pour vérifier que ça fait bien ce que je veux
     //définir un traitement
    expect(component.newBrand).toBe('fvffff'); //tester si fonctionne ou pas

  });

  //TESTER QUE MON SERVEUR RENVOIE BIEN DES ERREURS

  
  // tous les champs du formulaire s'affichent au chargement de la page

  // le select catégorie affiche l'intégralité des catégories disponibles en base de données
  // au click sur catégorie inexistante dans la liste, le select change pour un input
  // au click sur revenir à la liste des catégories , l'input change pour réafficher le select
  // au click sur le +, la catégorie saisie s'ajoute en bdd et l'input change pour réafficher le select à jour avec la nouvelle catégorie

  // le select marque affiche l'intégralité des marques disponibles en base de données
  // au click sur marque inexistante dans la liste, le select change pour un input
  // au click sur revenir à la liste des marques , l'input change pour réafficher le select
  // au click sur le +, la marque saisie s'ajoute en bdd et l'input change pour réafficher le select à jour avec la nouvelle marque

  // le champ concernant les couleurs affiche l'intégralité des couleurs disponibles en base de données, avec une checkbox pour chaque
  // lors de la sélection de plusieurs checkboxes, tout est enregistré en base de données
  // au click sur checkbox inexistante dans la liste, les checkboxes changent pour un input
  // au click sur revenir à la liste des couleurs , l'input change pour réafficher les checkboxes
  // au click sur le +, la couleur saisie s'ajoute en bdd et l'input change pour réafficher les checkboxes à jour avec la nouvelle couleur
  
  // le champ concernant les caractéristiques affiche l'intégralité des caractéristiques disponibles en base de données, avec une checkbox pour chaque
  // lors de la sélection de plusieurs checkboxes, tout est enregistré en base de données
  // au click sur checkbox inexistante dans la liste, les checkboxes changent pour un input
  // au click sur revenir à la liste des caractéristiques , l'input change pour réafficher les checkboxes
  // au click sur le +, la caractéristique saisie s'ajoute en bdd et l'input change pour réafficher les checkboxes à jour avec la nouvelle caractéristique
  
  // le champ concernant les occasions affiche l'intégralité des occasions disponibles en base de données, avec une checkbox pour chaque
  // lors de la sélection de plusieurs checkboxes, tout est enregistré en base de données
  // au click sur checkbox inexistante dans la liste, les checkboxes changent pour un input
  // au click sur revenir à la liste des occasions , l'input change pour réafficher les checkboxes
  // au click sur le +, la occasion saisie s'ajoute en bdd et l'input change pour réafficher les checkboxes à jour avec la nouvelle occasion

  // les éléments saisis s'ajoutent tous en bdd lors de la soumission du formulaire - formulaire createClothe ok
});
