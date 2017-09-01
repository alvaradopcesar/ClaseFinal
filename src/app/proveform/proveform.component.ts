import { IProveedor } from './../../interfaces/proveedor.interface';
import { ProveedorService } from './../../services/proveedor.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-proveform',
  templateUrl: './proveform.component.html',
  styleUrls: ['./proveform.component.scss']
})
export class ProveformComponent implements OnInit {

    idx: number;
    nombre: string;
    email: string;
    edad: number;
    fechacreacion: Date;

  proveedor: IProveedor;

  action: string;
  constructor(private activatedRoute: ActivatedRoute,
          private proveedorService: ProveedorService,

  ) { }

  ngOnInit() {

    this.activatedRoute.url.subscribe((url: any) => {
      this.action = (url.length > 1 ? url[1].path : 'add');
      // console.log(this.action);
      if ( this.action === 'add' ) {
        console.log('add');
      }else{
        console.log('modi');
        // this._route.params.subscribe((params: {id: string}) => {
        this.activatedRoute.params.subscribe((params: {id: number}) => {
          let id: number = params.id;
          // this.get(id);
          this.ProveedorGet(id);
        });
      }
    });

  }

  ProveedorGet(idx: number): void{
    this.proveedorService.ProveedoreGet(idx)
    .subscribe((data: IProveedor) => {
      this.proveedor = data;

      this.idx = data.idx;
      this.nombre = data.nombre;
      this.email = data.email;
      this.edad = data.edad;
      this.fechacreacion = data.fechacreacion;

      // console.log(this.solicitudes);
      setTimeout(() => {
        // this._loadingService.resolve('items.load');
      }, 2000);
    }, (error: Error) => {
        console.log('error');
    }
    );
  }

}
