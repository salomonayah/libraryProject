import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookLibraryLayoutComponent } from './bookLibrary-layout.component';

describe('AdminLayoutComponent', () => {
  let component: BookLibraryLayoutComponent;
  let fixture: ComponentFixture<BookLibraryLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookLibraryLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookLibraryLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
