
angular.module('bookshelf', ['bookshelf.services'])

.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/books.html',
      controller: 'BookshelfController'
    })
    .when('/book', {
      templateUrl: 'views/book.html',
      controller: 'BookController'
    })
    .when('/book/:bookId', {
      templateUrl: 'views/book.html',
      controller: 'BookController'
    })
    .otherwise({
      redirectTo: '/'
    });
})

.controller('BookshelfController', function ($scope, BookService) {
  $scope.bookArray = BookService.getBooks();

  $scope.toggleStatus = function (bookId) {
    var book = BookService.getBooks(bookId);

    book.completed = !book.completed;

    BookService.updateBook(bookId, book);
  };

  $scope.removeBook = function (bookId) {
    BookService.deleteBook(bookId);
  };

})

.controller('BookController', function ($scope, BookService, $routeParams, $location) {
  $scope.bookId = $routeParams.bookId || undefined;
  $scope.book = {};

  if ($scope.bookId !== undefined) {
    $scope.book = BookService.getBooks($scope.bookId);
  }

  $scope.updateBook = function (bookId) {
    if (bookId !== undefined) {
      BookService.updateBook(bookId, $scope.book);
    } else {
      BookService.addBook($scope.book);
    }
    $location.url('/');
  };

  $scope.cancelUpdate = function () {
    $location.url('/');
  }

})

.controller('NavigationController', function ($scope, $location) {
  $scope.path = $location.path();
})

;

angular.module('bookshelf.services', []);
