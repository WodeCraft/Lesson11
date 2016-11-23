import 'fetch-polyfill';
import {HttpClient} from 'aurelia-fetch-client';

let httpClient = new HttpClient();
let baseUrl = "http://localhost:63497";

export class Books {
    constructor(data) { 
        Object.assign(this, data); 
        this.heading = 'Testing the Book Web API from Aurelia'; 
        this.bookList = null; 
        this.status = null; 
        this.id = 0; 
        this.title = ""; 
        this.authorId = "";
        this.BookId = 0;

        this.getBooks();
    }

    activate(path) {
        if (path && path.id) {
            this.BookId = path.id;
            this.getBook(this.BookId);
        }
    }

    getBooks() {
        httpClient.fetch(baseUrl + '/api/books', {
            method: "GET"
        })
            .then(response => response.json())
            .then(data => {
                this.bookList = data;
                console.log(data);
            });
    }

    getBook(id) {
        var url = baseUrl + "/api/books/" + id;
        console.log(this.BookId);
        httpClient.fetch(url, {
            mehtod: "GET"
        })
            .then(response => response.json())
            .then(data => {
                this.id = data.Id;
                this.title = data.Title;
                this.authorId = data.AuthorId
            });
    }

    insertBook() {
        var book = {
            "Title": this.title,
            "AuthorId": this.authorId
        };

        httpClient.fetch(baseUrl + '/api/books', {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(book)
        })
            .then(response => response.json())
            .then(data => {
                this.status = data;
                this.getBooks();
            });
    }

    updateBook() {
        var book = {
            "Id": this.id,
            "Title": this.title,
            "AuthorId": this.authorId
        };

        var url = baseUrl + "/api/books" + this.id

        httpClient.fetch(url, {
            method: "PUT",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(book)
        })
            .then(response => response.json())
            .then(data => {
                this.status = data;
                this.getBooks();
            });

    }

    deleteBook() {
        var url = baseUrl + "/api/books" + this.id

        httpClient.fetch(url, {
            method: "DELETE",
        })
            .then(response => response.json())
            .then(data => {
                this.status = data;
                this.getBooks();
                console.log(data);
            });

    }
}