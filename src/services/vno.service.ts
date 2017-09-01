import { IVno } from './../interfaces/vno.interface';

import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { environment } from '../environments/environment';
import { AuthenticationService } from './authentication.service';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class VnoService {

    private headers: any;
    private options: any;
    // public responseSolicitudToken: string;

    constructor(private _http: Http,
                private authenticationService: AuthenticationService
    ) {}

    queryVnoClientesPrincipales(): Observable<IVno[]> {
        this.headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
        this.options = new RequestOptions({ headers: this.headers });

        return this._http.get(environment.urlServices + '/test/vnoprincipales' , this.options)
            .map((res: Response) => res.json())
            //  ..errors if any
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
            // .map(this.extractData)
            // .catch(this.handleError);
    }

}
