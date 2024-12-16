import { NgIf } from '@angular/common'
import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button'
import { MatCard, MatCardActions, MatCardContent, MatCardTitle } from '@angular/material/card'
import { MatDialogRef } from '@angular/material/dialog'

import { Book } from '../../models/book.model'
import { BooksService } from '../../services/books/books.service'
import { BookFormComponent } from '../book-form/book-form.component'

@Component({
  selector: 'app-book-add-modal',
  standalone: true,
  imports: [BookFormComponent, MatButton, MatCard, MatCardActions, MatCardContent, MatCardTitle, NgIf],
  templateUrl: './book-add-modal.component.html',
  styleUrl: './book-add-modal.component.scss',
})
export class BookAddModalComponent {
  constructor(
    private dialogRef: MatDialogRef<BookAddModalComponent>,
    private bookService: BooksService,
  ) {}

  addBook(newBook: Book): void {
    this.bookService.addBook(newBook)
    this.dialogRef.close()
  }

  closeModal() {
    this.dialogRef.close()
  }
}
