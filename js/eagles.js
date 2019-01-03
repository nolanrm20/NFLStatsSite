// This is an example of how we'd use AJAX to update the page
// the drop down will call this function and update the div

var position;
function updateStats(){

	// this assigns "position" to an array with all options in "select1"
	position = document.getElementById("select1");
	// this well set "position" to the text of the selected item in your drop down list
	position = select1.options[select1.selectedIndex].innerHTML;
	// then we'll call another function to make a call to an API using that position
	sendRequest();

}

// here we send a request to the stats API
function sendRequest(){

	const request = new XMLHttpRequest();
	request.onreadystatechange = function() {handleResponse(request, position);};
	// call to api
	request.open("GET", "https://api.mysportsfeeds.com/v2.0/pull/nfl/2018-regular/team_stats_totals.json?team=phi", true);
	// authorization code (64 bit encoded)
	request.setRequestHeader("Authorization","Basic MDE1YWViOGMtMDJkYS00MDQ1LTljYzMtMjM4YjJmOk1ZU1BPUlRTRkVFRFM=");
  	request.send();
}


// here we handle the response
function handleResponse(request){
	// http requests status codes
	// 0 = unsent, 1 = opened, 2 = headers recieved, 3 = loading, 4 = done
	if(request.readyState == 4) {
		if(request.status == 200){
			// create an object that has the response stored in it (from JSON data)
			var teamStats = JSON.parse(request.responseText);
			parseStats(teamStats);	
		}
		else{
			console.log("ERROR: " + request.statusText);
		}
	}
}

// here we parse through the json data we recieved, and store the stats we want to use
function parseStats(JSONStats){
	// saving teamName and teamCity from JSON
	var stats = JSONStats.teamStatsTotals[0].stats;
	var teamName = JSONStats.teamStatsTotals[0].team.name;
	var teamCity = JSONStats.teamStatsTotals[0].team.city;
	var gamesPlayed = JSONStats.teamStatsTotals[0].stats.gamesPlayed;
	
	console.log(teamCity + " " + teamName);

	// adding elements recieved to the table
	if(position == "QB"){

		// pass stats
		var passGrossYards = stats.passing.passGrossYards;
		var passAttempts = stats.passing.passAttempts;
		var passCompletions = stats.passing.passCompletions;
		var passTDs = stats.passing.passTD;
		var passPct = stats.passing.passPct;
		var passYardsPerAtt = stats.passing.passYardsPerAtt;
		var passInt = stats.passing.passInt;
		var passSacks = stats.passing.passSacks;


		document.getElementById("stats").innerHTML = "<br><table><tr><th>Stat Description</th><th><strong>2017</strong></th><th><strong>2018</strong></th><th>Charts</th>" 
												+ "</tr><tr><td>Passing Yards" + "</td><td>"
												+ "</td><td>" + passGrossYards + "</td><td>Chart Here" 
												+ "</tr><tr><td>Passing Attempts" + "</td><td>"
												+ "</td><td>" + passAttempts + "</td><td>Chart Here"
												+ "</tr><tr><td>Passing Completions" + "</td><td>"
												+ "</td><td>" + passCompletions + "</td><td>Chart Here" 
												+ "</tr><tr><td>Passing TDs" + "</td><td>"
												+ "</td><td>" + passTDs + "</td><td>Chart Here"
												+ "</tr><tr><td>Pass Percentage" + "</td><td>" 
												+ "</td><td>" + passPct + "</td><td>Chart Here" 
												+ "</tr><tr><td>Pass Yards Per Attempt" + "</td><td>" 
												+ "</td><td>" + passYardsPerAtt + "</td><td>Chart Here"
												+ "</tr><tr><td>Interceptions" + "</td><td>" 
												+ "</td><td>" + passInt + "</td><td>Chart Here" 
												+ "</tr><tr><td>Quarterback Sacked" + "</td><td>" 
												+ "</td><td>" + passSacks + "</td><td>Chart Here" + "</td></table>"
	}
	else if(position == "RB"){

		// rush stats
		var rushAttempts = stats.rushing.rushAttempts;
		var rushYards = stats.rushing.rushYards;
		var rushTDs = stats.rushing.rushTD;
		var rushAverage = stats.rushing.rushAverage;
		var rush1stDowns = stats.rushing.rush1stDowns;
		var rushFumbles = stats.rushing.rushFumbles;

		document.getElementById("stats").innerHTML = "<br><table><tr><th>Stat Description</th><th><strong>2017</strong></th><th><strong>2018</strong></th><th>Charts</th>" 
												+ "</tr><tr><td>Rushing Attempts" + "</td><td>" 
												+ "</td><td>" + rushAttempts + "</td><td>Chart Here" 
												+ "</tr><tr><td>Rushing Yards" + "</td><td>" 
												+ "</td><td>" + rushYards + "</td><td>Chart Here" 
												+ "</tr><tr><td>Average Yards Per Attempt" + "</td><td>" 
												+ "</td><td>" + rushAverage + "</td><td>Chart Here"
												+ "</tr><tr><td>Rushing TDs" + "</td><td>"
												+ "</td><td>" + rushTDs + "</td><td>Chart Here"
												+ "</tr><tr><td>Rushing 1st Downs" + "</td><td>" 
												+ "</td><td>" + rush1stDowns + "</td><td>Chart Here" 
												+ "</tr><tr><td>Rushing Fumbles" + "</td><td>" 
												+ "</td><td>" + rushFumbles + "</td><td>Chart Here" + "</td></table>"
	}
	else{

		// receiving stats
		var receptions = stats.receiving.receptions;
		var recYards = stats.receiving.recYards;
		var recTDs = stats.receiving.recTD;
		var recAverage = stats.receiving.recAverage;
		var rec1stDowns = stats.receiving.rec1stDowns;
		var recFumbles = stats.receiving.recFumbles;

		document.getElementById("stats").innerHTML = "<br><table><tr><th>Stat Description</th><th><strong>2017</strong></th><th><strong>2018</strong></th><th>Charts</th>" 
												+ "</tr><tr><td>Receptions" + "</td><td>" 
												+ "</td><td>" + receptions + "</td><td>Chart Here" 
												+ "</tr><tr><td>Reception Yards" + "</td><td>" 
												+ "</td><td>" + recYards + "</td><td>Chart Here" 
												+ "</tr><tr><td>Average Yards Per Reception" + "</td><td>" 
												+ "</td><td>" + recAverage + "</td><td>Chart Here" 
												+ "</tr><tr><td>Reception TDs" + "</td><td>" 
												+ "</td><td>" + recTDs + "</td><td>Chart Here" 
												+ "</tr><tr><td>Reception 1st Downs" + "</td><td>" 
												+ "</td><td>" + rec1stDowns + "</td><td>Chart Here" 
												+ "</tr><tr><td>Reception Fumbles" + "</td><td>" 
												+ "</td><td>" + recFumbles + "</td><td>Chart Here" + "</td></table>"
	
	}
}

function clearStats(){
	document.getElementById("stats").innerHTML = "<p>Select a position above to see the 2017 to 2018 comparison.</p>";
}
