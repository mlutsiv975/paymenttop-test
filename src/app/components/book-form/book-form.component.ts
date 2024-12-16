import { NgIf } from '@angular/common'
import { Component, EventEmitter, Input, OnInit,Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { MatButton } from '@angular/material/button'
import { MatFormField, MatLabel } from '@angular/material/form-field'
import { MatInput } from '@angular/material/input'

import { Book } from '../../models/book.model'

interface BookFormType {
  title: FormControl<string>;
  author: FormControl<string>;
  year: FormControl<number | null>;
  description: FormControl<string>;
};

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [MatLabel, ReactiveFormsModule, MatInput, MatFormField, MatButton, NgIf],
  templateUrl: './book-form.component.html',
  styleUrl: './book-form.component.scss',
})
export class BookFormComponent implements OnInit {
  @Input() book: Book | null = null
  @Input() readonly = false
  @Input() submitLabel = 'Save'
  @Output() save = new EventEmitter<Book>()
  @Output() close = new EventEmitter<void>()

  form!: FormGroup<BookFormType>;

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(this.book?.title || '', { nonNullable: true, validators: [Validators.required] }),
      author: new FormControl(this.book?.author || '', { nonNullable: true, validators: [Validators.required] }),
      year: new FormControl(this.book?.year || null, { validators: [Validators.required] }),
      description: new FormControl(this.book?.description || '', { nonNullable: true, validators: [Validators.required] }),
    });
  }

  handleSubmit(): void {
    if (this.form.valid) {
      this.save.emit(this.form.value as Book)
    }
  }
}
