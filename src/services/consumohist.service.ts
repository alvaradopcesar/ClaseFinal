import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { HttpInterceptorService } from '@covalent/http';
import { environment } from '../environments/environment';

import { IConsumoHistorio }  from '../interfaces/consumohist.interface';
import { Observable }     from 'rxjs/Observable';

@Injectable()
export class ConsumoHistService {

  constructor(private _http: HttpInterceptorService) {}

   queryConsumoHist(codigo: string): Observable<IConsumoHistorio[]> {
    //   return this._http.get('http://localhost:8082/api/v1/mnmo_vsatstatushist_getDeviceId/29100000000523')
      return this._http.get( environment.urlServices + '/api/v1/mnmo_vsatstatushist_getDeviceId/' + codigo)
                    .map((res:Response) => res.json())
                         // ...errors if any
                    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
                    // .map(this.extractData)
                    // .catch(this.handleError);
    }

}
