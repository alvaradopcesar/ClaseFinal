import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteformComponent } from './clienteform.component';

describe('ClienteformComponent', () => {
  let component: ClienteformComponent;
  let fixture: ComponentFixture<ClienteformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClienteformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClienteformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
