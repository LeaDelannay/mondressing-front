import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClotheUpdateComponent } from './clothe-update.component';

describe('ClotheUpdateComponent', () => {
  let component: ClotheUpdateComponent;
  let fixture: ComponentFixture<ClotheUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClotheUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClotheUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
