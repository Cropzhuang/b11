var timeInterval1 = 10000;
var timeInterval2 = 8000;
var carouselInterval=5000;
$(function(){
	  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
	  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
	  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

	  ga('create', 'UA-46005407-1', 'genkisushi.com.cn');
	  ga('send', 'pageview');

	
	$(".nav").mouseenter(function(){
		var id=$(this).attr("id");
		$("#"+id+"div").animate({
			"margin-top" : -23
		}, 200);
		
	});
	$(".nav").mouseleave(function(){
		var id=$(this).attr("id");
		$("#"+id+"div").animate({
			"margin-top" : 0
		}, 200);
		
	});
	$(".positionl .pic").mouseenter(function(){
		$(this).animate({height:"285px",width:"285px",left:"-14px",top:"-14px"});
	});
	$(".positionr .pic").mouseenter(function(){
		$(this).animate({height:"285px",width:"285px",top:"-14px"});
	});
	$(".pic").mouseleave(function(){
		$(this).attr("style","");
		
	});
	if(count>0)
	setInterval("carousel()", carouselInterval);
	
	$(".news").mouseenter(function(){
		isHover=1;
	});
	$(".news").mouseleave(function(){
		isHover=0;
	});
});
var count=8;
var nowCarousel=0;
var isHover=0;
function carousel(){
	if(isHover==0){
		$("#news"+nowCarousel).hide();
		$("#point"+nowCarousel+"i").hide();
		$("#point"+nowCarousel).attr("class","point");
		if(nowCarousel<count-1)
			nowCarousel+=1;
		else
			nowCarousel=0;
		$("#news"+nowCarousel).fadeIn(1000);
		$("#point"+nowCarousel+"i").fadeIn(1000);
		$("#point"+nowCarousel).attr("class","point_");
	}
}

function clickCarousel(n){
	$("#news"+nowCarousel).hide();
	$("#point"+nowCarousel+"i").hide();
	$("#point"+nowCarousel).attr("class","point");
	nowCarousel=n;
	$("#news"+n).fadeIn(1000);
	$("#point"+n+"i").fadeIn(1000);
	$("#point"+n).attr("class","point_");

}

function go(n) {
	switch (n) {
	case 0:
		window.open("http://www.genkisushi.co.jp");
		break;
	case 1:
		window.open("http://www.genkisushi.com.hk");
		break;
	case 2:

		break;
	case 3:
		window.open("sitemap.html");
		break;
	case 4:
		window.open("privacy.html");
		break;
	case 5:
		window.open("legal.html");
		break;
	default:
		break;
	}
	return;
}

function gonotify(n){
	switch (n) {
	case 0:
		location.href="newnotify.html";
		break;
	case 1:
		location.href="newnotify.html?newstore=1";
		break;
	default:
		break;
	}
}


function request(paras)
{ 
    var url = location.href; 
    var paraString = url.substring(url.indexOf("?")+1,url.length).split("&"); 
    var paraObj = {} ;
    for (var i=0; j=paraString[i]; i++){ 
    paraObj[j.substring(0,j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=")+1,j.length); 
    } 
    var returnValue = paraObj[paras.toLowerCase()]; 
    if(typeof(returnValue)=="undefined"){ 
    return ""; 
    }else{ 
    return returnValue; 
    } 
}