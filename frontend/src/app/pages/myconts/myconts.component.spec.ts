import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MycontsComponent } from './myconts.component';

describe('MycontsComponent', () => {
  let component: MycontsComponent;
  let fixture: ComponentFixture<MycontsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MycontsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MycontsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
