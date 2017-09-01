import { IAccesoAll } from './../../interfaces/accesos.interface';
import { AccesosService } from './../../services/accesos.service';
import { AuthenticationService } from './../../services/authentication.service';
import { Component , OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { TdLoadingService } from '@covalent/core';

import { MdDialog, MdDialogRef } from '@angular/material';

import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'qs-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;

  loading: Boolean = false;
  lang: string = 'es';
  navigatorLang: string;
  browserLang: string;

  iaccesoAll: IAccesoAll;

  constructor(private _router: Router,
              private _loadingService: TdLoadingService,
              private authenticationService: AuthenticationService,
              public dialog: MdDialog,
              private translate: TranslateService,
              private accesosService: AccesosService,
              ) {
        translate.addLangs(['en', 'pt', 'es' ]);
        translate.setDefaultLang('en');

        this.browserLang = navigator.language.substring(0, 2);
        // console.log('browserLang');
        // console.log(browserLang);
        translate.use(this.browserLang.match(/en|pt|es/) ? this.browserLang : 'en');
   }

  ngOnInit(): void {
  //       // var navigatorLang = navigator.language;
  //       this.navigatorLang = navigator.language;
  //       // navigator.use
  //       console.log(this.navigatorLang);
  //       if ( this.navigatorLang === 'en-US') {
  //         this.lang = 'en';
  //       }
  //       console.log(this.lang);
  //       this._translate.use(this.lang);
  //           // reset login status
        this.authenticationService.logout();
  }

  // login() {
    //     this.loading = true;
    //     // this.authenticationService.login(this.model.username, this.model.password)
    //     // console.log("login")
    //     // console.log(this.username)
    //     // console.log(this.password)
    //     this.authenticationService.login(this.username, this.password)
    //         .subscribe(result => {
    //             // if (result === true) {
    //             //     // login successful
    //                 this._router.navigate(['/']);
    //             // } else {
    //             //     // login failed
    //             //     this.error = 'Username or password is incorrect';
    //             //     this.loading = false;
    //             // }
    //             console.log(result);
    //         });
    //         // this.dialog.open(LoginErrorDialogComponent01);
    // }


    login(): void {
        this.loading = true;
        this.authenticationService.login(this.username, this.password)
            .subscribe(
                ( data: any ) => {
                     this.CargaAccesos();
                    //  console.log(this.accesosService.getPerfiles());
                    //  console.log(this.accesosService.getAccesos());
                     this._router.navigate(['/']);
                },
                ( error: Error )  => {
                    this.loading = false;
                    this.dialog.open(LoginErrorDialogComponent01);
                });
    }

    CargaAccesos(): void {

      this.accesosService.queryAccesos(1120)
        .subscribe(
          ( data: IAccesoAll ) => {
            this.iaccesoAll = data;
          },
          ( error: Error ) => {
            console.log(error.message );
          }
        )
    }

}

@Component({
  selector: 'qs-login-dialog-01',
  template: `
    <h1 md-dialog-title>Validacion</h1>
    <div md-dialog-content>Error en User / Password Ingresado </div>
    <div md-dialog-actions>
      <button md-button (click)="dialogRef.close('Option 1')">Ok</button>
    </div>
  `,
})
export class LoginErrorDialogComponent01 {
  constructor(public dialogRef: MdDialogRef<LoginErrorDialogComponent01>) {}
}