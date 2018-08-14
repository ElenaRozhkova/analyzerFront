<%-- 
    Document   : index
    Created on : 17-Jun-2016, 16:53:18
    Author     : Selvyn
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<jsp:useBean id="globalHelper" class="deutschebank.core.ApplicationScopeHelper" scope="application"/>

<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <link rel="stylesheet"
              href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
              integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u"
              crossorigin="anonymous">
        <link rel="stylesheet" type="text/css" href="dbanalyzer/css/main.css" />
            <link rel="stylesheet" href="dbanalyzer/css/nav.css" />
    <link rel="stylesheet" href="dbanalyzer/css/login.css" />
        <script
            src="https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js">
        </script>
        <script
            src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"
            integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa"
            crossorigin="anonymous">
        </script>
        <script src="https://d3js.org/d3.v5.min.js"></script>
        <script src="dbanalyzer/js/main.js"></script>
        <title>Deutsche Bank Case Study</title>
    </head>
    
    <body>
			<nav class="navbar navbar-default>">
      <div class="navbar-header">
        <a href="#" class="navbar-brand">Investment Services</a>
      </div>
    </nav>
        <%

            globalHelper.setInfo("Set any value here for application level access");
            boolean connectionStatus = globalHelper.bootstrapDBConnection();
        %>
        <%
            if( connectionStatus )
            {
        %>

    <div class="alert alert-success" role="alert">
      <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
      <strong>Success!</strong> Database connection was successful.
    </div>

    <%
} else {
    %>
    <div class="alert alert-danger" role="alert">
        <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <strong>Error!</strong> Database connection was not successful.
      </div>

    <%
}
%>


    <div class="container">
      <div class="col-md-6">
        <div class="img-padding">
          <div class="login-img"></div>
        </div>
      </div>
      <div class="col-md-6 text-center">
        <div class="g">
          <h3 class="head">Login</h3>
          <p class="para">Login with your user credentials to access your Investment Services dashboard</p>
          <form action="" class="login" id="loginForm">
            <div class="input-group">
              <span class="input-group-addon"><i class="fa fa-user" aria-hidden="true"></i></span>
              <input type="text" class="form-control" id="f_userid" name="usr" placeholder="Username">
            </div>
            <div class="input-group">
              <span class="input-group-addon"><i class="fa fa-key" aria-hidden="true"></i></span>
              <input type="text" class="form-control" id="f_pwd" name="pwd" placeholder="Password">
            </div>
            <button type = "submit" class="btn btn-info"><a class="login-btn" href="index.html">Login</a></button>
            <p>Don't have an Account? <a href="#">Sign up here</a> </p>
          </form>
        </div>
      </div>
        <p>
            <div id="userIdMessage"></div>
        </p>
    </body>
</html>