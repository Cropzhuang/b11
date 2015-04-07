$(function() {
	set_head();
	//set_e3();
	set_e3(30);
	set_e4();
});

function set_head() {
	
	query("ThirdPageMenu3P1M1", function(xml) {
		var data = $(xml).find("string").text();
		data=data.replace(/;/g,",");
		var a = data.split(",");
		for ( var i = 0; i < (a.length-1); i++) {
			var content="";
			switch(i){
			case 0:
				content=Math.round(getValue(a[i])*10)/10;
				$("#e11_"+i).text(content);
				break;
			default:break;
			}
			
		}
    });
	query("ThirdPageMenu3thers", function(xml) {
		var data = $(xml).find("string").text();
		data=data.replace(/;/g,",");
		var a = data.split(",");
		$("#e11_1").text(Math.round(getValue(a[3])*10)/10+"°C");
		$("#e11_2").text(Math.round(getValue(a[0])*10)/10+"%");
		$("#e11_3").text(parseInt(getValue(a[2]))); 
		$("#e11_4").text(Math.round(getValue(a[1])*10)/10+"Lux");
	});
	query("ThirdPageMenu3P1M2", function(xml) {
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
function set_e3(dayCount) {
	var start=dateBefore(dayCount*24*3600*1000);
	var end=new Date();
	var startString=setDateString(start);
	var endString=setDateString(end);
	var eF1=new Array(),
	eF2=new Array();
	queryDate("ThirdPageMenu3P3",startString,endString, function(xml) {
		var data = $(xml).find("string").text();
		data=data.replace(/;/g,",");
		var a = data.split(",");
		for ( var i = 0; i < (a.length-1); i++) {
			var x=parseInt(i/3);
			switch(i%3){
			case 0:
				continue;
			case 1:
				eF1.push([x,floor(getValue(a[i]))]);
				break;
			case 2:
				eF2.push([x,floor(getValue(a[i]))]);
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
			colors:["#4badec","#ff8a00"],
        series: { shadowSize: 0 }, // drawing is faster without shadows
        xaxis: {show:true,ticks:ticks },
        grid:{
        borderColor:"#dadfe1",
        }
    };
		$.plot("#energe3_", [
		{
		data : eF1,
		bars : {
			show : true,
			fill : true,
			color:"#4badec",
		}
		},{
		data : eF2,
		lines:{ show: true ,color:"#ff8a00",lineWidth:3}
		}
		],options);
	});
		
}
function set_e4() {
	var start=dateBefore(1*24*3600*1000);
	var end=new Date();
	var startString=setDateString(start);
	var endString=setDateString(end);
	var e1=new Array(),
	 e2=new Array(),
	 e3=new Array(),
	 ticks=new Array();
	queryDate("ThirdPageMenu3P4",startString,endString, function(xml) {
		var data = $(xml).find("string").text();
		data=data.replace(/;/g,",");
		var a = data.split(",");
		for ( var i = 0; i < (a.length-1); i++) {
			var x=parseInt(i/4);
			switch(i%4){
			case 0:
				break;
			case 1:
				e1.push([x,getValue(a[i])]);
				break;
			case 2:
				e2.push([x,getValue(a[i])]);
				break;
			case 3:
				e3.push([x,getValue(a[i])]);
				break;
				default:break;
			}
		}
		for(var i=0;i<24;i++){
			ticks.push([i,i+":00"]);
		}
	var options = {
			colors:["#8cd981","#67b2bf","#b96f71"],
        series: { shadowSize: 0 }, // drawing is faster without shadows
        xaxis: {show:true ,ticks:ticks},
        grid:{
        borderColor:"#dadfe1",
        }
    };
		$.plot("#energe4_", [
		{
		data : e1,
		lines : {
			show : true,
			fill : true,
			color:"#8cd981",
		}
		},
		{
			data : e2,
			lines : {
				show : true,
				fill : true,
				color:"#67b2bf",
			}
		},
		{
			data : e3,
			lines : {
				show : true,
				fill : true,
				color:"#b96f71",
			}
		}
		],options);
	});
}



	
