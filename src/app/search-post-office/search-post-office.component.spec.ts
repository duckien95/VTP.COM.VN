import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPostOfficeComponent } from './search-post-office.component';

describe('SearchPostOfficeComponent', () => {
  let component: SearchPostOfficeComponent;
  let fixture: ComponentFixture<SearchPostOfficeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchPostOfficeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchPostOfficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
