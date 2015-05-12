$(function() {
	set_head();
	//set_e3();
	set_e2(30);
	set_e3();
	$("#dwind").mouseenter(function(){
		$("#dwind_alert").show();
	}).mouseleave(function(){
		$("#dwind_alert").hide();
	});
	$("#dhot").mouseenter(function(){
		$("#dhot_alert").show();
	}).mouseleave(function(){
		$("#dhot_alert").hide();
	});
});

function set_head() {
	
	query("FourthPageMenu1P1M1", function(xml) {
		var data = $(xml).find("string").text();
		data=data.replace(/;/g,",");
		var a = data.split(",");
		for ( var i = 0; i < (a.length-1); i++) {
			var content="";
			switch(i){
			case 0:
				content=Math.round(getValue(a[i])*10)/10;
				break;
			default:break;
			}
			$("#e11_"+i).text(content);
		}
    });
	
	query("FourthPageMenu1others", function(xml) {
		var data = $(xml).find("string").text();
		data=data.replace(/;/g,",");
		var a = data.split(",");
		$("#e11_0").text(parseInt(getValue(a[8])*100)/100); 
		$("#e11_1").text(parseInt(getValue(a[18]))+"℃");
		$("#e11_2").html(parseInt(getValue(a[4]))+"<br/>m³");
		
		$("#d0").text(getValue(a[12])==1?"开启":"关闭");
		$("#d1").text(getValue(a[10])==0?"正常":"报警");
		$("#d2").text(getValue(a[11])==1?"手动":"自动");
		$("#d3").text(getValue(a[16])+"Pa");
		$("#d4").text(getValue(a[19])+"℃");
		$("#d5").text(parseInt(getValue(a[15]))+"%");
		$("#d6").text(getValue(a[21])+"%");
		$("#d7").text(getValue(a[13])==0?"正常":"报警");
		var runmode="Normal";
		switch (getValue(a[14])){
			case 0:
				runmode="Normal";
				break;
			case 1:
				runmode="Morning";
				break;
			case 2:
				runmode="Eco";
				break;
			case 3:
				runmode="Remote";
				break;
			default :
				runmode="Normal";
				break;
		}
		$("#d8").text(runmode);
		$("#d9").text(getValue(a[20])+"Hrs");
		$("#d10").text(getValue(a[19])+"℃");
		$("#d11").text(getValue(a[17])+"Pa");
		$("#d12").text(getValue(a[0]));
		$("#d13").text(getValue(a[1]));
    });
	query("FourthPageMenu1P1M2", function(xml) {
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

//每日耗电趋势
function set_e2(dayCount) {
	var start=dateBefore(dayCount*24*3600*1000);
	var end=new Date();
	var startString=setDateString(start);
	var endString=setDateString(end);
	var eF1=new Array();
	queryDate("FourthPageMenu1P2",startString,endString, function(xml) {
		var data = $(xml).find("string").text();
		data=data.replace(/;/g,",");
		var a = data.split(",");
		for ( var i = 0; i < (a.length-1); i++) {
			var x=parseInt(i/2);
			switch(i%2){
			case 0:
				break;
			case 1:
				eF1.push([x,floor(getValue(a[i]))]);
				break;
			default:break;
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
        xaxis: {show:true,ticks:ticks },
        grid:{
        borderColor:"#dadfe1",
        }
    };
		$.plot("#efficiency2_body", [
		{
		data : eF1,
		bars : {
			show : true,
			fill : true,
			color:"#4badec",
		}
		}
		],options);
	});
		
}
//逐时能耗及占用状态
function set_e3() {
	var start=dateBefore(1*24*3600*1000);
	var end=new Date();
	var startString=setDateString(start);
	var endString=setDateString(end);
	var e1=new Array(),
	 e2=new Array(),
	 ticks=new Array();
	queryDate("FourthPageMenu1P3",startString,endString, function(xml) {
		var data = $(xml).find("string").text();
		data=data.replace(/;/g,",");
		var a = data.split(",");
		for ( var i = 0; i < (a.length-1); i++) {
			var x=parseInt(i/3);
			switch(i%3){
			case 0:
				break;
			case 1:
				e1.push([x,getValue(a[i])]);
				break;
			case 2:
				e2.push([x,getValue(a[i])]);
				break;
				default:break;
			}
		}
		for(var i=0;i<24;i++){
			ticks.push([i,i+":00"]);
		}
	var options = {
			colors:["#8cd981","#f56200"],
        series: { shadowSize: 0 }, // drawing is faster without shadows
        xaxis: {show:true ,ticks:ticks},
        grid:{
        borderColor:"#dadfe1",
        }
    };
		$.plot("#energe3_", [
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
				color:"#f56200",
			}
			}
		],options);
	});
}


	
