import { ProveformComponent } from './proveform/proveform.component';
import { ProvetablaComponent } from './provetabla/provetabla.component';
import { ClienteformComponent } from './dashboard-product/clienteform/clienteform.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './main/main.component';
import { DashboardProductComponent } from './dashboard-product/dashboard-product.component';
import { LoginComponent } from './login/login.component';

import { AuthGuard } from './../guards/auth.guard';

import { CargaTokensComponent }  from './dashboard-product/carga-tokens/carga-tokens.component';

import { ClientetablaComponent } from './dashboard-product/clientetabla/clientetabla.component';

const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: '',
        component: MainComponent,
        children: [
            {
                path: '',
                component: DashboardProductComponent,
                children: [
                    {
                        path: '',
                        component: CargaTokensComponent,
                        canActivate: [AuthGuard],
                    },
                    {
                        path: 'cargatokens',
                        component: CargaTokensComponent,
                        canActivate: [AuthGuard],
                    },
                ],
            },
            {
                path: 'product',
                component: DashboardProductComponent,
                children: [
                    {
                        path: '',
                        component: CargaTokensComponent,
                        canActivate: [AuthGuard],
                    },
                    {
                        path: 'cargatokens',
                        component: CargaTokensComponent,
                        canActivate: [AuthGuard],
                    },
                    {
                        path: 'clientetabla',
                        component: ClientetablaComponent,
                        canActivate: [AuthGuard],
                    },
                    {
                        path: 'clienteform',
                        component: ClienteformComponent,
                        canActivate: [AuthGuard],
                    },
                    {
                        path: 'clienteform/:id',
                        component: ClienteformComponent,
                        canActivate: [AuthGuard],
                    },
                    {
                        path: 'proveedortabla',
                        component: ProvetablaComponent,
                        canActivate: [AuthGuard],
                    },
                    {
                        path: 'proveedorform',
                        component: ProveformComponent,
                        canActivate: [AuthGuard],
                    },
                    {
                        path: 'proveedorform/:id',
                        component: ProveformComponent,
                        canActivate: [AuthGuard],
                    },
                 ],
            },

        ],
    },
];

// const routes: Routes = [
//     {
//         path: 'login',
//         component: LoginComponent
//     },
//     {
//         path: '',
//         component: MainComponent,
//         children: [
//             {
//                 component: DashboardComponent,
//                 path: '',
//             },
//             {
//                 path: 'product',
//                 component: DashboardProductComponent,
//                 children: [
//                     {
//                         path: '',
//                         component: ProductOverviewComponent
//                     },
//                     {
//                         path: 'stats',
//                         component: ProductStatsComponent
//                     },
//                     {
//                         path: 'features',
//                         children: [
//                             {
//                                 path: '',
//                                 component: ProductFeaturesComponent
//                             },
//                             {
//                                 path: 'add',
//                                 component: FeaturesFormComponent
//                             },
//                             {
//                                 path: ':id/delete',
//                                 component: FeaturesFormComponent
//                             },
//                             {
//                                 path: ':id/edit',
//                                 component: FeaturesFormComponent
//                             },
//                         ]
//                     },
//                 ]
//             },
//             {
//                 path: 'item/:id',
//                 component: DetailComponent
//             },
//             {
//                 path: 'logs',
//                 component: LogsComponent
//             },
//             {
//                 path: 'form',
//                 component: FormComponent
//             },
//             { path: '', loadChildren: './users/users.module#UsersModule' },
//         ],
//     },
// ];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { useHash: true }),
    ],
    exports: [
        RouterModule,
    ],
})
export class AppRoutingModule { }
export const routedComponents: any[] = [
    MainComponent, LoginComponent,
    DashboardProductComponent,
];
