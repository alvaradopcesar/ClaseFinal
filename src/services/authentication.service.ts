import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/operator/map'
import { environment } from './../environments/environment';
import { JwtHelper } from 'angular2-jwt';

@Injectable()
export class AuthenticationService {
    public token: string;
    // public customerIdx: number;
    public moduleName: string = 'bifrost';
    public userID: number;
    public customerIdx: number;

    jwtHelper: JwtHelper = new JwtHelper();

    // constructor(private http: Http) {
    //     // set token if saved in local storage
    //     let currentUser = JSON.parse(localStorage.getItem(this.moduleName));
    //     this.token = currentUser && currentUser.token;
    //     console.log('Constructor AuthenticationService')
    //     if (this.token) {
    //         var object = this.jwtHelper.decodeToken(this.token);
    //         console.log('Constructor AuthenticationService entre')
    //         console.log(object.customerID);
    //         console.log(object.userID);
    //         // this.userID = object.userID;
    //     }
    // }

    constructor(private http: Http) {
        // set token if saved in local storage
        let currentUser: any = JSON.parse(localStorage.getItem(this.moduleName));
        this.token = currentUser && currentUser.token;
        if (this.token) {
            let object: any = this.jwtHelper.decodeToken(this.token);
            // console.log('Constructor AuthenticationService')
            // console.log(object.userID);
            // this.userID = object.userID;
            this.customerIdx = object.customerID;
            this.userID = object.userID;
        }
    }

    login(username: string, password: string): Observable<boolean> {
        // return this.http.post('/api/authenticate', JSON.stringify({ username: username, password: password }))
        // return this.http.post( environment.urlServices + '/api/v1/authenticate',
        return this.http.post( environment.urlServices + '/auth/authenticate_bitfrost',
                     { username: username, password: password })
            .map((response: Response) => {
                // login successful if there's a jwt token in the response

                let object: any = this.jwtHelper.decodeToken(response.json().token);
                // console.log('token decode');
                // console.log(object);
                // console.log(object.customerID);

                let token: any = response.json() && response.json().token;
                // let customerIdx = response.json().customer_idx;
                let customerIdx: number = object.customerID;
                let userID: number = object.userID;
                if (token) {
                    // set token property
                    this.token = token;
                    this.customerIdx = customerIdx;
                    this.userID = userID;
                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem(this.moduleName,
                        JSON.stringify({ username: username, token: token}));
                    // return true to indicate successful login

                //    this.useJwtHelper();

                    return true;
                } else {
                    // return false to indicate failed login
                    return false;
                }
            });
    }

    logout(): void {
        this.token = null ;
        this.customerIdx = null;
        this.userID = null;
        // remove user from local storage to log user out
        localStorage.removeItem(this.moduleName);
    }

    getModuleName() : string {
        return this.moduleName;
    }

    // getToken() : string   {
    //     let currentUser = JSON.parse(localStorage.getItem(this.moduleName));
    //     return currentUser.token;
    // }

    // getUsername() : string   {
    //     let currentUser = JSON.parse(localStorage.getItem(this.moduleName));
    //     return currentUser.username;
    // }

    // getCustomerIdx() : number   {
    //     let currentUser = JSON.parse(localStorage.getItem(this.moduleName));
    //     return currentUser.customerIdx;
    // }

}