$(function() {
	set_head();
});

function set_head() {
	
	query("FourthPageMenu3others", function(xml) {
		var data = $(xml).find("string").text();
		data=data.replace(/;/g,",");
		var a = data.split(",");
		$("#e11_0").html(parseInt(getValue(a[0])*10)/10+"%");
		$("#e11_1").html(parseInt(getValue(a[17])*10)/10+"°C");
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

