import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownDynamicPage } from './dropdown-dynamic.page';

describe('DropdownDynamicPage', () => {
  let component: DropdownDynamicPage;
  let fixture: ComponentFixture<DropdownDynamicPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DropdownDynamicPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownDynamicPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
