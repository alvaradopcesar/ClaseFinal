
import { Injectable } from '@angular/core';
import { Http, Response ,RequestOptions,Headers} from '@angular/http';
import { environment } from '../environments/environment';
import { ISolicitudTokensAdm } from './../interfaces/solicitud_tokens.interface';
import { AuthenticationService } from './authentication.service';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class TerminalCustomerIdxService {

   public responseSolicitudToken: string;

  constructor(private _http: Http,
              private authenticationService: AuthenticationService
  ) {}

   querySolicitudTokenAdm(userID: number): Observable<ISolicitudTokensAdm[]> {
      let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
      let options = new RequestOptions({ headers: headers });

      return this._http.get(environment.urlServices + '/api/v1/cpe_sol_token_adm/' + userID.toString() , options)
                    .map((res:Response) => res.json())
                         //...errors if any
                    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
                    // .map(this.extractData)
                    // .catch(this.handleError);
    }

    actualizarTokenAdm(idx: number, estado: string , observacion: string): Observable<boolean> {
        let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
        let options = new RequestOptions({ headers: headers });
        console.log('actualizarTokenAdm');
        return this._http.post( environment.urlServices + '/api/v1/cpe_sol_token_post_estado',
                     { idx: idx, estado: estado , observacion: observacion} ,options)
            .map((response: Response) => {
                return true;
            });
    }


}
