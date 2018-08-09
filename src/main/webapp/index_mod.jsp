<%-- 
    Document   : index
    Created on : 17-Jun-2016, 16:53:18
    Author     : Selvyn
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html ng-app="dbAnalyzer">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <link rel="stylesheet"
              href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
              integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u"
              crossorigin="anonymous">
        <link rel="stylesheet" type="text/css" href="dbanalyzer/css/main.css" />
        <script
            src="https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js">
        </script>
        <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.7.2/angular.js">
        </script>
        <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.7.2/angular-route.js">
        </script>
        <script
            src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"
            integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa"
            crossorigin="anonymous">
        </script>
        <script src="dbanalyzer/js/main.js"></script>
        <title>Deutsche Bank Case Study</title>
    </head>
    
    <body ng-controller="dbAnalyzerCtrl">
        	<div class="alert" id="alert" role="alert" style="display:none;">
        
    		
    	</div>
    	
    	<div id="status-bar" style="background-color: lightgrey; padding: 5px;" ng-if="username">
    	<span style="float: left;" id="statusDatabase" class="circle">
    	
    	</span>
    	<span style="margin-left: 50%;">
    	DB TRADE
    	</span>
    	<div id="user-dropdown" class="dropdown">
    	    	<span class="dropbtn" ng-bind="username">
    	</span>
    	<div class="dropdown-content">

    			<ul>
    			    		<li><a href="#!banana">Operation 1</a></li>
    			    		<li><a href="#!banana">Operation 2</a></li>
    			</ul>
    	</div>
    	</div>

    	</div>
        <h2></h2>
            	<main class="container">
    		<div class="starter-template">
    		
    			<div ng-view></div>
    		</div>
    	</main>
    </body>
</html>
