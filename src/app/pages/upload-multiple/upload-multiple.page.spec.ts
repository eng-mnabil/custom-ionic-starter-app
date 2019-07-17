import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadMultiplePage } from './upload-multiple.page';

describe('UploadMultiplePage', () => {
  let component: UploadMultiplePage;
  let fixture: ComponentFixture<UploadMultiplePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadMultiplePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadMultiplePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
