import { ProveedorService } from './../services/proveedor.service';


import { ActivatedRoute } from '@angular/router';
import { NgModule, Type } from '@angular/core';
import { BrowserModule, Title }  from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CovalentHttpModule, IHttpInterceptor } from '@covalent/http';
import { CovalentHighlightModule } from '@covalent/highlight';
import { CovalentMarkdownModule } from '@covalent/markdown';

import { AppComponent } from './app.component';
import { RequestInterceptor } from '../config/interceptors/request.interceptor';
import { MOCK_API } from '../config/api.config';

import { routedComponents, AppRoutingModule } from './app-routing.module';

import { CovalentFileModule } from '@covalent/core';

import { SharedModule } from './shared/shared.module';

/* ini Traduccion */
import { HttpModule, Http } from '@angular/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: Http): TranslateHttpLoader {
    return new TranslateHttpLoader(http, 'data/i18n/', '.json');
}
/* fin Traduccion  */

/* ini Seguridad */
import { AuthGuard } from './../guards/auth.guard';
import { AuthenticationService } from './../services/authentication.service';
/* fin Seguridad */

/* ini Libreria Prime-NG para las tablas*/
// import { DataTableModule, SharedModule } from 'primeng/primeng';
import { DataTableModule } from 'primeng/primeng';

import { MaterialModule, MdDatepickerModule, MdNativeDateModule  } from '@angular/material';

/* ini Components fot App */
import { LoginComponent, LoginErrorDialogComponent01 } from './login/login.component';
import { MainComponent } from './main/main.component';
import { DashboardProductComponent } from './dashboard-product/dashboard-product.component';
import { CargaTokensComponent, ConfirmDialog }
   from './dashboard-product/carga-tokens/carga-tokens.component';

import { AccesosService } from './../services/accesos.service';
import { ClientetablaComponent } from './dashboard-product/clientetabla/clientetabla.component';
import { ClienteService } from './../services/cliente.service';
import { ClienteformComponent } from './dashboard-product/clienteform/clienteform.component';
import { ProvetablaComponent } from './provetabla/provetabla.component';
import { ProveformComponent } from './proveform/proveform.component';
/* fin Components fot App */

const httpInterceptorProviders: Type<any>[] = [
  RequestInterceptor,
];

// export function getAPI(): string {
//   return MOCK_API;
// }

@NgModule({
  declarations: [
    AppComponent,
    routedComponents,
    LoginComponent,
    LoginErrorDialogComponent01,
    MainComponent,
    CargaTokensComponent,
    ConfirmDialog,
    ClientetablaComponent,
    ClienteformComponent,
    ProvetablaComponent,
    ProveformComponent,
  ], // directives, components, and pipes owned by this NgModule
  imports: [
    AppRoutingModule,
    BrowserModule,
    TranslateModule.forRoot(),
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [Http],
          },
        }),
    BrowserAnimationsModule,
    SharedModule,
    CovalentHttpModule.forRoot({
      interceptors: [{
        interceptor: RequestInterceptor, paths: ['**'],
      }],
    }),
    CovalentHighlightModule,
    CovalentMarkdownModule,
    CovalentFileModule,
    DataTableModule,
    MaterialModule,
    MdDatepickerModule,
    MdNativeDateModule,
  ], // modules needed to run this module
  providers: [
    httpInterceptorProviders,
    Title,
    // {
    //   provide: USERS_API, useFactory: getAPI,
    // },
    AuthGuard,
    AuthenticationService,
    AccesosService,
    ClienteService,
    ProveedorService,
  ], // additional providers needed for this module
  entryComponents: [
    ConfirmDialog,
    LoginErrorDialogComponent01,
  ],
  bootstrap: [ AppComponent ],
})
export class AppModule {}
