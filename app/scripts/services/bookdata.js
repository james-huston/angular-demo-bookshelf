/**
 * A fake book service for working with book data.
 *
 * This basically "fakes" a database or webservice calls and just
 * stores the data in a local array. Ideally this would use something
 * like ng-resource to make restful calls to an api for all of these
 * operations. 
 *
 * @author James Huston <james@jameshuston.net>
 * @since 2013-07-18
 */
angular.module('bookshelf.services')

.service('BookService', function () {
  var books = [
    {
      "title": "Functional JavaScript",
      "author": "Michael Fogus",
      "img": "functional-js.gif",
      "completed": false
    },
    {
      "title": "JavaScript: The Definitive Guide, 6th Edition",
      "author": "David Flanagan",
      "img": "js-definitive-guide.gif",
      "completed": true
    },
    {
      "title": "Node for Front-End Developers",
      "author": "Garann Means",
      "img": "node-for-fed.gif",
      "completed": false
    },
    {
      "title": "JavaScript Web Applications",
      "author": "Alex MacCaw",
      "img": "js-web-apps.gif",
      "completed": false
    },
    {
      "title": "Learning JavaScript Design Patterns",
      "author": "Addy Osmani",
      "img": "js-patterns.gif",
      "completed": false
    },
    {
      "title": "Maintainable JavaScript",
      "author": "Nicholas C. Zakas",
      "img": "maintainable-js.gif",
      "completed": true
    }
  ];

  return {
    getBooks: function (bookId) {
      if (bookId === undefined) {
        return books;
      }

      bookId = parseInt(bookId);

      return books[bookId];
    },
    setBooks: function (booksArray) {
      books = booksArray;
    },
    updateBook: function (bookId, bookData) {
      books[bookId] = bookData;
    },
    addBook: function (bookData) {
      books.push(bookData);
    },
    deleteBook: function (bookId) {
      if (bookId === undefined) {
        return;
      }

      bookId = parseInt(bookId);

      books.splice(bookId, 1);
    }
  };
});
