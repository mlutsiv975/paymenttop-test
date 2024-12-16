import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookAddModalComponent } from './book-add-modal.component';

describe('BookAddModalComponent', () => {
  let component: BookAddModalComponent;
  let fixture: ComponentFixture<BookAddModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookAddModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookAddModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
