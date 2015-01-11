$(function() {
	var goArray1 = [ "index.html", "energe.html", "machine.html", "device.html" ];
	var efficiencyArray = [ "machine.html", "meeting.html", "exhibition.html",
			"office.html" ];
	var deviceArray=["wind.html", "electric.html"];
	$(".nav").click(function() {
		if ($(this).index() < 3)
			location.href = goArray1[$(this).index() - 1];
	});
	$(".nav").mouseenter(function() {
		$(".sub_nav").hide();
	}).mouseleave(function() {
		$(".sub_nav").hide();
	});

	$(".eff").click(function() {
		window.location.href = efficiencyArray[$(this).index()];
	});
	$(".dev").click(function(){
		window.location.href = deviceArray[$(this).index()];
	});
	$("#nav3").mouseenter(function() {
		$("#efficiency").show();
	}).mouseleave(function() {
		$("#efficiency").mouseenter(function() {
			$("#efficiency").show();
		}).mouseleave(function() {
			$("#efficiency").hide();
		});
	});
	$("#nav4").mouseenter(function() {
		$("#device").show();
	}).mouseleave(function() {
		$("#device").mouseenter(function() {
			$("#device").show();
		}).mouseleave(function() {
			$("#device").hide();
		});
	});
});
function request(paras) {
	var url = location.href;
	var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
	var paraObj = {};
	for ( var i = 0; j = paraString[i]; i++) {
		paraObj[j.substring(0, j.indexOf("=")).toLowerCase()] = j.substring(j
				.indexOf("=") + 1, j.length);
	}
	var returnValue = paraObj[paras.toLowerCase()];
	if (typeof (returnValue) == "undefined") {
		return "";
	} else {
		return returnValue;
	}
}
function query(action,start,end,callback){
	var params;
	if(start!=null&&start!="")
		params={pStartTime:start,pEndTime:end};
	
	 $.ajax({
         url:"api/"+action+".xml",  
         type:"POST",  
         dataType:"xml",  
         data:params,
         error: function(xml){  
             alert('Error loading XML document'+xml);  
         },  
         success: callback
	 });
}
function query(action,callback){
	 $.ajax({
         url:"api/"+action+".xml",  
         type:"POST",  
         dataType:"xml",  
         error: function(xml){  
             alert('Error loading XML document'+xml);  
         },  
         success: callback
	 });
}
function floor(number){
	number=number.replace(/[^0-9]/ig,""); 
	return Math.floor(number);
}
