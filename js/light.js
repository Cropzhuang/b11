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
		$("#e11_2").html(parseInt(getValue(a[1])*10)/10);
		$(".e2_content").html(floor(getValue(a[3]))+"<br/>"+floor(getValue(a[18]))+"<br/>"+floor(getValue(a[19]))+"<br/>"+floor(getValue(a[2])))
    });
	
		
}

