/**
 * Our main app file with our module declarations and controllers.
 *
 * @author James Huston <james@jameshuston.net>
 * @since 2013-07-18
 */
angular.module('bookshelf', ['bookshelf.services', 'ui.router'])

.config(function ($routeProvider, $stateProvider) {
  // $routeProvider
  //   .when('/book', {
  //     templateUrl: 'views/book.html',
  //     controller: 'BookController'
  //   })
  //   .when('/book/:bookId', {
  //     templateUrl: 'views/book.html',
  //     controller: 'BookController'
  //   })
  //   .when('/:filter', {
  //     templateUrl: 'views/books.html',
  //     controller: 'BookshelfController'
  //   })
  //   .otherwise({
  //     redirectTo: '/'
  //   });

  $stateProvider
    .state('index', {
      url: '/:filter',
      views: {
        'rootview@': {
          templateUrl: 'views/rootview.html'
        },
        'mainContent@index': {
          templateUrl: 'views/main.html',
          controller: 'BookshelfController'
        },
        'rightBar@index': {
          template: ''
        }
      }
    })
    .state('index.book', {
      url: '/book',
      views: {
        'rightBar@index': {
          templateUrl: 'views/book.html',
          controller: 'BookController'
        }
      }
    })
    .state('index.book.edit', {
      url: '/:bookId',
      resolve: {
        vara: function () {
            console.log('resolving');
          }
      },
      views: {
        'rightBar@index': {
          templateUrl: 'views/book.html',
          controller: 'BookController'
        }
      },
    });
})

.controller('AppController', function ($state, $stateParams) {
})

.controller('BookshelfController', function ($scope, BookService, $stateParams, $state) {
  var filter = $stateParams.filter || undefined;
  $scope.filter = filter;
  $scope.readFilter = {};
  if (filter === 'reading') {
    $scope.readFilter.completed = 'false';
  } else if (filter === 'completed') {
    $scope.readFilter.completed = 'true';
  }

  $scope.bookArray = BookService.getBooks();

  $scope.toggleStatus = function (bookId) {
    var book = BookService.getBooks(bookId);
    book.completed = !book.completed;
    BookService.updateBook(bookId, book);
  };

  $scope.removeBook = function (bookId) {
    BookService.deleteBook(bookId);
    $state.go('index');
  };
})

.controller('BookController', function ($scope, BookService, $stateParams, $state) {
  $scope.book = {};
  $scope.bookId = $stateParams.bookId || undefined;
  if ($scope.bookId !== undefined) {
    $scope.book = BookService.getBooks($scope.bookId);
  }

  $scope.updateBook = function (bookId) {
    if (bookId !== undefined) {
      BookService.updateBook(bookId, $scope.book);
    } else {
      BookService.addBook($scope.book);
    }
    $state.go('index');
  };

  $scope.cancelUpdate = function () {
    $state.go('index');
  }
})

.controller('NavigationController', function ($scope, $location) {
  $scope.path = $location.path();
});

angular.module('bookshelf.services', []);
