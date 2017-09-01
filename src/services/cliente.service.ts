import { ICliente } from './../interfaces/cliente.interface';
import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { environment } from '../environments/environment';
import { AuthenticationService } from './authentication.service';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class ClienteService {

    private headers: any;
    private options: any;
    public responseSolicitudToken: string;

    constructor(private _http: Http,
                private authenticationService: AuthenticationService
    ) {}

    queryClienteTabla(): Observable<ICliente[]> {
        this.headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
        this.options = new RequestOptions({ headers: this.headers });

        return this._http.get(environment.urlServices + '/test/clientes' , this.options)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    queryClienteTablaIDX(idx: number): Observable<ICliente> {
        this.headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
        this.options = new RequestOptions({ headers: this.headers });

        return this._http.get(environment.urlServices + '/test/cliente/' + idx.toString() , this.options)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    saveClienteTabla(cliente: ICliente): Observable<boolean> {
        console.log('entreo al save');
        this.headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
        this.options = new RequestOptions({ headers: this.headers });
        console.log('entreo al save 2');
        return this._http.put(environment.urlServices + '/test/cliente'  , cliente ,  this.options)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    // queryFichaClienteIdx(idx: number): Observable<IFichaCliente> {

    //     this.headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
    //     this.options = new RequestOptions({ headers: this.headers });

    //     return this._http.get(environment.urlServices + '/test/fichacliente/' + idx.toString() , this.options)
    //         .map((res: Response) => res.json())
    //         //  ..errors if any
    //         .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    //         // .map(this.extractData)
    //         // .catch(this.handleError);
    // }

    // actualizarFichaCliente(idx: number, estado: string , observacion: string): Observable<boolean> {
    // actualizarFichaCliente(iFichaCliente: IFichaCliente): Observable<boolean> {
    //     this.headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
    //     this.options = new RequestOptions({ headers: this.headers });
    //     if ( iFichaCliente.idx === 0 ) {
    //         return this._http.post( environment.urlServices + '/test/fichacliente' , iFichaCliente , this.options )
    //             .map((response: Response) => {
    //                 return true;
    //             });
    //     }else{
    //         return this._http.put( environment.urlServices + '/test/fichacliente' , iFichaCliente , this.options )
    //             .map((response: Response) => {
    //                 return true;
    //             });
    //     }
    // }

}