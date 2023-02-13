import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartamentoCadastradosComponent } from './departamento-cadastrados.component';

describe('DepartamentoCadastradosComponent', () => {
  let component: DepartamentoCadastradosComponent;
  let fixture: ComponentFixture<DepartamentoCadastradosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepartamentoCadastradosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepartamentoCadastradosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
