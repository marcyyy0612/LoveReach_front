import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyProfComponent } from './modify-prof.component';

describe('ModifyProfComponent', () => {
  let component: ModifyProfComponent;
  let fixture: ComponentFixture<ModifyProfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifyProfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyProfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
