import { AccesosService } from './accesos.service';
import { IProveedor } from './../interfaces/proveedor.interface';


import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';


import { environment } from '../environments/environment';
import { AuthenticationService } from './authentication.service';
// import { ICliente } from './../interfaces/cliente.interface';

@Injectable()
export class ProveedorService {

    private headers: any;
    private options: any;

    constructor (private http: Http,
                 private authenticationService: AuthenticationService,

    ){ }

    ProveedoreGetAll(): Observable<IProveedor[]> {
        this.headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
        this.options = new RequestOptions({ headers: this.headers });

        return this.http.get(environment.urlServices + '/test/proveedoresget', this.options )
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));

    }

    ProveedoreGet(idx: number): Observable<IProveedor> {
        this.headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
        this.options = new RequestOptions({ headers: this.headers });

        return this.http.get(environment.urlServices + '/test/proveedoresget/' + idx.toString(), this.options )
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
}