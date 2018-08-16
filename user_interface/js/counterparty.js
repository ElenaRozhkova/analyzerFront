var rootURL = "rws/services";

var dataBuys = [
	  {
		    "age": "Astronomica",
		    "population": 2889
		  },
		  {
		    "age": "Deuternoic",
		    "population": 3933
		  },
		  {
		    "age": "Floral",
		    "population": 3389
		  },
		  {
		    "age": "Galactia",
		    "population": 5161
		  },
		  {
		    "age": "Celestial",
		    "population": 4003
		  },
		  {
		    "age": "Heliosphere",
		    "population": 1871
		  },
		  {
		    "age": "Jupiter",
		    "population": 3204
		  },
		  {
          	"age": "Interstella",
          	"population": 1560
          },
          {
          	"age": "Koronis",
          	"population": 1913
          },
          {
          	"age": "Eclipse",
          	"population": 3456
          },
          {
          	"age": "Borealis",
          	"population": 2502
          },
          {
          	"age": "Lunatic",
          	"population": 1880
          }

		]

var dataSells = [
	  {
		    "age": "Astronomica",
		    "population": 2895
		  },
		  {
		    "age": "Deuternoic",
		    "population": 3932
		  },
		  {
		    "age": "Floral",
		    "population": 3808
		  },
		  {
		    "age": "Galactia",
		    "population": 3648
		  },
		  {
		    "age": "Celestial",
		    "population": 2986
		  },
		  {
		    "age": "Heliosphere",
		    "population": 2540
		  },
		  {
		    "age": "Jupiter",
		    "population": 3596
		  },
		  {
          	"age": "Interstella",
          	"population": 1005
          },
          {
          	"age": "Koronis",
          	"population": 2605
          },
          {
          	"age": "Eclipse",
          	"population": 739
          },
          {
          	"age": "Borealis",
          	"population": 3595
          },
          {
          	"age": "Lunatic",
          	"population": 4467
          }

		]

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

	visPieChart1(dataBuys);
	visPieChart2(dataSells);
});

function visPieChart1(data = data) {
	var svg_width = 350;
	var svg_height = 350;
	var svg = d3.select(".pie1").append("svg").attr("width", svg_width).attr("height", svg_height);
    margin = {top: 0, right: 0, bottom: 0, left: 0},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom,
    g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")"),
    radius = Math.min(width, height) / 2;

var color = d3.scaleOrdinal(["#EAF2F8",
                             "#D4E6F1",
                             "#A9CCE3",
                             "#7FB3D5"]);

var pie = d3.pie()
    .sort(null)
    .value(function(d) { return d.population; });

var path = d3.arc()
    .outerRadius(radius - 10)
    .innerRadius(0);

var label = d3.arc()
    .outerRadius(radius - 40)
    .innerRadius(radius - 40);

data.forEach(function(el, idx, arr) {
	  arr[idx].population =+el.population
	});

  var arc = g.selectAll(".arc")
    .data(pie(data))
    .enter().append("g")
      .attr("class", "arc");

  arc.append("path")
      .attr("d", path)
      .attr("fill", function(d) { return color(d.data.age); })
      .style("stroke","#fff");

  arc.append("text")
      .attr("transform", function(d) { return "translate(" + label.centroid(d) + ")"; })
      .attr("dy", "0.35em")
      .text(function(d) { return d.data.age; })
      .style("text-anchor","middle")
      .style("font","10px sans-serif");
}

function visPieChart2(data) {
	var svg_width = 350;
	var svg_height = 350;
	var svg = d3.select(".pie2").append("svg").attr("width", svg_width).attr("height", svg_height);
    margin = {top: 0, right: 0, bottom: 0, left: 0},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom,
    g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")"),
    radius = Math.min(width, height) / 2;

var color = d3.scaleOrdinal(["#ffc47b",
                             "#ffce91",
                             "#ffd7a7",
                             "#ffe1bd"
]);


var pie = d3.pie()
    .sort(null)
    .value(function(d) { return d.population; });

var path = d3.arc()
    .outerRadius(radius - 10)
    .innerRadius(0);

var label = d3.arc()
    .outerRadius(radius - 40)
    .innerRadius(radius - 40);

data.forEach(function(el, idx, arr) {
	  arr[idx].population =+el.population
	});

  var arc = g.selectAll(".arc")
    .data(pie(data))
    .enter().append("g")
      .attr("class", "arc");

  arc.append("path")
      .attr("d", path)
      .attr("fill", function(d) { return color(d.data.age); })
      .style("stroke","#fff");

  arc.append("text")
      .attr("transform", function(d) { return "translate(" + label.centroid(d) + ")"; })
      .attr("dy", "0.35em")
      .text(function(d) { return d.data.age; })
      .style("text-anchor","middle")
      .style("font","10px sans-serif");
}

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

