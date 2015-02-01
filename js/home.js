$(function() {
	set_i2();

	set_i4();
	set_i5();
});
function set_runway(run0, run1, run2, run3, run4) {
	var runwayColor = [ "#949adc", "#cbad89", "#79b89e", "#e99e4a", "#cfd75a",
			"#646464" ];
	var r = Raphael("holder", 480, 480), R = 227, init = true, param = {
		stroke : "#646464",
		"stroke-width" : 25
	},

	hash = document.location.hash, marksAttr = {
		fill : hash || "#444",
		stroke : "none"
	}, path;
	// Custom Attribute

	r.customAttributes.arc = function(value, total, R, i) {
		total = 100;
		var percent = value / total;
		var path;

		if (percent < 0.25 && percent >= 0) {
			path = [ [ "M", 33, 240 - R ],
					[ "L", 240 * percent / 0.25, 240 - R ] ];

		} else if (percent >= 0.25 && percent <= 0.75) {

			var alpha = 360 * percent, a = (90 - alpha) * Math.PI / 180, x = 240
					+ R * Math.cos(a), y = 240 - R * Math.sin(a),
			// color = "hsb(".concat(Math.round(R) / 200, ",", value / total, ",
			// .75)"),
			path = [ [ "M", 33, 240 - R ], [ "L", 240, 240 - R ],
					[ "A", R, R, 0, +(alpha > 180), 1, x, y ] ];

		} else if (percent <= 1 && percent > 0.75) {
			var alpha = 360 * 0.75, a = (90 - alpha) * Math.PI / 180, x = 240
					+ R * Math.cos(a), y = 240 - R * Math.sin(a), endY = 240 - (percent - 0.75) / 0.25 * 75;

			path = [ [ "M", 33, 240 - R ], [ "L", 240, 240 - R ],
					[ "A", R, R, 0, 1, 1, x, y ] ];
			path.push([ "L", x, endY ]);
		}
		return {
			path : path,
			stroke : runwayColor[i]
		};
	};

	var runway0bg = r.path().attr(param).attr({
		arc : [ 0, 100, R, 5 ]
	});
	var runway0 = r.path().attr(param).attr({
		arc : [ 0, 100, R, 0 ]
	});

	R -= 33;
	var runway1bg = r.path().attr(param).attr({
		arc : [ 0, 100, R, 5 ]
	});
	var runway1 = r.path().attr(param).attr({
		arc : [ 0, 100, R, 1 ]
	});

	R -= 33;
	var runway2bg = r.path().attr(param).attr({
		arc : [ 0, 100, R, 5 ]
	});
	var runway2 = r.path().attr(param).attr({
		arc : [ 0, 100, R, 2 ]
	});

	R -= 33;
	var runway3bg = r.path().attr(param).attr({
		arc : [ 0, 100, R, 5 ]
	});
	var runway3 = r.path().attr(param).attr({
		arc : [ 0, 100, R, 3 ]
	});

	R -= 33;
	var runway4bg = r.path().attr(param).attr({
		arc : [ 0, 100, R, 5 ]
	});
	var runway4 = r.path().attr(param).attr({
		arc : [ 0, 100, R, 4 ]
	});

	// var pm = r.circle(300, 300, 16).attr({stroke: "none", fill:
	// Raphael.hsb2rgb(15 / 200, 1, .75).hex});
	// html[5].style.color = Raphael.hsb2rgb(15 / 200, 1, .75).hex;

	function getPath(percent) {

	}

	function updateVal(value, total, R, hand, id) {

		if (init) {
			hand.animate({
				arc : [ value, total, R, id ]
			}, 900, ">");
		}
		/*
		 * else { if (!value || value == total) { value = total;
		 * hand.animate({arc: [value, total, R]}, 750, "bounce", function () {
		 * hand.attr({arc: [0, total, R]}); }); } else { hand.animate({arc:
		 * [value, total, R]}, 750, "elastic"); } }
		 */

	}

	function drawMarks(R, total) {
		total = 100;
		/*
		 * var color = "hsb(".concat(Math.round(R) / 200, ", 1, .75)"), out =
		 * r.set();
		 * 
		 * return out;
		 */
	}
	function drawFontPosition(percentBefore, R, dom) {
		var percent = (percentBefore - 1) / 100, path = new Array();
		if (percent < 0.25 && percent >= 0) {
			path = [ 240 * percent / 0.25, 240 - R ];

		} else if (percent >= 0.25 && percent <= 0.75) {

			var alpha = 360 * percent, a = (90 - alpha) * Math.PI / 180, x = 240
					+ R * Math.cos(a), y = 240 - R * Math.sin(a), endX = (percent - 0.25)
					/ 0.25 * R;
			// color = "hsb(".concat(Math.round(R) / 200, ",", value / total, ",
			// .75)"),
			path = [ x - 8, y - 10 ];

		} else if (percent <= 1 && percent > 0.75) {
			var alpha = 360 * 0.75, a = (90 - alpha) * Math.PI / 180, x = 240
					+ R * Math.cos(a), y = 240 - R * Math.sin(a), endY = 240 - (percent - 0.75) / 0.25 * 75;
			path = [ x - 10, endY ];
		}
		$("#" + dom).attr("style",
				"margin-left:" + path[0] + "px;margin-top:" + path[1] + "px;");
		$("#" + dom).text(percentBefore);
		setTimeout(function() {
			$("#" + dom).fadeIn("1000");
		}, 1000);
	}
	(function() {
		updateVal(100, 100, 227, runway0bg, 5);
		updateVal(run0, 100, 227, runway0, 0);
		drawFontPosition(run0, 227, "i10");

		updateVal(100, 100, 194, runway1bg, 5);
		updateVal(run1, 100, 194, runway1, 1);
		drawFontPosition(run1, 194, "i11");

		updateVal(100, 100, 161, runway2bg, 5);
		updateVal(run2, 100, 161, runway2, 2);
		drawFontPosition(run2, 161, "i12");

		updateVal(100, 100, 128, runway3bg, 5);
		updateVal(run3, 100, 128, runway3, 3);
		drawFontPosition(run3, 128, "i13");

		updateVal(100, 100, 95, runway4bg, 5);
		updateVal(run4, 100, 95, runway4, 4);
		drawFontPosition(run4, 95, "i14");
		$("#holder_center").text(
				Math.floor((run0 + run1 + run2 + run3 + run4) / 5));
		// 调用自身
		// setTimeout(arguments.callee, 1000);
		init = false;
	})();

}

function set_i2() {
	var start=dateBefore(12*24*3600*1000);
	var end=new Date();
	var startString=setDateString(start);
	var endString=setDateString(end);
	var realEnergy=new Array(),
	planEnergy=new Array(),
	energyPerPeople=new Array(),
	x_ticks=new Array();
	
	queryDate("FirstPageP2EnergyData",startString,endString, function(xml) {
		var data = $(xml).find("string").text();
		data=data.replace(/;/g,",");
		var a = data.split(",");
		for ( var i = 0; i < a.length-1; i++) {
			var num=parseInt(i/4)*3;
			var dateNew=dateBefore((12-num)*24*3600*1000);
			x_ticks.push(num);
			switch(i%4){
			case 0:
				continue;
			case 1:
				realEnergy.push([num,floor(getValue(a[i]))]);
				break;
			case 2:
				planEnergy.push([num+1,floor(getValue(a[i]))]);
				break;
			case 3:
				energyPerPeople.push([num,floor(getValue(a[i]))*200]);
				break;
			default:
				break;
			}
			
		}
		var options = {
				colors:["#42b4e6","#b1b1b1","#a1a1a1"],
		        series: { shadowSize: 0 }, // drawing is faster without shadows
		        xaxis: { show:false },
		        yaxis: { show:true },
		        grid:{
		        borderColor:"#dadfe1",
		        }
		    };
		$.plot("#index2_body", [ {
			data : realEnergy,
			bars : {
				show : true,
				fill : true
			}
		}, {
			data : planEnergy,
			bars : {
				show : true,
				fill : true
			}
		}, {
			data : energyPerPeople,
			lines : {
				show : true
			}
		} ],options);
	});
	queryDate("FirstPageP2Weather",startString,endString, function(xml) {
		var data = $(xml).find("string").text();
		data=data.replace(/;/g,",");
		var a = data.split(",");
		var maxTempArray=new Array(),
		minTempArray=new Array(),
		weatherArray=new Array(),
		imgArray=new Array();
		
		for(var i=0;i<a.length;i++){
			switch(i%6){
			case 0:
			case 1:
			case 2:
				break;
			case 3:
				minTempArray.push(floor(getValue(a[i])));
				break;
			case 4:
				maxTempArray.push(floor(getValue(a[i])));
				break;
			case 5:
				var value=getValue(a[i]);
				weatherArray.push(value);
				if(value.indexOf("雨")>-1){
					imgArray.push("rain");
				}else if(value.indexOf("晴")==0){
					imgArray.push("sun");
				}
				else if(value.indexOf("多云")>-1){
					imgArray.push("cloud");
				}else {
					imgArray.push("rain");
				}
				
				break;
				default:break;
			}
			
		}
		$("#weather .w").each(function(n, d) {
			$(d).html("<img src=\"images/"+imgArray[n]+"_0.jpg\" alt=\"\">"+minTempArray[n]+"/"+maxTempArray[n]+"°C");
		
		})
	});
	
	
}

function set_i4() {

	query("FirstPageP4", function(xml) {
		var data = $(xml).find("string").text();
		var a = data.split(";");
		var dataAll = new Array();
		for ( var i = 0; i < a.length; i++) {
			for ( var j = 0; j < a[i].split(",").length; j++)
				dataAll.push(a[i].split(",")[j]);
		}
		$("#index4_ .d").each(function(n, d) {
			var value=dataAll[n].split(":")[1];
			switch (n % 5) {
			case 1:
				if(value==0){
					
				}else	if(value<10)
					$(this).html("<div class='orange_s'>"+value+"</div>");
				else if(value<=99){
					$(this).html("<div class='orange_l'>"+value+"</div>");
				}else {
					$(this).html("<div class='orange_l'>99</div>");;
				}
					break;
			case 3:
				$(this).text(floor(value)+"°C");
				break;
			case 4:
				$(this).text(value);
				break;
			default :
				$(this).text(floor(value));
			}
		});
	});
}
function set_i5() {
	query("FirstPageP5", function(xml) {
		var data = $(xml).find("string").text();
		var a = data.split(";");
		var dataAll = new Array();
		for ( var i = 0; i < a.length; i++) {
			for ( var j = 0; j < a[i].split(",").length; j++)
				dataAll.push(a[i].split(",")[j]);
		}
		//i5 pie
		var pieData = [ {
			label : "",
			data : floor(getValue(dataAll[0]))
		}, {
			label : "",
			data :100-floor(getValue(dataAll[0]))
		} ];
		$.plot("#i5_pie", pieData, {
			series : {
				pie : {
					show : true,
					radius : 1,
					label : {
						show : true,
						radius : 0.5,
						formatter : labelFormatter,
						background : {
							opacity : 0.8
						}
					}
				}
			},
			legend : {
				show : false
			}
		});
		function labelFormatter(label, series) {
			return "<div style='font-size:20px; text-align:center; padding:0px; color:white;'>"
					+ label + "<br/>" + Math.round(series.percent) + "%</div>";
		}
		
		$("#index5_right .i5_right_bg").each(function(n, d) {
			var percent=getValue(dataAll[n+1]);
			if(percent<1){
				percent*=100;
			}
			var picPointer= Math.round(percent/7);
			if(picPointer<1){
				picPointer=1;
			}else if(picPointer>13){
				picPointer=13;
			}
			var content="";
			if(n==0){
				content="功率因数0."+percent+" 优";
			}else if(n==1){
				content="谐波畸变 "+percent+"% 优";
			}else if(n==2){
				content="负荷 "+percent+"% 中";
			}else if(n==3){
				content="已用电量 "+percent+"% 预警";
			}
			$(d).html("<img src=\"images/home/i5_"+picPointer+".png\" alt=\"\">"+content);
			
		});
		for (var i=0;i<4;i++){
		var alarm=getValue(dataAll[i+5]);
		if(alarm<=10)
			$("#i5_"+(i+4)).html("<div class='orange_s'>"+alarm+"</div>");
		else 
			$("#i5_"+(i+4)).html("<div class='orange_l'>"+alarm+"</div>");
		}
		/*
		if(true)
			$("#i5_4").html("<div class='orange_s'>"+value+"</div>");
		else
			$("#i5_4").html("<div class='orange_l'>"+value+"</div>");
		*/
	})
}