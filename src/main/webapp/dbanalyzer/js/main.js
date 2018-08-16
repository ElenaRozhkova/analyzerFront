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
			
			var date = new Date();
			
			var months = [
				"Jan", "Feb", "Mar", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dez"
			]
			
			$scope.counterparties = [
				{
					name: "Lina",
					value: "1"
				},
				{
					name: "Richard",
					value: "2"
				},
				{
					name: "Selvyn",
					value: "3"
				},
				{
					name: "Lewis",
					value: "4"
				},
				{
					name: "Estelle",
					value: "5"
				},
			]
			
			$scope.day = date.getDate();
			$scope.month = months[date.getMonth()];
			$scope.hours = date.getHours();
			$scope.minutes = date.getMinutes();

			$scope.loginFromForm = function() {
				var dataObj = {
					usr : this.loginUsername,
					pwd : this.loginPassword
				}
				$scope.loginUsername = null;
				$scope.loginPassword = null;
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
						$scope.username = response.data.userID;
						$cookies.put("usr", $scope.username, {
							'expires' : expDate
						})
						window.location.href = '#!index';
				}, function failfunction(response) {
					alert("Invalid login details!")
				});

			}
			
			$scope.switchTab = function(tabName) {
				$scope.indexTab = tabName;
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
			
			$http({
				method : "GET",
				url : rootURL + '/get/instruments/all',
				data : null,
				dataType : "json",
				headers : {
					'Content-Type' : 'application/x-www-form-urlencoded'
				}
			}).then(function successfunction(response) {
					$scope.instrumentData = response.data;
					$scope.selectedInstrument = "1";
			}, function failfunction(response) {
			});
			
			
			$http({
				method : "GET",
				url : rootURL + '/get/data/raw',
				data : null,
				dataType : "json",
				headers : {
					'Content-Type' : 'application/x-www-form-urlencoded'
				}
			}).then(function successfunction(response) {
				$scope.rawDealData = response.data;
			}, function failfunction(response) {	
			});
			
			$http({
				method : "GET",
				url : rootURL + '/get/counterparty/raw',
				data : null,
				dataType : "json",
				headers : {
					'Content-Type' : 'application/x-www-form-urlencoded'
				}
			}).then(function successfunction(response) {
				$scope.rawCounterpartyData = response.data;
			}, function failfunction(response) {	
			});
			
		    $scope.$watch(function() {
		    	return $scope.selectedCounterparty;
		    }, function() {
		    	if($scope.selectedCounterparty) {
		    		angular.forEach($scope.counterparties , function(value){
		    			if (value.value == $scope.selectedCounterparty) {
		    				$scope.selectedCounterpartyName = value.name;
		    			}
		    		})
			    	$http({
						method : "GET",
						url : rootURL + '/get/counterparty/usr/'+$scope.selectedCounterparty,
						data : null,
						dataType : "json",
						headers : {
							'Content-Type' : 'application/x-www-form-urlencoded'
						}
					}).then(function successfunction(response) {
							$scope.counterpartyData = response.data;
							$scope.counterpartyRP = 0;
							$scope.counterpartyEP = 0;
							angular.forEach($scope.counterpartyData, function(value){
								$scope.counterpartyRP += value[4];
								$scope.counterpartyEP += value[5];
							});
					}, function failfunction(response) {	
					});
		    	}

		    }, true);
			
		    $scope.$watch(function() {
		    	return $scope.selectedInstrument;
		    }, function() {
		    	if($scope.selectedInstrument) {
			    	$http({
						method : "GET",
						url : rootURL + '/get/buy/usr/'+$scope.selectedInstrument,
						data : null,
						dataType : "json",
						headers : {
							'Content-Type' : 'application/x-www-form-urlencoded'
						}
					}).then(function successfunction(response) {
							$scope.buyPrices = response.data;
							
					}, function failfunction(response) {
					});
			    	$http({
						method : "GET",
						url : rootURL + '/get/sell/usr/'+$scope.selectedInstrument,
						data : null,
						dataType : "json",
						headers : {
							'Content-Type' : 'application/x-www-form-urlencoded'
						}
					}).then(function successfunction(response) {
							$scope.sellPrices = response.data;
							
					}, function failfunction(response) {
					});
			    	$http({
						method : "GET",
						url : rootURL + '/get/buy/usr/'+$scope.selectedInstrument+'/avg',
						data : null,
						dataType : "json",
						headers : {
							'Content-Type' : 'application/x-www-form-urlencoded'
						}
					}).then(function successfunction(response) {
							$scope.avgBuyPrice = response.data;
					}, function failfunction(response) {
											});
			    	$http({
						method : "GET",
						url : rootURL + '/get/sell/usr/'+$scope.selectedInstrument+'/avg',
						data : null,
						dataType : "json",
						headers : {
							'Content-Type' : 'application/x-www-form-urlencoded'
						}
					}).then(function successfunction(response) {
							$scope.avgSellPrice = response.data;
					}, function failfunction(response) {	
					});
			    	$http({
						method : "GET",
						url : rootURL + '/get/buy/usr/'+$scope.selectedInstrument+'/vol',
						data : null,
						dataType : "json",
						headers : {
							'Content-Type' : 'application/x-www-form-urlencoded'
						}
					}).then(function successfunction(response) {
							$scope.buyVol = response.data;
					}, function failfunction(response) {		
					});
			    	$http({
						method : "GET",
						url : rootURL + '/get/sell/usr/'+$scope.selectedInstrument+'/vol',
						data : null,
						dataType : "json",
						headers : {
							'Content-Type' : 'application/x-www-form-urlencoded'
						}
					}).then(function successfunction(response) {
							$scope.sellVol = response.data;
					}, function failfunction(response) {
					});
			    	$http({
						method : "GET",
						url : rootURL + '/get/mtb/usr/'+$scope.selectedInstrument,
						data : null,
						dataType : "json",
						headers : {
							'Content-Type' : 'application/x-www-form-urlencoded'
						}
					}).then(function successfunction(response) {
							$scope.mtb = response.data;
					}, function failfunction(response) {
					});
			    	$http({
						method : "GET",
						url : rootURL + '/get/priceinfo/usr/'+$scope.selectedInstrument,
						data : null,
						dataType : "json",
						headers : {
							'Content-Type' : 'application/x-www-form-urlencoded'
						}
					}).then(function successfunction(response) {
				    	
							$scope.priceinfo = response.data;
							if ($scope.priceinfo[1] >= 0){
								$scope.price = "positive";
								angular.element("#priceColor").style("color","green")
							} else {
								$scope.price = "negative";
								angular.element("#priceColor").style("color","red")
							}

					}, function failfunction(response) {
					});
		    	}

		    }, true);

		} ]);
