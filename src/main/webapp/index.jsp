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
        <script
            src="https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js">
        </script>
        <script
            src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"
            integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa"
            crossorigin="anonymous">
        </script>
        <script src="dbanalyzer/js/main.js"></script>
        <title>Deutsche Bank Case Study</title>
    </head>
    
    <body>
        <%
            String  dbStatus = "DB NOT CONNECTED";

            globalHelper.setInfo("Set any value here for application level access");
            boolean connectionStatus = globalHelper.bootstrapDBConnection();
            
            if( connectionStatus )
            {
                dbStatus = "Selvyn, you have successfully connected the Deutsche Bank server";
            }
        %>
        <h2><%= dbStatus %></h2>
        <%
            if( connectionStatus )
            {
        %>
        <h3>User verification is required</h3>
        <form action = "" id="loginForm">
            <p>User ID: <input type="text" id="f_userid" name="usr"></p>
            <p>Password: <input type="text" id="f_pwd" name="pwd"></p>
            <button type="button" onclick="validateUserId()">Verify</button>
            <input type = "submit" value = "Submit" />
        </form>
        <p>
            <div id="userIdMessage"></div>
        </p>
        <%
            }
        %>
    </body>
</html>
