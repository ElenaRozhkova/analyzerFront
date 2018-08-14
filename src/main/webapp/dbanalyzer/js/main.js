/**
 * 
 */

var app = angular.module("analyzerApp", [ "ngRoute", "ngCookies" ]);

app.config(function($routeProvider) {
	$routeProvider.when("/", {
		templateUrl : "dbanalyzer/html/index.htm"
	}).when("/login", {
		templateUrl : "dbanalyzer/html/login.htm"
	}).when("/settings", {
		templateUrl : "dbanalyzer/html/settings.htm"
	}).when("/portfolio", {
		templateUrl : "dbanalyzer/html/portfolio.htm"
	}).when("/index", {
		templateUrl : "dbanalyzer/html/index.htm"
	});
});

app.controller("analyzerCtrl", [
		"$scope",
		"$http",
		"$cookies",
		"$httpParamSerializerJQLike",
		function($scope, $http, $cookies, $httpParamSerializerJQLike) {
			var rootURL = "rws/services";

			$scope.loginFromForm = function() {
				var dataObj = {
					usr : this.loginUsername,
					pwd : this.loginPassword
				}
				$scope.loginUsername = null;
				$scope.loginPassword = null;
				console.log(dataObj)
				var now = new Date();
				var expDate = new Date(now.setMinutes(now.getMinutes() + 30));

				$http({
					method : "POST",
					url : rootURL + '/login',
					data : $httpParamSerializerJQLike(dataObj),
					dataType : "json",
					headers : {
						'Content-Type' : 'application/x-www-form-urlencoded'
					}
				}).then(function successfunction(response) {
						console.log(response);
						$scope.username = response.data.userID;
						$cookies.put("usr", $scope.username, {
							'expires' : expDate
						})
						window.location.href = '#!index';
				}, function failfunction(response) {
					alert("Invalid login details!")
				});

			}

			$scope.signOut = function() {
				$scope.username = null;
				window.location.href = '#!login';
			}

			// Initialize
			$scope.username = $cookies.get("usr");

			if (!$scope.username) {
				window.location.href = '#!login';
			}

		} ]);
