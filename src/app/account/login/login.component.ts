import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { Account } from '../account';

@Component({
   selector: 'app-login',
   templateUrl: './login.component.html',
   styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
   public form;
   codeHttp = null;

   //récupère les valeurs contenues dans les champs du formulaire
   pseudoToCompare: string = "";
   passwordToCompare: string = "";

   constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService) {
      //gestion guards
      this.form = formBuilder.group({
         email: ['', [Validators.required, Validators.email]],
         password: ['', Validators.required]
      });
   }

   ngOnInit() {
   }

   onLogin(form: NgForm) {
      let user = new Account;//création d'un objet Json contenant les données attendues par le serveur
      user.LOGIN_USER = form.value["email"].trim().replace(/;/g, "");
      user.MDP_USER = form.value["password"].trim().replace(/;/g, "");

      if (form.valid) {
         this.authService.sendUserToCompare(user).subscribe( response =>{
            console.log(response.body.token);
            this.authService.sendToken(response.body.token);
            this.router.navigate(["homepage"]);
         },
         error => {
            this.codeHttp = error.status;
               console.log(error); //Affiche le retour du serveur
               console.log(" Les requêtes n'ont pas été enregistrées / erreur lors de l'appel au service account.service - login -- " + error);
            });

      }
    }
}
