
angular.module('bookshelf', [])

.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/main.html',
      controller: 'BookshelfCtrl'
    })
    .when('/books', {
      templateUrl: 'views/books.html',
      controller: 'BooksController'
    })
    .otherwise({
      redirectTo: '/'
    });
})

.controller('BookshelfController', function ($scope) {

})

.controller('BooksController', function ($scope) {
  
})

;
