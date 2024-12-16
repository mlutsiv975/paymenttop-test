import { animate, style, transition, trigger } from '@angular/animations'
import { AsyncPipe } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { MatButton } from '@angular/material/button'
import { MatCard, MatCardActions, MatCardContent, MatCardSubtitle, MatCardTitle } from '@angular/material/card'
import { MatDialog } from '@angular/material/dialog'
import { MatFormField, MatLabel } from '@angular/material/form-field'
import { MatInput } from '@angular/material/input'
import { MatToolbar } from '@angular/material/toolbar'
import { BehaviorSubject, combineLatest, map, Observable, tap } from 'rxjs'

import { BookAddModalComponent } from '../../components/book-add-modal/book-add-modal.component'
import { BookViewEditModalComponent } from '../../components/book-view-edit-modal/book-view-edit-modal.component'
import { Book } from '../../models/book.model'
import { BooksService } from '../../services/books/books.service'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatCard,
    MatButton,
    AsyncPipe,
    MatCardTitle,
    MatCardSubtitle,
    MatCardContent,
    MatCardActions,
    MatToolbar,
    MatFormField,
    MatLabel,
    MatInput,
    FormsModule,
  ],
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss',
  animations: [
    trigger('fadeInOutAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-10px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export default class HomePage implements OnInit {
  books$ = this.bookService.books$.pipe(tap((d) => console.log(d)));
  filteredBooks$!: Observable<Book[]>;
  private searchInput$ = new BehaviorSubject<string>('');

  constructor(
    private bookService: BooksService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.filteredBooks$ = combineLatest([this.books$, this.searchInput$]).pipe(
      map(([books, searchQuery]) => {
        if (!searchQuery) {
          return books;
        }
        return books.filter(book =>
          book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          book.author.toLowerCase().includes(searchQuery.toLowerCase())
        );
      })
    );
  }

  onSearchInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchInput$.next(input.value);
  }

  viewBook(book: Book): void {
    this.dialog.open(BookViewEditModalComponent, { data: book })
  }

  addBook(): void {
    this.dialog.open(BookAddModalComponent)
  }
}
