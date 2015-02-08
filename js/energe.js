$(function() {
	setRadar();
	set_e2(42);
	set_e4();
	set_e5(30);
	set_e6(30);
});

function set_e2(dayCount) {
	var start=dateBefore(dayCount*24*3600*1000);
	var end=new Date();
	var startString=setDateString(start);
	var endString=setDateString(end);
	var eF1=new Array(),
	eF2=new Array(),
	eF3=new Array(),
	eF4=new Array(),
	eF5=new Array(),
	x_ticks=new Array();
	queryDate("SecondPageP2",startString,endString, function(xml) {
		var data = $(xml).find("string").text();
		data=data.replace(/;/g,",");
		var a = data.split(",");
		for ( var i = 0; i < (a.length-1); i++) {
			var num=parseInt((i%((a.length-1)/5))/2);
			if(i < (a.length-1)/5)
			x_ticks.push(num);
			switch(i%2){
			case 0:
				continue;
			case 1:
				if(i < (a.length-1)/5)
				eF1.push([num,floor(getValue(a[i]))]);
				else if(i >=(a.length-1)/5&&i < (a.length-1)*2/5)
					eF2.push([num,floor(getValue(a[i]))]);
				else if(i >=(a.length-1)*2/5&&i < (a.length-1)*3/5)
					eF3.push([num,floor(getValue(a[i]))]);
				else if(i >=(a.length-1)*3/5&&i < (a.length-1)*4/5)
					eF4.push([num,floor(getValue(a[i]))]);
				else if(i < a.length-1)
					eF5.push([num,floor(getValue(a[i]))]);
				break;
			default:
				break;
			}
		}
		var ticks=new Array();
		for(var i=0;i<dayCount;i++){
			var day=dateBefore((dayCount-i)*24*3600*1000);
			ticks.push([i,day.getDate()]);
		}
		var lines_e2=[];
		var e2_stroke=["#a6f34b","#fc6565","#73d5ff","#48ae5b","#f3a24b"];
		for (var i=0;i<5;i++){
		lines_e2[i]={ show: true ,color:e2_stroke[i],lineWidth:3};
		}
	var options = {
        series: { shadowSize: 0 }, // drawing is faster without shadows
        xaxis: {show:true,ticks:ticks },
        grid:{
        borderColor:"#dadfe1",
        }
    };
		$.plot("#index2_body", [
		{
		data : eF1,
		lines:lines_e2[0]
		},{
		data : eF2,
		lines:lines_e2[1]
		}, 
		{
		data : eF3,
		lines:lines_e2[2]
		},
		{
		data : eF4,
		lines:lines_e2[3]
		},
		{
		data : eF5,
		lines:lines_e2[4]
		}
		],options);
	});
}
function set_e4() {
	var start=dateBefore(2*24*3600*1000);
	var end=dateBefore(1*24*3600*1000);
	var startString=setDateString(start);
	var endString=setDateString(end);
	var eair=new Array(),
	eplugin=new Array(),
	elight=new Array(),
	x_ticks=new Array();
	
	queryDate("SecondPageP4",startString,endString, function(xml) {
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
	e4=new Array();
	
	
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
		var ticks=new Array();
		for(var i=0;i<dayCount;i++){
			var day=dateBefore((dayCount-i)*24*3600*1000);
			ticks.push([i,day.getDate()]);
		}
	var options = {
			colors:["#c15d5f","#58df15","#4badec","#ffffff"],
        series: { shadowSize: 0 }, // drawing is faster without shadows
        xaxis: {show:true ,ticks:ticks},
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
	ticks=new Array();
	
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
		ticks=new Array();
		for(var i=0;i<dayCount;i++){
			var day=dateBefore((dayCount-i)*24*3600*1000);
			ticks.push([i,day.getDate()]);
		}
	var options = {
			colors:["#c15d5f","#e4b04b","#169fff"],
        series: { shadowSize: 0 }, // drawing is faster without shadows
        xaxis: {show:true,ticks:ticks },
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

function setRadar(){
	RadarChart.defaultConfig.color = function() {
	};
	RadarChart.defaultConfig.radius = 2;
	var data0 = [ {
		className : 'air',
		axes : [ {
			axis : "1F",
			value : 6
		}, {
			axis : "5F",
			value : 7
		}, {
			axis : "4F",
			value : 3
		}, {
			axis : "3F",
			value : 4
		}, {
			axis : "2F",
			value : 9
		} ]
	}, {
		className : 'plugin',
		axes : [ {
			axis : "1F",
			value : 6
		}, {
			axis : "5F",
			value : 7
		}, {
			axis : "4F",
			value : 6.4
		}, {
			axis : "3F",
			value : 6
		}, {
			axis : "2F",
			value : 9
		} ]
	}, {
		className : 'light', // optional can be used for styling
		axes : [ {
			axis : "1F",
			value : 5
		}, {
			axis : "5F",
			value : 6
		}, {
			axis : "4F",
			value : 5
		}, {
			axis : "3F",
			value : 9
		}, {
			axis : "2F",
			value : 2
		} ]
	} ];
	var data1 = [ {
		className : 'radar4', // optional can be used for styling
		axes : [ {
			axis : "1F",
			value : 13
		}, {
			axis : "5F",
			value : 6
		}, {
			axis : "4F",
			value : 5
		}, {
			axis : "3F",
			value : 9
		}, {
			axis : "2F",
			value : 2
		} ]
	}, {
		className : 'radar5',
		axes : [ {
			axis : "1F",
			value : 6
		}, {
			axis : "5F",
			value : 7
		}, {
			axis : "4F",
			value : 10
		}, {
			axis : "3F",
			value : 13
		}, {
			axis : "2F",
			value : 9
		} ]
	} ];

	function dataSet() {
		return data0.map(function(d) {
			return {
				className : d.className,
				axes : d.axes.map(function(axis) {
					var a = Math.ceil(Math.random() * 10);
					console.log(a);
					return {
						axis : axis.axis,
						value : a
					};
				})
			};
		});
	}
	var chart = RadarChart.chart();
	var cfg = chart.config(); // retrieve default config
	var svg = d3.select('#radar0').append('svg').attr('width', cfg.w).attr(
			'height', cfg.h);
	svg.append('g').classed('single', 1).datum(data0).call(chart);
	var svg2 = d3.select('#radar1').append('svg').attr('width', cfg.w).attr(
			'height', cfg.h);
	svg2.append('g').classed('single', 1).datum(data1).call(chart);
	
}