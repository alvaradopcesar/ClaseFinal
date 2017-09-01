import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientetablaComponent } from './clientetabla.component';

describe('ClientetablaComponent', () => {
  let component: ClientetablaComponent;
  let fixture: ComponentFixture<ClientetablaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientetablaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientetablaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
