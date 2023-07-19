import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { BookResponse } from '../bookResponse';

@Component({
  selector: 'app-display-books',
  templateUrl: './display-books.component.html',
  styleUrls: ['./display-books.component.css']
})
export class DisplayBooksComponent implements OnInit {
books: BookResponse;
 constructor(private service: AuthService,
             private http: HttpClient) {
    this.getData();
  }

  ngOnInit() {
  }
  getData() {
    this.http.get<BookResponse>(`${this.service.baseURL}/library/librarian/getBooks`).subscribe(response => {
      this.books = response;
      console.log(this.books);
    });
  }

  deleteLibrarian(books) {
    this.http.delete(`${this.service.baseURL}/library/librarian/${books.bookid}`).subscribe(resData => {
      if (resData) {
        // alert('Book Deleted Successfully');
        console.log(resData);
        this.getData();
      } else {
        alert('Failed to Delete Book');
      }
      console.log(resData);
      this.getData();
    }, err => {
      console.log(err);
    });
  }

}
