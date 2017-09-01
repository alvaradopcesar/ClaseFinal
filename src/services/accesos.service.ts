import { IAccesoAll, IPerfil, IAcceso } from './../interfaces/accesos.interface';

import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { environment } from '../environments/environment';
import { AuthenticationService } from './authentication.service';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class AccesosService {

    private headers: any;
    private options: any;
    moduleNameAccesos: string = 'bitfrostACC';

    constructor(private _http: Http,
                private authenticationService: AuthenticationService
    ) {}

    queryAccesos(userID: number): Observable<IAccesoAll> {
        this.headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
        this.options = new RequestOptions({ headers: this.headers });

        return this._http.get(environment.urlServices + '/test/accesos/' + userID.toString() , this.options)
            .map((response: Response) => {
                let accesos: IAccesoAll =  response.json();
                localStorage.setItem(this.moduleNameAccesos,
                    JSON.stringify({ accesos : accesos }));
                return response.json();
            })
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    deleteAcceos(): void {
        localStorage.removeItem(this.moduleNameAccesos);
    }

    getPerfiles(): IPerfil[]  {
        let opciones: any = JSON.parse(localStorage.getItem(this.moduleNameAccesos));
        let acc: IAccesoAll = opciones.accesos;
        let perfiles: IPerfil[] = acc.perfiles;
        return perfiles;
    }

    getAccesos(): IAcceso[] {
        let opciones: any = JSON.parse(localStorage.getItem(this.moduleNameAccesos));
        let acc: IAccesoAll = opciones.accesos;
        let accesos: IAcceso[] = acc.accesos;
        return accesos;
    }

    AccesoModulo(modulo: string): boolean {
        let data: IAcceso[] = this.getAccesos();
        let i: number = data.length;
        let len: number  = i;
        for (i = 0; i < len; i++) {
            if ( data[i].module_name === modulo ) {
                return true;
            }
        }
        return false;
    }

    AccesoOpcion(modulo: string): boolean {
        let data: IAcceso[] = this.getAccesos();
        let i: number = data.length;
        let len: number  = i;
        for (i = 0; i < len; i++) {
            if ( data[i].label_option  === modulo ) {
                return true;
            }
        }
        return false;
    }

}