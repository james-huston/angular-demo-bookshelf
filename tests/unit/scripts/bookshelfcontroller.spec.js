/**
 * Tests for our BookshelfController.
 *
 * @author James Huston <james@jameshuston.net>
 * @since 2013-07-18
 */
describe('In our bookshelf app', function () {
  it('should find true to be truthy', function () {
    expect(true).toBeTruthy();
  });

  beforeEach(module('bookshelf'));

  describe('the bookshelf controller', function () {
    var bookshelfController, scope, bookService;

    beforeEach(inject(function ($rootScope, BookService, $controller) {
      scope = $rootScope.$new();

      bookService = BookService;

      bookshelfController = $controller(
        'BookshelfController', {
          $scope: scope,
          bookService: BookService,
          $routeParams: {}
        });
    }));

    it('should be truthy and to add fun stuff to our scope', function () {
      expect(bookshelfController).toEqual(jasmine.any(Object));
      expect(scope.toggleStatus).toEqual(jasmine.any(Function));
      expect(scope.removeBook).toEqual(jasmine.any(Function));
      expect(scope.readFilter).toEqual(jasmine.any(Object));
      // make sure our filter.completed is undefined by default
      expect(scope.readFilter.completed).toEqual(undefined);
      expect(scope.bookArray).toEqual(jasmine.any(Array));

      expect(bookService).toEqual(jasmine.any(Object));
    });

    describe('when calling toggleStatus', function () {
      it('should set completed to false on a read book', function () {
        var testBook = bookService.getBooks(1);
        expect(testBook.completed).toBeTruthy();

        scope.toggleStatus(1);

        testBook = bookService.getBooks(1);
        expect(testBook.completed).toBeFalsy();
      });

      it('should set completed to true on an unread book', function () {
        var testBook = bookService.getBooks(0);
        expect(testBook.completed).toBeFalsy();

        scope.toggleStatus(0);

        testBook = bookService.getBooks(0);
        expect(testBook.completed).toBeTruthy();
      });
    });

    describe('when calling removeBook', function () {
      it('should remove an existing book', function () {
        expect(scope.bookArray.length).toEqual(6);

        scope.removeBook(1);

        expect(scope.bookArray.length).toEqual(5);
      });

      it('should do nothing on a bogus book id', function () {
        expect(scope.bookArray.length).toEqual(6);

        scope.removeBook(5280);

        expect(scope.bookArray.length).toEqual(6);
      });
    });

    describe('when setting the routeParams for sorting to reading', function () {
      beforeEach(inject(function (BookService, $controller) {
        bookshelfController = $controller(
          'BookshelfController', {
            $scope: scope,
            bookService: BookService,
            $routeParams: {
              filter: 'reading'
            }
          });
      }));

      it('should set the scope filter to the string "false"', function () {
        expect(scope.readFilter.completed).toEqual('false');
      });
    });

    describe('when setting the routeParams for sorting to completed', function () {
      beforeEach(inject(function (BookService, $controller) {
        bookshelfController = $controller(
          'BookshelfController', {
            $scope: scope,
            bookService: BookService,
            $routeParams: {
              filter: 'completed'
            }
          });
      }));

      it('should set the scope filter to the string "true"', function () {
        expect(scope.readFilter.completed).toEqual('true');
      });
    });

  });
});
