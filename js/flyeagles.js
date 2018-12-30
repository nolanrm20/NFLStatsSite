// This is an example of how we'd use AJAX to update the page
// the drop down will call this function and update the div

var position;
function updateStats(){

	// this well set "position" to the text of the selected item in your drop down list
	position = select1.options[select1.selectedIndex].innerHTML;
	// then we'll call another function to make a call to an API using that position
	sendRequest();

}

// here we send a request to the stats API
function sendRequest(){

	const request = new XMLHttpRequest();
	request.onreadystatechange = function() {handleResponse(request);};
	// call to api
	request.open("GET", "https://api.mysportsfeeds.com/v2.0/pull/nfl/2018-regular/team_stats_totals.json?team=phi");
	// authorization code (64 bit encoded)
	// this is just a password for the API we're using
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
function parseStats(stats){
	// saving stats from JSON received from API
	var st = stats.teamStatsTotals[0];
	var teamName = st.team.name;
	var teamCity = st.team.city;
	var gamesPlayed = st.stats.gamesPlayed;
	// pass stats
	var passAttempts = st.stats.passing.passAttempts;
	var passCompletions = st.stats.passing.passCompletions;
	var passTDs = st.stats.passing.passTD;
	// rush stats
	var rushAttempts = st.stats.rushing.rushAttempts;
	var rushYards = st.stats.rushing.rushYards;
	var rushTDs = st.stats.rushing.rushTD;
	// receiving stats
	var receptions = st.stats.receiving.receptions;
	var recYards = st.stats.receiving.recYards;
	var recTDs = st.stats.receiving.recTD;

	console.log(teamCity + " " + teamName);

	// adding elements recieved to the table
	if(position == "QB"){
		document.getElementById("stats").innerHTML = "<br><table><tr><th>City</th><th>Team Name</th><th>Games</th><th>Pass Attempts</th>" 
												+ "<th>Completions</th><th>Passing TDs</th></tr><tr><td>" + teamCity + "</td><td>" + teamName 
												+ "</td><td>" + gamesPlayed + "</td><td>" + passAttempts + "</td><td>" + passCompletions + "</td><td>" + passTDs
												+ "</td></tr></table>"
	}
	else if(position == "RB"){
		document.getElementById("stats").innerHTML = "<br><table><tr><th>City</th><th>Team Name</th><th>Games</th><th>Rush Attempts</th>" 
												+ "<th>Rush Yards</th><th>Rushing TDs</th></tr><tr><td>" + teamCity + "</td><td>" + teamName 
												+ "</td><td>" + gamesPlayed + "</td><td>" + rushAttempts + "</td><td>" + rushYards + "</td><td>" + rushTDs
												+ "</td></tr></table>"
	}
	else{
		document.getElementById("stats").innerHTML = "<br><table><tr><th>City</th><th>Team Name</th><th>Games</th><th>Receptions</th>" 
												+ "<th>Rec Yards</th><th>Rec TDs</th></tr><tr><td>" + teamCity + "</td><td>" + teamName 
												+ "</td><td>" + gamesPlayed + "</td><td>" + receptions + "</td><td>" + recYards + "</td><td>" + recTDs
												+ "</td></tr></table>"
	}
	
	
}
