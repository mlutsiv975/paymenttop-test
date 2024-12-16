import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookViewEditModalComponent } from './book-view-edit-modal.component';

describe('BookViewEditModalComponent', () => {
  let component: BookViewEditModalComponent;
  let fixture: ComponentFixture<BookViewEditModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookViewEditModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookViewEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
