import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyProfImgComponent } from './modify-prof-img.component';

describe('ModifyProfImgComponent', () => {
  let component: ModifyProfImgComponent;
  let fixture: ComponentFixture<ModifyProfImgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifyProfImgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyProfImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
