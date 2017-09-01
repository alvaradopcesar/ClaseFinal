import { AccesosService } from './../../../services/accesos.service';

import { Component, AfterViewInit } from '@angular/core';
import { Title }     from '@angular/platform-browser';
import { Router } from '@angular/router';

// import { TdDataTableSortingOrder, TdDataTableService, ITdDataTableSortChangeEvent } from '@covalent/core';
// import { IPageChangeEvent } from '@covalent/core';

// import { DataTableModule, SharedModule } from 'primeng/primeng';
import { TerminalCustomerIdxService } from '../../../services/terminales_customer_idx.service';
import { ISolicitudTokensAdm } from '../../../interfaces/solicitud_tokens.interface';
import { MdSnackBar, MdDialog, MdDialogRef } from '@angular/material';
import { AuthenticationService } from './../../../services/authentication.service';

// import { Observable } from 'rxjs/Rx';

@Component({
  // selector: 'product-stats',
  selector: 'carga-tokens',
  templateUrl: './carga-tokens.component.html',
  styleUrls: ['./carga-tokens.component.scss'],
  viewProviders: [ TerminalCustomerIdxService ],

})
export class CargaTokensComponent implements AfterViewInit {

  private userID: number;
  selectedOption: string;
  solicitudes: ISolicitudTokensAdm[];

  // sortOrder: TdDataTableSortingOrder = TdDataTableSortingOrder.Descending;

  public result: any;

  // private _dataTableService: TdDataTableService,
  // private _snackBarService: MdSnackBar,
  // public dialog: MdDialog,

  constructor(private _titleService: Title,
              // private authenticationService: AuthenticationService,
              private terminalCustomerIdxService: TerminalCustomerIdxService,
              // private dialogsService: DialogsService
              public dialog: MdDialog,
              public router: Router,
              private authenticationService: AuthenticationService,
              private accesosService: AccesosService
              ) { }

  ngAfterViewInit(): void {
    this._titleService.setTitle( 'Demo' );
    this.userID = this.authenticationService.userID;
    this.CargaSolicitudTokensAdm(this.userID);
  }

  CargaSolicitudTokensAdm(userID: number): void {
      this.terminalCustomerIdxService.querySolicitudTokenAdm(userID).
      subscribe((data: ISolicitudTokensAdm[]) => {
        this.solicitudes = data;
        // console.log(this.solicitudes);
        setTimeout(() => {
          // this._loadingService.resolve('items.load');
        }, 2000);
      }, (error: Error) => {
      //   this._itemsService.staticQuery().subscribe((data2: Object[]) => {
      //     this.data2 = data2;
      //     setTimeout(() => {
      //       this._loadingService.resolve('items.load');
      //     }, 2000);
      //   });
      }
      );
  }

  onRowSelectTokenAdm(event: any): void {

        let dialogRef: MdDialogRef<ConfirmDialog>;

        // dialogRef = this.dialog.open(ConfirmDialog,{
        //     width: '1000px',
        //     height: '400px' });

        dialogRef = this.dialog.open(ConfirmDialog, {
            width: '1000px' });

        dialogRef.componentInstance.idx = event.data.idx;
        dialogRef.componentInstance.comentario = event.data.observacion;
        dialogRef.componentInstance.title = 'Titulo';

        // return dialogRef.afterClosed();
        dialogRef.afterClosed().subscribe(result => {
          // this.selectedOption = result;
          // alert(result);
          if ( result !== 'CANCEL' && result !== undefined) {
            this.solicitudes = result;
          }
        });
  }

  refresh(): void {
    // this.CargaSolicitudTokensAdm(this.userID);
    console.log(this.accesosService.AccesoModulo('incidencias'));
    console.log(this.accesosService.AccesoModulo('cesar'));
  }

}

@Component({
    selector: 'confirm-dialog',
    template : `
    <md-card>
      <md-card-title>Actualización de Estado de la Solicitud {{idx}}</md-card-title>
      <md-divider></md-divider>
      <md-card-content>

        <form>

          <div layout="row" layout-margin>
            <md-select flex="50" placeholder="Seleccion de estado" id="selectedEstado"
               [(ngModel)]="selectedEstado" name="selectedEstado">
              <md-option *ngFor="let estado of estados" [value]="estado.value">
                {{estado.viewValue}}
              </md-option>
              </md-select>
          </div>

          <div layout="row" layout-margin>
            <md-input-container flex>
              <textarea mdInput  placeholder="Ingrese su comentario" name="comentario" [(ngModel)]="comentario"> 
              </textarea>
            </md-input-container>
          </div>
        </form>

      </md-card-content>
      <md-divider></md-divider>
      <md-card-actions>
        <!--
        <button type="button" md-raised-button 
            (click)="dialogRef.close('OK')">OK</button>
        -->    
        <button type="button" md-raised-button 
            (click)="BottonOk()">OK</button>
        <button type="button" md-button 
            (click)="dialogRef.close('CANCEL')">Cancel</button>

      </md-card-actions>
    </md-card>`,
    viewProviders: [ TerminalCustomerIdxService ],
})
export class ConfirmDialog {

    private userID: number;
    solicitudes: ISolicitudTokensAdm[];

    public idx: number;
    public title: string;
    public comentario: string;
    public selectedEstado: string = 'En Progreso';
    // public selectedEstado: string = '';

    estados: any[] = [
      {value: 'Enviado', viewValue: 'Enviado'},
      {value: 'En Progreso', viewValue: 'En Progreso'},
      {value: 'Rechazado', viewValue: 'Rechazado'},
    ];

    constructor(public dialogRef: MdDialogRef<ConfirmDialog>,
                private terminalCustomerIdxService: TerminalCustomerIdxService,
                private _snackBarService: MdSnackBar,
                private authenticationService: AuthenticationService
                ) {
      // console.log('contriuctor ConfirmDialo');
      this.userID = this.authenticationService.userID;
      // console.log(this.userID);
    }

    BottonOk(): void {
      if ( this.selectedEstado === '' ) {
        alert('ingrese estado');
        return;
      }
      this.terminalCustomerIdxService.actualizarTokenAdm(this.idx, this.selectedEstado, this.comentario)
            .subscribe(
                data => {
                    //  this._router.navigate(['/']);
                  //  this.CargaSolicitudTokensAdm();
                  this._snackBarService.open('Registro exitoso', 'Ok', { duration: 5000 });

                  this.terminalCustomerIdxService.querySolicitudTokenAdm(this.userID).
                  subscribe((data: ISolicitudTokensAdm[]) => {
                        this.solicitudes = data;
                        // console.log(this.solicitudes);
                        return this.dialogRef.close(this.solicitudes);
                  }, (error: Error) => {
                  //   this._itemsService.staticQuery().subscribe((data2: Object[]) => {
                  //     this.data2 = data2;
                  //     setTimeout(() => {
                  //       this._loadingService.resolve('items.load');
                  //     }, 2000);
                  //   });
                  }
                  );

                },
                error => {
                    // this.loading = false;
                    // this.dialog.open(LoginErrorDialogComponent01);
                });

    }

}
