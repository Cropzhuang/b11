$(function() {
	set_head();
});

function set_head() {
	
	query("ThirdPageMenu1P1M1", function(xml) {
		var data = $(xml).find("string").text();
		data=data.replace(/;/g,",");
		var a = data.split(",");
		for ( var i = 0; i < (a.length-1); i++) {
			var content="";
			switch(i){
			case 0:
				content=Math.round(getValue(a[i])*10)/10;
				break;
			case 1:
				content=Math.round(getValue(a[i])*10)/10;
				break;
			case 2:
				content=floor(getValue(a[i]))+"%";
				break;
			default:break;
			}
			$("#e11_"+i).text(content);
		}
    });
	query("ThirdPageMenu1P1M2", function(xml) {
		var data = $(xml).find("string").text();
		data=data.replace(/;/g,",");
		var a = data.split(",");
		var content="";
		for ( var i = 0; i < (a.length-1); i++) {
			content+=floor(getValue(a[i]))+"kWh<br/>";
		}
		$(".e2_content").html(content);
    });
		
}
function set_e4() {
	
	var eair=new Array(),
	eplugin=new Array(),
	elight=new Array(),
	x_ticks=new Array();
	
	query("SecondPageP4", function(xml) {
		var data = $(xml).find("string").text();
		data=data.replace(/;/g,",");
		var a = data.split(",");
		for ( var i = 0; i < (a.length-1); i++) {
			var num=parseInt((i%((a.length-1)/3))/2);
			if(i < (a.length-1)/3)
			x_ticks.push(num);
			switch(i%2){
			case 0:
				continue;
			case 1:
				if(i < (a.length-1)/3)
					eair.push([num,floor(getValue(a[i]))]);
				else if(i >=(a.length-1)/3&&i < (a.length-1)*2/3)
					eplugin.push([num,getValue(a[i])]);
				else if(i >=(a.length-1)*2/3&&i < (a.length-1))
					elight.push([num,getValue(a[i])]);
				break;
			default:
				break;
			}
		}
		var lines_e4=[];
		var e4_stroke=["#96cee3","#c98173","#97c636"];
		for (var i=0;i<3;i++){
		lines_e4[i]={ color:e4_stroke[i],show: true ,fill:true, fillColor:e4_stroke[i],lineWidth:2};
		}
	var options = {
		colors:["#79a5b6","#9b756f","#8a9d39"],
        series: { shadowSize: 0 }, // drawing is faster without shadows
        xaxis: { min: 0, max: 24 ,ticks: x_ticks },
        grid:{
        borderColor:"#dadfe1", 
        }
    };
		$.plot(".e4_left", [
		{
		data : eair,
		lines:lines_e4[0]
		},{
		data : eplugin,
		lines:lines_e4[1]
		}, 
		{
		data : elight,
		lines:lines_e4[2]
		}
		],options);
	});
}

function set_e5(dayCount) {
	var start=dateBefore(dayCount*24*3600*1000);
	var end=new Date();
	var startString=setDateString(start);
	var endString=setDateString(end);
	var e1=new Array(),
	e2=new Array(),
	e3=new Array(),
	e4=new Array(),
	
	x_ticks=new Array();
	
	queryDate("SecondPageP5",startString,endString, function(xml) {
		var data = $(xml).find("string").text();
		data=data.replace(/;/g,",");
		var a = data.split(",");
		for ( var i = 0; i < (a.length-1); i++) {
			var num=parseInt(i/5);
			
			switch(i%5){
			case 0:
				continue;
			case 1:
				e1.push([num,floor(getValue(a[i]))]);
				break;
			case 2:
				e2.push([num,floor(getValue(a[i]))]);
				break;
			case 3:
				e3.push([num,floor(getValue(a[i]))]);
				break;
			case 4:
				e4.push([num,floor(getValue(a[i]))]);
				break;
			default:
				break;
			}
		}
	var options = {
			colors:["#c15d5f","#58df15","#4badec","#ffffff"],
        series: { shadowSize: 0 }, // drawing is faster without shadows
        xaxis: {show:false },
        grid:{
        borderColor:"#dadfe1",
        }
    };
		$.plot("#e5_body", [
		{
		data : e1,
		bars : {
			show : true,
			fill : true,
			color:"#c15d5f",
		}
		},{
		data : e2,
		bars : {
			show : true,
			fill : true,
			color:"#58df15",
		}
		}, 
		{
		data : e3,
		bars : {
			show : true,
			fill : true,
			color:"#4badec",
		}
		},
		{
		data : e4,
		lines:{
			show: true ,color:"#ffffff",lineWidth:2
		}
		}
		],options);
	});
}
function set_e6(dayCount) {
	var start=dateBefore(dayCount*24*3600*1000);
	var end=new Date();
	var startString=setDateString(start);
	var endString=setDateString(end);
	var e1=new Array(),
	e2=new Array(),
	e3=new Array(),
	x_ticks=new Array();
	
	queryDate("SecondPageP6",startString,endString, function(xml) {
		var data = $(xml).find("string").text();
		data=data.replace(/;/g,",");
		var a = data.split(",");
		for ( var i = 0; i < (a.length-1); i++) {
			var num=parseInt(i/4);
			switch(i%4){
			case 0:
				continue;
			case 1:
				e1.push([num,floor(getValue(a[i]))]);
				break;
			case 2:
				e2.push([num,floor(getValue(a[i]))]);
				break;
			case 3:
				e3.push([num,floor(getValue(a[i]))]);
				break;
			default:
				break;
			}
		}
	var options = {
			colors:["#c15d5f","#e4b04b","#169fff"],
        series: { shadowSize: 0 }, // drawing is faster without shadows
        xaxis: {show:false },
        grid:{
        borderColor:"#dadfe1",
        }
    };
		$.plot("#e6_body", [
		{
		data : e1,
		bars : {
			show : true,
		}
		},{
		data : e2,
		bars : {
			show : true,
		}
		}, 
		{
		data : e3,
		bars : {
			show : true,
		}
		},
		],options);
	});



	
}