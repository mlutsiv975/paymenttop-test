import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs'

import { staticBooksList } from '../../meta/books/static-books-list'
import { Book } from '../../models/book.model'

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  private booksSubject = new BehaviorSubject<Book[]>(staticBooksList);

  get books$(): Observable<Book[]> {
    return this.booksSubject.asObservable();
  }

  addBook(book: Book): void {
    const books = this.booksSubject.value;
    this.booksSubject.next([...books, {
      ...book,
      id: crypto.randomUUID(),
    }]);
  }

  updateBook(updatedBook: Book): void {
    const books = this.booksSubject.value.map(book => book.id === updatedBook.id ? updatedBook : book);
    this.booksSubject.next(books);
  }

  deleteBook(id: string): void {
    const books = this.booksSubject.value.filter(book => book.id !== id);
    this.booksSubject.next(books);
  }
}
