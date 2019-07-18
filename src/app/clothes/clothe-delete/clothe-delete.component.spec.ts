import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClotheDeleteComponent } from './clothe-delete.component';

describe('ClotheDeleteComponent', () => {
  let component: ClotheDeleteComponent;
  let fixture: ComponentFixture<ClotheDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClotheDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClotheDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
