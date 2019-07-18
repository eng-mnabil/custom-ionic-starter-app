import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownPage } from './dropdown.page';

describe('DropdownPage', () => {
  let component: DropdownPage;
  let fixture: ComponentFixture<DropdownPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DropdownPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
