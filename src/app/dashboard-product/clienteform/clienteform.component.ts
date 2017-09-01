import { ICliente } from './../../../interfaces/cliente.interface';
import { ClienteService } from './../../../services/cliente.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-clienteform',
  templateUrl: './clienteform.component.html',
  styleUrls: ['./clienteform.component.scss']
})
export class ClienteformComponent implements OnInit {

  cliente: ICliente;

  idx: number;
  nombre: string;
  email: string;
  edad: number;
  fechacreacion: Date;

  action: string;

  constructor(
    private clienteService: ClienteService,
    private _route: ActivatedRoute
  ) { }

  ngOnInit() {
    

    this._route.url.subscribe((url: any) => {
      this.action = (url.length > 1 ? url[1].path : 'add');
      // console.log(this.action);
      if ( this.action === 'add' ) {
        console.log('add');
      }else{
        console.log('modi');
        // this._route.params.subscribe((params: {id: string}) => {
        this._route.params.subscribe((params: {id: number}) => {
          let id: number = params.id;
          // this.get(id);
          this.Prueba(id);
        });
      }
    });

  }

  Prueba(idx: number): void {
    this.clienteService.queryClienteTablaIDX(idx).
    subscribe((data: ICliente) => {
      this.cliente = data;

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

  goBack(): void {
    console.log('regresar');
    window.history.back();
  }

  goGrabar(): void {
    console.log('grabar');

    this.cliente = {
      idx : this.idx,
      nombre : this.nombre,
      email : this.email,
      edad : this.edad,
      fechacreacion : this.fechacreacion,
    }
    // let cliente: ICliente;
    // cliente.idx = this.idx;
    // cliente.nombre = this.nombre;
    // cliente.email = this.email;
    // cliente.edad = this.edad;
    // cliente.fechacreacion = this.fechacreacion;
    this.clienteService.saveClienteTabla(this.cliente).
    subscribe((data: boolean) => {
       console.log(data);
       this.goBack();
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
