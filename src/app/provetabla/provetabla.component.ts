import { IPerfil } from './../../interfaces/accesos.interface';
import { IProveedor } from './../../interfaces/proveedor.interface';
import { ProveedorService } from './../../services/proveedor.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-provetabla',
  templateUrl: './provetabla.component.html',
  styleUrls: ['./provetabla.component.scss']
})
export class ProvetablaComponent implements OnInit {

  proveedor: IProveedor[] = [];

  constructor(private proveedorService: ProveedorService,
              private router: Router,
  ) { }

  ngOnInit() {
   this.ProveedorGet();
  }

  ProveedorGet(): void {
    this.proveedorService.ProveedoreGetAll()
    .subscribe((data: IProveedor[]) => {
      this.proveedor = data;
      // console.log(this.solicitudes);
      setTimeout(() => {
        // this._loadingService.resolve('items.load');
      }, 2000);
    }, (error: Error) => {
        console.log('error');
    }
    );
  }

  onRowSelect(event: any): void {
    console.log(event.data);
    console.log(event.data.idx);
    this.router.navigate(['product/proveedorform', event.data.idx ]);
    // this.router.navigate(['product/clienteform']);
  }
}
