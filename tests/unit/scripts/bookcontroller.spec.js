/**
 * Tests for our BookController.
 *
 * @author James Huston <james@jameshuston.net>
 * @since 2013-07-18
 */
describe('In our bookshelf app', function () {
  // set our angular module, provided by angular-mocks
  beforeEach(module('bookshelf'));

  describe('the bookshelf controller', function () {
    var bookController, scope, bookService, location;

    beforeEach(inject(function ($rootScope, BookService, $controller) {
      // create a new and clean scope to use for our controller.
      scope = $rootScope.$new();

      bookService = BookService;

      // create a completely bogus location object to act as a mock.
      // we know that the controller call $location.url to set the
      // url so we make that available and have it set a local property
      // so we can verify it's calls.
      location = {
        currentUrl: undefined,
        url: function (url) {
          this.currentUrl = url;
        }
      };

      // create our controller. this executes it's "constructor" function
      // so if we need to change params later we need to recreate it with
      // the new params.
      bookController = $controller(
        'BookController', {
          $scope: scope,
          BookService: bookService,
          $routeParams: {},
          $location: location
        });
    }));

    describe('when passing in an undefined bookId', function () {
      beforeEach(inject(function ($controller) {
        bookController = $controller(
          'BookController', {
            $scope: scope,
            BookService: bookService,
            $routeParams: {
              bookId: undefined
            },
            $location: location
          });
      }));

      it('should set the book on scope to be an empty object', function () {
        expect(scope.book).toEqual(jasmine.any(Object));
        expect(scope.book.id).toEqual(undefined);
      });
    });

    describe('when passing in a valid bookId', function () {
      beforeEach(inject(function ($controller) {
        bookController = $controller(
          'BookController', {
            $scope: scope,
            BookService: bookService,
            $routeParams: {
              bookId: 1
            },
            $location: location
          });
      }));

      it('should set the book on the scope correctly', function () {
        expect(scope.book.title).toEqual("JavaScript: The Definitive Guide, 6th Edition");
        expect(scope.bookId).toEqual(1);
      });
    });

    describe('calling the cancel funciton', function () {
      it('should set the url to / on the location object', function () {
        expect(location.currentUrl).toEqual(undefined);

        scope.cancelUpdate();

        expect(location.currentUrl).toEqual('/');
      });
    });

    describe('calling the updateBook function', function () {
      describe('with a valid bookId', function () {
        it('should update that book based on the scope', function () {
          var book = bookService.getBooks(2);
          expect(book.author).not.toEqual('Me, Myself, and I');
          expect(location.currentUrl).toEqual(undefined);

          book.author = 'Me, Myself, and I';
          scope.book = book;
          scope.updateBook(2);

          book = bookService.getBooks(2);
          expect(book.author).toEqual('Me, Myself, and I');
          expect(location.currentUrl).toEqual('/');
        });
      });

      describe('with no bookId but a book on scope', function () {
        it('should add a new book', function () {
          var bookArray = bookService.getBooks();
          expect(bookArray.length).toEqual(6);
          expect(location.currentUrl).toEqual(undefined);

          scope.book = {
            author: 'Me, Myself, and I',
            title: 'Writing good Javascripts: my way',
            img: 'none',
            completed: false
          };

          scope.updateBook();
          bookArray = bookService.getBooks();
          expect(bookArray.length).toEqual(7);
          expect(bookArray[6].title).toEqual(scope.book.title);
          expect(bookArray[6].author).toEqual(scope.book.author);
          expect(bookArray[6].img).toEqual(scope.book.img);
          expect(bookArray[6].completed).toEqual(scope.book.completed);
          expect(location.currentUrl).toEqual('/');
        });
      });
    });

  });
});