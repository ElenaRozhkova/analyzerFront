/**
 * 
 */

var app = angular.module("analyzerApp", []); 

app.controller("analyzerCtrl", ["$scope", "$http", function($scope, $http) {

	var rootURL = "rws/services";
	
	$scope.mode = 'login';
	
	$scope.username = null;
	
	
	$scope.loginFromForm = function () {
		var fds = {
				usr: $scope.loginUsername,
				pwd: $scope.loginPassword
		}
	    var request = $.ajax({
			method: 'POST',
			url: rootURL + '/login',
			dataType: "json", // data type of response
			data: fds,
	                
			success: function ( result) {
				$scope.$apply(function() {
					console.log(result);
					$scope.mode = 'index';
					$scope.username = result.userID;
				})
			},
			error: function( jqXHR, textStatus, errorThrown )
		    {
		        alert( "Request " + textStatus + ", invalid login details: " + fds );
		    }
		});
		/*$http({
	        method : "POST",
	        url : rootURL + '/login',
	        data: fds,
	        dataType: "json"
	    }).then(function successfunction(response) {
	    	console.log(response);
	    }, function failfunction(response) {
	    	console.log(response);
	    }); */
	    
	}
	
}]);
