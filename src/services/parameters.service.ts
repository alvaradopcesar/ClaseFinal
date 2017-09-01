
import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { environment } from '../environments/environment';
import { IParameters } from './../interfaces/parameters.interface';
import { AuthenticationService } from './authentication.service';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class ParameterService {

    private headers: any;
    private options: any;

    constructor(private _http: Http,
                private authenticationService: AuthenticationService
    ) {}

    queryParametersForParent(idx: number): Observable<IParameters[]> {
        this.headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
        this.options = new RequestOptions({ headers: this.headers });

        return this._http.get(environment.urlServices + '/test/parameteridx/' + idx.toString() , this.options)
            .map((res: Response) => res.json())
            //  ..errors if any
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
            // .map(this.extractData)
            // .catch(this.handleError);
    }
}
