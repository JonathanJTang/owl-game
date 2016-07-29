$(document).ready(function(){

	var scoreobj = JSON.parse(localStorage.getItem('scores'));
		  
	//display scores
	$('#scores').append("<h1>Scores</h1>");
	
	var array=[];
	for(a in scoreobj){
	 array.push([a,scoreobj[a]])
	}
	array.sort(function(a,b){return a[1] - b[1]});
	array.reverse();
	
	for(var key in array){
	    var str = "" + array[key];
		$('#scores').append("<h3> Name: "+str.split(",")[0] + " , Score:" + str.split(",")[1] +"</h3>");	
	}
	
	$("#clear").click(function(){
		localStorage.clear();	
	});
});
