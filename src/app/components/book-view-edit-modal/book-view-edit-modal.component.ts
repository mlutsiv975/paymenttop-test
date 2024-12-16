import { NgIf } from '@angular/common'
import { Component, Inject } from '@angular/core'
import { MatButton } from '@angular/material/button'
import { MatCard, MatCardActions, MatCardContent, MatCardTitle } from '@angular/material/card'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'

import { Book } from '../../models/book.model'
import { BooksService } from '../../services/books/books.service'
import { BookFormComponent } from '../book-form/book-form.component'

type BookType = Book;

@Component({
  selector: 'app-book-view-edit-modal',
  standalone: true,
  imports: [BookFormComponent, NgIf, MatButton, MatCardTitle, MatCard, MatCardActions, MatCardContent],
  templateUrl: './book-view-edit-modal.component.html',
  styleUrl: './book-view-edit-modal.component.scss',
})
export class BookViewEditModalComponent {
  isEditMode = false

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: BookType,
    private dialogRef: MatDialogRef<BookViewEditModalComponent>,
    private bookService: BooksService,
  ) {}

  switchToEdit(): void {
    this.isEditMode = true
  }

  cancelEdit(): void {
    this.isEditMode = false
  }

  saveBook(updatedBook: Book): void {
    this.bookService.updateBook(updatedBook)
    this.dialogRef.close()
  }

  deleteBook(): void {
    this.bookService.deleteBook(this.data.id)
    this.dialogRef.close()
  }
}
