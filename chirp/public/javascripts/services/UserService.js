chirpApp.factory('UserService', function UserService($http, $location) {
  var factory = {};
  factory.authenticated = false;
  factory.current_user = '';

  factory.user = {username: '', password: ''};
  factory.error_message = '';

  factory.login = function() {
    $http.post('/auth/login', factory.user).success(function(data) {
      if(data.state == 'success'){
        factory.authenticated = true;
        factory.current_user = data.user.username;
        $location.path('/');
      } else {
        factory.error_message = data.message;
      }
    });
  };

  factory.register = function() {
    $http.post('/auth/signup', factory.user).success(function(data) {
      if(data.state == 'success'){
        factory.authenticated = true;
        factory.current_user = data.user.username;
        $location.path('/');
      } else {
        factory.error_message = data.message;
      }
    });
  };

  factory.signout = function () {
    $http.get('/auth/signout');
    factory.authenticated = false;
    factory.current_user = '';
  };
});
