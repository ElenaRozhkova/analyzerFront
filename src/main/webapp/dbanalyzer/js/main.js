/**
 * 
 */

var app = angular.module("analyzerApp", [ "ngRoute", "ngCookies" ]);

app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "dbanalyzer/html/index.htm"
    })
    .when("/login", {
        templateUrl : "dbanalyzer/html/login.htm"
    })
    .when("/settings", {
        templateUrl : "dbanalyzer/html/settings.htm"
    })
    .when("/portfolio", {
        templateUrl : "dbanalyzer/html/portfolio.htm"
    })
    .when("/index", {
        templateUrl : "dbanalyzer/html/index.htm"
    });
});

app.controller("analyzerCtrl", [
		"$scope",
		"$http",
		"$cookies",
		function($scope, $http, $cookies) {
			var rootURL = "rws/services";
			window.location.href = '#!login';

			$scope.loginFromForm = function() {
				var dataObj = {
					usr : this.loginUsername,
					pwd : this.loginPassword
				}
				$scope.loginUsername = null;
				$scope.loginPassword = null;
				console.log(dataObj)
				var now = new Date();
				var expDate = new Date(now.setMinutes(now.getMinutes()+30));
				var request = $.ajax({
					method : 'POST',
					url : rootURL + '/login',
					dataType : "json",
					data : dataObj,

					success : function(result) {
						$scope.$apply(function() {
							console.log(result);
							$scope.username = result.userID;
							$cookies.put("usr", $scope.username, {'expires' : expDate})
							window.location.href = '#!index';
						})
					},
					error : function(jqXHR, textStatus, errorThrown) {
						alert("Request " + textStatus
								+ ", invalid login details");
					}
				});
				/*
				 * $http({ method : "POST", url : rootURL + '/login', data: fds,
				 * dataType: "json" }).then(function successfunction(response) {
				 * console.log(response); }, function failfunction(response) {
				 * console.log(response); });
				 */

			}

			$scope.signOut = function() {
				$scope.username = null;
				window.location.href = '#!login';
			}

			// Initialize
			$scope.username = $cookies.get("usr");

		}]);
