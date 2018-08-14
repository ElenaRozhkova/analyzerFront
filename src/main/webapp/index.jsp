<%-- 
    Document   : index
    Created on : 17-Jun-2016, 16:53:18
    Author     : Selvyn
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<jsp:useBean id="globalHelper"
	class="deutschebank.core.ApplicationScopeHelper" scope="application" />

<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="stylesheet" type="text/css" href="dbanalyzer/css/main.css" />
<link rel="stylesheet"
	href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"
	integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO"
	crossorigin="anonymous">
<link rel="stylesheet"
	href="https://use.fontawesome.com/releases/v5.2.0/css/all.css"
	integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ"
	crossorigin="anonymous">
<link rel="stylesheet" href="dbanalyzer/css/login.css" />
<script
	src="https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js">
	
</script>
<script
	src="https://ajax.googleapis.com/ajax/libs/angularjs/1.7.2/angular.js">
	
</script>
<script
	src="http://ajax.googleapis.com/ajax/libs/angularjs/1.7.2/angular-cookies.js">
	
</script>
<script
	src="http://ajax.googleapis.com/ajax/libs/angularjs/1.7.2/angular-route.js">
	
</script>

<script
	src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js"
	integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy"
	crossorigin="anonymous"></script>

</script>
<script src="https://d3js.org/d3.v5.min.js"></script>
<script src="dbanalyzer/js/datavis.js"></script>
<script src="dbanalyzer/js/main.js"></script>
<title>Deutsche Bank Case Study</title>
</head>

<body ng-app="analyzerApp" ng-controller="analyzerCtrl">
	<nav class="navbar navbar-expand-md">
		<div class="container">
			<a href="#!index"
				class="navbar-brand nav-text d-flex w-50 mr-auto">Investment
				Services</a>
			<div class="navbar-collapse collapse w-100" id="collapsingNavbar3">
				<ul class="nav navbar-nav ml-auto w-100 justify-content-end">
					<li class="nav-item dropdown"><a ng-show="username"
						class="nav-link dropdown-toggle nav-text" href="#"
						id="navbarDropdownMenuLink" data-toggle="dropdown"
						aria-haspopup="true" aria-expanded="false"> <span
							class="input-group-addon"><i class="fa fa-user"
								aria-hidden="true"></i></span> {{username}}
					</a>
						<div class="dropdown-menu"
							aria-labelledby="navbarDropdownMenuLink">
							<a href="#!portfolio" class="dropdown-item"> <span
								class="input-group-addon"><i class="fa fa-chart-line"
									aria-hidden="true"></i></span> Your portfolio
							</a> <a href="#!settings" class="dropdown-item"> <span
								class="input-group-addon"><i class="fa fa-cog"
									aria-hidden="true"></i></span> Settings
							</a> <a ng-click="signOut()" class="dropdown-item"> <span
								class="input-group-addon"><i class="fa fa-sign-out-alt"
									aria-hidden="true"></i></span> Sign out
							</a>
						</div></li>
				</ul>
			</div>
		</div>
	</nav>
	<%
		globalHelper.setInfo("Set any value here for application level access");
		boolean connectionStatus = globalHelper.bootstrapDBConnection();
	%>
	<%
		if (connectionStatus) {
	%>

	<div class="alert alert-success" role="alert">
		<button type="button" class="close" data-dismiss="alert"
			aria-label="Close">
			<span aria-hidden="true">&times;</span>
		</button>
		<strong>Success!</strong> Database connection was successful.
	</div>
	<%
		} else {
	%>
	<div class="alert alert-danger" role="alert">
		<button type="button" class="close" data-dismiss="alert"
			aria-label="Close">
			<span aria-hidden="true">&times;</span>
		</button>
		<strong>Error!</strong> Database connection was not successful.
	</div>
	<%
		}
	%>

	<div class="container">

		<div ng-view></div>
	</div>
</body>
</html>
