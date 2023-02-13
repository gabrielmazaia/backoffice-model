import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastradasComponent } from './cadastradas.component';

describe('CadastradasComponent', () => {
  let component: CadastradasComponent;
  let fixture: ComponentFixture<CadastradasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastradasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastradasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
