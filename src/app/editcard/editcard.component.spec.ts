import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditcardComponent } from './editcard.component';

describe('EditcardComponent', () => {
  let component: EditcardComponent;
  let fixture: ComponentFixture<EditcardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditcardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
