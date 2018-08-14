var rootURL = "rws/services";

var data = [
	  {
		    "age": "<5",
		    "population": 2704659
		  },
		  {
		    "age": "5-13",
		    "population": 4499890
		  },
		  {
		    "age": "14-17",
		    "population": 2159981
		  },
		  {
		    "age": "18-24",
		    "population": 3853788
		  },
		  {
		    "age": "25-44",
		    "population": 14106543
		  },
		  {
		    "age": "45-64",
		    "population": 8819342
		  },
		  {
		    "age": "≥65",
		    "population": 612463
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

    //visStockChart(data);
	//visBarChart(data);
	visPieChart(data);
});

function visPieChart(data) {
	var svg_width = 270;
	var svg_height = 270;
	var svg = d3.selectAll(".pie").append("svg").attr("width", svg_width).attr("height", svg_height);
    margin = {top: 0, right: 0, bottom: 0, left: 0},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom,
    g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")"),
    radius = Math.min(width, height) / 2;

var color = d3.scaleOrdinal(["#b71540", "#e55039", "#fa983a", "#E8E12D", "#b8e994", "#4CACA0", "#254C5F"]);

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

function visBarChart(data) {

	var svg_width = 700;
	var svg_height = 320;
	var svg = d3.select("body").append("svg").attr("width", svg_width).attr("height", svg_height);
    margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom,
    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
    y = d3.scaleLinear().rangeRound([height, 0]);

var g = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


data.forEach(function(el, idx, arr) {
	  arr[idx].frequency =+el.frequency
	});




  x.domain(data.map(function(d) { return d.letter; }));
  y.domain([0, d3.max(data, function(d) { return d.frequency; })]);

  g.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

  g.append("g")
      .attr("class", "axis axis--y")
      .call(d3.axisLeft(y).ticks(10, "%"))
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .attr("text-anchor", "end")
      .text("Frequency");

  g.selectAll(".bar")
    .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.letter); })
      .attr("y", function(d) { return y(d.frequency); })
      .attr("width", x.bandwidth())
      .attr("height", function(d) { return height - y(d.frequency); })
      .attr("fill", "steelblue")

    $(".bar").hover(function() {
        $(this).css("fill", "brown");
    }, function(){
    $(this).css("fill", "steelblue");
    })

}

function visStockChart(data) {

	var svg_width = 700;
	var svg_height = 320;
	var svg = d3.select(".stock-line").append("svg").attr("width", svg_width).attr("height", svg_height);
    margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom,
    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");


var parseTime = d3.timeParse("%d-%b-%y");

var x = d3.scaleTime()
    .rangeRound([0, width]);

var y = d3.scaleLinear()
    .rangeRound([height, 0]);

var line = d3.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.close); });


data.forEach(function(el, idx, arr) {
	  arr[idx].date = parseTime(el.date);
	  arr[idx].close =+el.close
	});

  x.domain(d3.extent(data, function(d) { return d.date; }));
  y.domain(d3.extent(data, function(d) { return d.close; }));

  g.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
    .select(".domain")
      .remove();

  g.append("g")
      .call(d3.axisLeft(y))
    .append("text")
      .attr("fill", "#000")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .attr("text-anchor", "end")
      .text("Price ($)");

  g.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("stroke-width", 1.5)
      .attr("d", line);

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

