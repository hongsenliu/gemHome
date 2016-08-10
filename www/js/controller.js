angular.module('gemHome.controllers', ['gemHome.services'])

  .controller('SignInCtrl', function ($rootScope, $scope, API, $window) {
    // if the user is already logged in, take him to his bucketlist
    if ($rootScope.isSessionActive()) {
      $window.location.href = ('#/gemHome/list');
    }

    $scope.user = {
      email: "",
      password: ""
    };

    $scope.validateUser = function () {
      var email = this.user.email;
      var password = this.user.password;
      if(!email || !password) {
        $rootScope.notify("Please enter valid credentials");
        return false;
      }
      $rootScope.show('Please wait.. Authenticating');
      API.signin({
        email: email,
        password: password
      }).success(function (data) {
        $rootScope.setToken(email); // create a session kind of thing on the client side
        $rootScope.hide();
        $window.location.href = ('#/gemHome/list');
      }).error(function (error) {
        $rootScope.hide();
        $rootScope.notify("Invalid Username or password");
      });
    }

  })

  .controller('SignUpCtrl', function ($rootScope, $scope, API, $window) {
    $scope.user = {
      email: "",
      password: "",
      name: ""
    };

    $scope.createUser = function () {
      var email = this.user.email;
      var password = this.user.password;
      var uName = this.user.name;
      if(!email || !password || !uName) {
        $rootScope.notify("Please enter valid data");
        return false;
      }
      $rootScope.show('Please wait.. Registering');
      API.signup({
        email: email,
        password: password,
        name: uName
      }).success(function (data) {
        $rootScope.setToken(email); // create a session kind of thing on the client side
        $rootScope.hide();
        $window.location.href = ('#/gemHome/list');
      }).error(function (error) {
        $rootScope.hide();
        if(error.error && error.error.code == 11000)
        {
          $rootScope.notify("A user with this email already exists");
        }
        else
        {
          $rootScope.notify("Oops something went wrong, Please try again!");
        }

      });
    }
  })
