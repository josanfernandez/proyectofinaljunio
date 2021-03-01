import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Grafico02Component } from './grafico02.component';

describe('Grafico02Component', () => {
  let component: Grafico02Component;
  let fixture: ComponentFixture<Grafico02Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Grafico02Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Grafico02Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
