$(function() {
	var goArray1 = [ "index.html", "energe.html", "machine.html", "device.html" ];
	var efficiencyArray = [ "machine.html", "meeting.html", "exhibition.html",
			"office.html" ];
	var deviceArray=["wind.html", "electric.html","light.html"];
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
/*
function get(key,str){
	str=str.substring(str.indexOf(key));
	var a = str.replace(/+key+:/g,"");
	var b=a.split(";")[0];
	var c=b.split(",");
	if(c.length>1)
		return b.split(",");
	else
		return b.split(",")[0];
	
}*/
function queryDate(action,start,end,callback){
// var params;
// if(start!=null&&start!="")
var params={pStartTime:start,pEndTime:end};
	 $.ajax({
	 url:"Service1.asmx/"+action,  
//         url:"api/"+action+".xml",  
         type:"post",
         dataType:"xml",  
         data:params, 
         error: function(xml){  
           //  alert('Error loading XML document'+xml);  
         },  
         success: callback
	 });
}
function queryDateYear(action,start,end,interval,callback){
	// var params;
	// if(start!=null&&start!="")
	var params={pStartTime:start,pEndTime:end,interval:interval};
		 $.ajax({
		 url:"Service1.asmx/"+action,  
//	         url:"api/"+action+".xml",  
	         type:"post",
	         dataType:"xml",  
	         data:params,
	         error: function(xml){  
	           //  alert('Error loading XML document'+xml);  
	         },  
	         success: callback
		 });
	}
function query(action,callback){
	 $.ajax({
	url:"Service1.asmx/"+action,  
//        url:"api/"+action+".xml",  
         type:"post",  
         dataType:"xml",  
         error: function(xml){  
          //   alert('Error loading XML document'+xml); 
         },
         success: callback
	 });
}
function getValue(data){
	var d=data.split(":");
	var value=data.replace((d[0]+":"),"");
	return value;
	
}
function floor(number){
	number=number.replace(";","");
	return Math.floor(number);
}
function round2(number){
	number=number.replace(";","");
	return Math.round(number*100)/100;
}
function week(){
	var date =new Date();
	var dArray=new Array(7);
	var seconds=date.getTime();
	for(var i=0;i<7;i++){
		dArray[7-i]=date.setTime(seconds);
		seconds-=3600*1000*24;
	}
	return dArray;
}
function month(){
	var date =new Date();
	var dArray=new Array(30);
	var seconds=date.getTime();
	for(var i=0;i<30;i++){
		dArray[30-i]=date.setTime(seconds);
		seconds-=3600*1000*24;
	}
	return dArray;
}
function dateBefore(time){
	var date=new Date();
	var nowTime=date.getTime()-time;
	date.setTime(nowTime);
	return date;
}
function setDateString(date){
	return date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
	
}
function labelFormatter(label, series) { 
	return "<div style='font-size:10px; text-align:center; padding:0px; color:white; '>"
			+ label + "<br/>" + Math.round(series.percent) + "%</div>";
}
