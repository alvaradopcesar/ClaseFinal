import { Router } from '@angular/router';
import { ICliente } from './../../../interfaces/cliente.interface';
import { Component, OnInit } from '@angular/core';
import { ClienteService } from "../../../services/cliente.service";

@Component({
  selector: 'app-clientetabla',
  templateUrl: './clientetabla.component.html',
  styleUrls: ['./clientetabla.component.scss']
})
export class ClientetablaComponent implements OnInit {

  clientes: ICliente[];

  constructor(
    private clienteService: ClienteService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.Prueba();
  }

  Prueba(): void {
    this.clienteService.queryClienteTabla().
    subscribe((data: ICliente[]) => {
      this.clientes = data;
      // console.log(this.solicitudes);
      setTimeout(() => {
        // this._loadingService.resolve('items.load');
      }, 2000);
    }, (error: Error) => {
        console.log('error');
    }
    );
  }

  Grabar(): void {
    // this.clien
  }

  onRowSelect(event: any): void {
    console.log(event.data);
    console.log(event.data.idx);
    this.router.navigate(['product/clienteform', event.data.idx ]);
    // this.router.navigate(['product/clienteform']);
  }


}
