var express=require("express");
var app=express();
const request = require('request');

 app.use(express.static("public"));


app.get("/world",function(req, res){
	var c=0,a=0,r=0,d=0;
	request('https://corona.lmao.ninja/countries', function(error, response,body){	
		
  		if(!error && response.statusCode == 200){
			var parse= JSON.parse(body);
			for(var i=0;i<parse.length;i++){
				c+=parse[i].cases;
				a+=parse[i].active;
				r+=parse[i].recovered;
				d+=parse[i].deaths

			}
		res.render("world.ejs",{arr: parse,c:c,a:a,r:r,d:d});
	}
});	
});



app.get("/india",function(req, res){
	
 	request('https://api.covid19india.org/data.json', function(error, response,body){
		if(!error && response.statusCode == 200){
			var parse= JSON.parse(body); 
			var x1=[]; var x2=[]; var x3=[];
			var y1=[]; var y2=[]; var y3=[];
			var i=0;
			request('https://api.covid19india.org/data.json', function(error, response,body){

				if(!error && response.statusCode == 200){
					var parseData= JSON.parse(body);
					parseData.cases_time_series.forEach(function(info){
						x1[i]=info.date.substring(0,6);
						x2[i]=info.date.substring(0,6);
						x3[i]=info.date.substring(0,6);
						y1[i]=info.totalconfirmed;
						y2[i]=info.totalrecovered;
						y3[i]=info.totaldeceased;
						i++;
					});
				}
				res.render("india.ejs",{arr: parse.statewise,x1: x1, y1: y1, x2: x2, x3: x3, y2: y2, y3: y3});
			});
			// res.render("india.ejs",{arr: parse.statewise});
		}		
	});
});



app.get("/",function(req, res){
	var c=0,a=0,r=0,d=0;  var ic,ia,ir,id;
	request('https://corona.lmao.ninja/countries', function(error, response,body){	
		
  		if(!error && response.statusCode == 200){
			var parse= JSON.parse(body);
			for(var i=0;i<parse.length;i++){
				c+=parse[i].cases;
				a+=parse[i].active;
				r+=parse[i].recovered;
				d+=parse[i].deaths
				
				if(parse[i].country == "India")
					{
						ic=parse[i].cases;
						ia=parse[i].active;
						ir=parse[i].recovered;
						id=parse[i].deaths;		
					}

			}
		res.render("home.ejs",{arr: parse,c:c,a:a,r:r,d:d,ic:ic,ia:ia,ir:ir,id:id});
	}
});	
});






app.listen(3000, function() { 
  console.log('Server listening on port 3000'); 
});