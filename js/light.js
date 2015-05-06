$(function() {
	set_head();
	set_e2(31);
}); 

function set_head() {
	
	query("FourthPageMenu3others", function(xml) {
		var data = $(xml).find("string").text();
		data=data.replace(/;/g,",");
		var a = data.split(",");
		$("#e11_0").html(parseInt(getValue(a[0])*10)/10);
		$("#e11_1").html(parseInt(getValue(a[17])*10)/10+"℃");
		$("#e11_2").html(parseInt(getValue(a[1])*10)/10+"MJ/m3");
		$(".e2_content").html(floor(getValue(a[3]))+"<br/>"+floor(getValue(a[18]))+"<br/>"+floor(getValue(a[19]))+"<br/>"+floor(getValue(a[2])))
		$("#d0").html("-<br/>"+parseInt(getValue(a[4]))+"kW<br/>"+parseInt(getValue(a[5]))+"kW");
		$("#d2").html("-<br/>"+parseInt(getValue(a[8]))+"kW<br/>"+parseInt(getValue(a[9]))+"kW");
		$("#d4").html("-<br/>"+parseInt(getValue(a[12]))+"kW<br/>"+parseInt(getValue(a[13]))+"kW");
		$("#d1").html(parseInt(getValue(a[3]))+"kW<br/>"+parseInt(getValue(a[6]))+"H");
		$("#d3").html(parseInt(getValue(a[7]))+"kW<br/>"+parseInt(getValue(a[10]))+"H");
		$("#d5").html(parseInt(getValue(a[11]))+"kW<br/>"+parseInt(getValue(a[14]))+"H");

	});
}
	//每日耗电趋势
	function set_e2(dayCount) {
		var start=dateBefore(dayCount*24*3600*1000);
		var end=new Date();
		var startString=setDateString(start);
		var endString=setDateString(end);
		var eF1=new Array();
		queryDate("FourthPageMenu2P2",startString,endString, function(xml) {
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

