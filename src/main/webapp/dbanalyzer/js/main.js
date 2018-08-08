var rootURL = "rws/services";

getAllLinksAndTags();

function getAllLinksAndTags(){
	getAllTags();
	getAllLinks();
}

/**
 * Comment
 */
function validateUserId() 
{
    loginFromForm();
}

$(document).ready(function() {
	$( "#loginForm" ).submit(function( event ) {
		loginFromForm()
		event.preventDefault();
	});
});

function getAllTags() {
	console.log('getAllTags');
	$.ajax({
		method: 'GET',
		url: rootURL+'/getAllTags',
		dataType: "json", // data type of response
		success : function(data) {
			$("#tag-list").empty();
			if(data == "fail") {
				alert('error');
			}
			else {
				$.each(data, function (i) {
					$("#tag-list").append( "<a href='#' onclick='getLinkForTag(event)'>" + data[i] + "\t</a>");
				})
			}
		}
	});
}

function getAllLinks() {
	console.log("getAllLinks");
	$.ajax(
            {
		method: "GET",
		url: rootURL+"/getAllURL",
		dataType: "json", // data type of response
		success : function(data) 
                {
                    displayBookmarks(data);
		}
            }
        );
}

function getLinkForTag(e){
	var target = e.target || e.srcElement;
	var tag = target.innerHTML;
	$.ajax({
		method: 'GET',
		url: rootURL+'/get/' + tag,
		dataType: "json", // data type of response
		success : function(data) {
			displayBookmarks(data);
		}
	});
}

function displayBookmarks(data){
	if(data == "fail") {
		alert('error');
	}
	else {
		$("#bookmark-list").empty();
		$.each(data, function (i) {
			$("#bookmark-list").append( "<br><a class='text-info h5' href='"+ data[i].url + "'>" + data[i].url + "</a>");
			$("#bookmark-list").append( "<br><h5>" + data[i].description + "</h5>" );
			$.each(data[i].tags, function (j) {
				$("#bookmark-list").append( "<small class='text-muted'>" + data[i].tags[j] + "\t</small>" );
			})
			$("#bookmark-list").append( "<div class='bookmark-widget'></div>" );
		})
	}
}

function saveNewURLWithInfoFromForm() {
	$.ajax({
		method: 'POST',
		url: rootURL + '/save',
		dataType: "json", // data type of response
		data: $('form').serialize(),
		success: function () {
			$( "#bookmark-success" ).append("<p class='text-success'>Bookmark saved successfully</p>");
			$( 'form' ).trigger("reset");  // reset the form
		}
	});
}

function loginFromForm() {
    formdata = $('form');
    fds = formdata.serialize();
    var request = $.ajax({
		method: 'POST',
		url: rootURL + '/login',
		dataType: "json", // data type of response
		data: fds,
                
		success: function ( result) {
                    setMessageUsingDOM(result );
                    //$( "#userIdMessage" ).append("<p class='text-success'>You have successfully logged onto the server</p>");
                    $( 'form' ).trigger("reset");  // reset the form
		}
	});
    request.fail(function( jqXHR, textStatus, errorThrown )
    {
        alert( "Request " + textStatus + ", invalid login details: " + fds );
    });
}

// This function is then used to update the DOM in the web page
function setMessageUsingDOM(user) 
{
    var userMessageElement = document.getElementById("userIdMessage");
    var color;
    var target = $("#userIdMessage");
   
    if( target !== null )
    {
        target.html("<p>DEBUG JSON Representation from the server: " + JSON.stringify(user) + "</p>");
        userMessageElement.style.color = "red";
        var items = [];

        var existingElement = $("#" + user.userID );

        if( existingElement.length > 0 )
            $("#" + user.userID ).remove();

        items.push( "<li id='" + user.userID + "'>" + user.userID + "->" + user.userPwd + "</li>" );

        var userList = $( "<ul/>", {
            "class": "dbgrads",
            html: items.join( "" )
        });
        userList.appendTo( "body" );

        target.html("<p>JSON Representation from the server: " + JSON.stringify(user) + "</p>");
        color = "green";

        userMessageElement.style.color = color;
    }
    else
        target.html("<div>ERROR IN PAGE</div>");
}

function apiCall(func, data) {
	// Dummy
	return {
		statusCode: 1,
		payload: {
			success: true
		}
	}
}

var analyzerApp = angular.module('dbAnalyzer', ["ngRoute"]);

analyzerApp.controller('dbAnalyzerCtrl', function dbAnalyzerAppCtrl($scope) {
	$scope.username;
	
	$scope.doLogin = function() {
		angular.element("#alert").removeClass("alert-success alert-info alert-warning alert-danger").hide();
		var dataObj = {
			username : $scope.loginUsername,
			password : $scope.loginPassword
		};
		var result = apiCall("doLogin", dataObj)
		if (result.statusCode === 1 && result.payload.success) {
			window.location.href='#!user';
			$scope.username = $scope.loginUsername;
		} else {
			angular.element("#alert").html("<strong>Invalid Login</strong>").addClass("alert-danger").slideDown();
		}
	}
	
	
	
	
});

analyzerApp.config(function ($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "login.htm"
    })
    .when("/user", {
        templateUrl : "start.htm"
    })

});