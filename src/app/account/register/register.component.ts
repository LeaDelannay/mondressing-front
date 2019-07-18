import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/auth.service';
import { Account } from '../account';

@Component({
   selector: 'app-register',
   templateUrl: './register.component.html',
   styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

   codeHttp = null;

   public form;
   public registerNotOk;

   // récupère la valeur saisie dans l'input pour ensuite le passer à la bdd via une fonction
   newPseudo: string = "";
   newLogin: string = "";
   newMdp: string = "";

   constructor(private formBuilder: FormBuilder, private service: AuthService, private router: Router) {
      //gestion guards
      this.form = formBuilder.group({
         email: ['', [Validators.required, Validators.email]],
         password: ['', Validators.required]
      });
   }

   ngOnInit() {
   }

   onRegister(form: NgForm) {
      if (form.valid) {
         if(form.value["email"].search('@') === -1){
            this.registerNotOk = true;
         }else{
         let user = new Account;//création d'un objet Json contenant les données attendues par le serveur
         user.PSEUDO_USER = form.value["pseudo"].trim().replace(/;/g, "");
         user.LOGIN_USER = form.value["email"].trim().replace(/;/g, "");
         user.MDP_USER = form.value["password"].trim().replace(/;/g, "");

         this.service.addNewUser(user).subscribe(response => { //envoie le tableau au back
            this.codeHttp = response.status;
            console.log("Le user a bien été enregistré");
            setTimeout(()=>this.router.navigate(['login']),3000);
         },
         error => {
            this.codeHttp = error.status; //Récupère la réponse du serveur (codeHttp) et l'insère dans codeHttp
               console.log(error); //Affiche le retour du serveur
               console.log(this.codeHttp); //Affiche la variable codeHttp qui a été injectée par error.status
               console.log(" Les requêtes n'ont pas été enregistrées / erreur lors de l'appel au service account.service - register -- " + error);
            });
         }
      }
   }

}
