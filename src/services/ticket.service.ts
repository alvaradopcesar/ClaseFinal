import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { environment } from '../environments/environment';
import { AuthenticationService } from './authentication.service';
import { ITicketGrilla } from './../interfaces/ticket';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class TicketService {

    private headers: any;
    private options: any;
    public responseSolicitudToken: string;

    constructor(private _http: Http,
                private authenticationService: AuthenticationService
    ) {}

    queryTicketGrilla(userID: number): Observable<[ITicketGrilla]> {
        this.headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
        this.options = new RequestOptions({ headers: this.headers });

        return this._http.get(environment.urlServices + '/test/ticketgrilla/' + userID.toString() , this.options)
            .map((res: Response) => res.json())
            //  ..errors if any
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
            // .map(this.extractData)
            // .catch(this.handleError);
    }
}
