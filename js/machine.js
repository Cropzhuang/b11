$(function() {
	set_head();
	set_e2();
	set_bg();
	//set_e3();
	set_e3(30);
	set_e4();
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
				$("#e11_"+i).text(content);
				break;
			default:break;
			}
			
		}
    });
	query("ThirdPageMenu1P1M2", function(xml) {
		var data = $(xml).find("string").text();
		data=data.replace(/;/g,",");
		var a = data.split(",");
		var content="";
		for ( var i = 0; i < (a.length-2); i++) {
			content+=floor(getValue(a[i]))+"kWh<br/>";
		}
		$(".e2_content").html(content);
    });
		
}
function set_bg(){
	query("ThirdPageMenu1P1Others", function(xml) {
		var data = $(xml).find("string").text();
		data=data.replace(/;/g,",");
		var a = data.split(",");
		var content="";
		var d;
		for ( var i = 0; i < (a.length-1); i++) {
			var value=parseInt(getValue(a[i])*10)/10;
			switch(i){
			case 9:
			case 10:
			case 11:
			case 12:
			case 13:
			case 14:
			case 15:
			case 16:
				value+="℃";
				break;
			case 17:
				value+="KW";
				break;
			case 18:
				value+="%";
				break;
			case 19:
				value+="V";
				break;
			case 20:
				value+="V";
				break;
			case 21:
				value+="分";
				break;
			case 22:
				value+="KW";
				break;
			case 23:
				value+="立方米/时";
				break;
			case 24:
				value+="℃";
				break;
			case 25:
				value+="℃";
				break;
			case 26:
				value=	getValue(a[i]);
				break;
			default :
				break;
			}
			if(i>8&&i<35)
			$("#d"+(i-9)).text(value);
			if(i>=35&&i<40){
				content+=floor(getValue(a[i])) +"%<br/>"; 
			}
		}
		$("#e11_1").html(parseInt(getValue(a[0])*100)/100);
		$("#e11_2").html(getValue(a[1])+"%");
		$("#e11_3").html(parseInt(getValue(a[41])));
		$("#e11_4").html(getValue(a[2])+"Lux"); 
		$("#machine_2_").html(content);
		//i5 pie
		var pieData = [{
			label : "",
			data :floor(getValue(a[35]))
		}, {
			label : "",
			data :floor(getValue(a[36]))
		}, 
		 {
			label : "",
			data :floor(getValue(a[37]))
		},
		 {
			label : "",
			data :floor(getValue(a[38]))
		}, {
			label : "",
			data :floor(getValue(a[39]))
		}];
		$.plot("#machine_pie", pieData, {
			series : {
				pie : {
					show : true,
					radius : 1,
					label : {
						show : false,
						radius : 0.5,
						background : {
							opacity : 0.8
						}
					}
				}
			},
			legend : {
				show : false
			},
			colors: ["#97c636", "#fe8917", "#737373", "#e4440c", "#17c5fe"],
		});
    });
	
}
function set_e2() {
	
	query("ThirdPageMenu1P2", function(xml) {
		var data = $(xml).find("string").text();
		data=data.replace(/;/g,",");
		var a = data.split(",");
		var content="";
		var dataAll=new Array();
		for ( var i = 0; i < 5; i++) {
			content+=parseInt(getValue(a[i])*100)+"%<br/>";
			dataAll.push(getValue(a[i]));
		}
		$("#machine_2_").html(content);
		
//		//i5 pie
//		var pieData = [ {
//			label : "",
//			data :dataAll[0]
//		}, {
//			label : "",
//			data :dataAll[1]
//		}, 
//		 {
//			label : "",
//			data :dataAll[2]
//		},
//		 {
//			label : "",
//			data :dataAll[3]
//		}, {
//			label : "",
//			data :dataAll[4]
//		}];
//		$.plot("#machine_pie", pieData, {
//			series : {
//				pie : {
//					show : true,
//					radius : 1,
//					label : {
//						show : false,
//						radius : 0.5,
//						background : {
//							opacity : 0.8
//						}
//					}
//				}
//			},
//			legend : {
//				show : false
//			},
//			colors: ["#97c636", "#fe8917", "#737373", "#e4440c", "#17c5fe"],
//		});
    });
		
}
function set_e3(dayCount) {
	var start=dateBefore(dayCount*24*3600*1000);
	var end=new Date();
	var startString=setDateString(start);
	var endString=setDateString(end);
	var e1=new Array();
	queryDate("ThirdPageMenu1P3",startString,endString, function(xml) {
		var data = $(xml).find("string").text();
		data=data.replace(/;/g,",");
		var a = data.split(",");
		for ( var i = 0; i < (a.length-1); i++) {
			if(i%2==1){
				var x=parseInt(i/2);
				e1.push([x,getValue(a[i])]);
			}
		}
		var ticks=new Array();
		for(var i=0;i<dayCount;i++){
			var day=dateBefore((dayCount-i)*24*3600*1000);
			ticks.push([i,day.getDate()]);
		}
	var options = {
			colors:["#4badec"],
        series: { shadowSize: 0 }, // drawing is faster without shadows
        xaxis: {show:true ,ticks:ticks},
        grid:{
        borderColor:"#dadfe1",
        }
    };
		$.plot("#energe3_", [
		{
		data : e1,
		bars : {
			show : true,
			fill : true,
			color:"#c15d5f",
		}
		}
		],options);
	});
}
function set_e4() {
	var start=dateBefore(1*24*3600*1000);
	var end=new Date();
	var startString=setDateString(start);
	var endString=setDateString(end);
	var e1=new Array();
	queryDate("ThirdPageMenu1P4",startString,endString, function(xml) {
		var data = $(xml).find("string").text();
		data=data.replace(/;/g,",");
		var a = data.split(",");
		for ( var i = 0; i < (a.length-1); i++) {
			if(i%2==1){
				var x=parseInt(i/2);
				e1.push([x,getValue(a[i])]);
			}
		}
		var ticks=new Array();
		for(var i=0;i<24;i++){
			ticks.push([i,i+":00"]);
		}
	var options = {
			colors:["#4badec"],
        series: { shadowSize: 0 }, // drawing is faster without shadows
        xaxis: {show:true ,ticks:ticks},
        grid:{
        borderColor:"#dadfe1",
        }
    };
		$.plot("#energe4_", [
		{
		data : e1,
		bars : {
			show : true,
			fill : true,
			color:"#c15d5f",
		}
		}
		],options);
	});
}



	
