import { Component, AfterViewInit, ChangeDetectorRef, OnInit } from '@angular/core';

import { Title } from '@angular/platform-browser';

import { TdMediaService } from '@covalent/core';

import { Router } from '@angular/router';

@Component({
  selector: 'qs-dashboard-product',
  templateUrl: './dashboard-product.component.html',
  styleUrls: ['./dashboard-product.component.scss'],
})
export class DashboardProductComponent implements AfterViewInit, OnInit {

  title: string;
  constructor(private _titleService: Title,
              private _changeDetectorRef: ChangeDetectorRef,
              public media: TdMediaService,
              private _router: Router) { }

  ngOnInit(): void {
    // this._titleService.setTitle( 'Product Dashboard' );
    // this._titleService.setTitle( 'Administracion de Tokens' );
    this.title = this._titleService.getTitle();
  }

  ngAfterViewInit(): void {
    // broadcast to all listener observables when loading the page
    this.media.broadcast();
    // force a new change detection cycle since change detections
    // have finished when `ngAfterViewInit` is executed
    this._changeDetectorRef.detectChanges();
  }

  logout(): void {
    this._router.navigate(['/login']);
  }

}
