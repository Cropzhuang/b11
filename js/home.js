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
	var d1 = [];
	for ( var i = 0; i < 14; i += 0.5) {
		d1.push([ i, Math.sin(i) ]);
	}

	var d2 = [ [ 0, 3 ], [ 4, 8 ], [ 8, 5 ], [ 9, 13 ] ];

	var d3 = [];
	for ( var i = 0; i < 14; i += 0.5) {
		d3.push([ i, Math.cos(i) ]);
	}

	var d4 = [];
	for ( var i = 0; i < 14; i += 0.1) {
		d4.push([ i, Math.sqrt(i * 10) ]);
	}

	var d5 = [];
	for ( var i = 0; i < 14; i += 0.5) {
		d5.push([ i, Math.sqrt(i) ]);
	}

	var d6 = [];
	for ( var i = 0; i < 14; i += 0.5 + Math.random()) {
		d6.push([ i, Math.sqrt(2 * i + Math.sin(i) + 5) ]);
	}

	$.plot("#index2_body", [ {
		data : d1,
		lines : {
			show : true,
			fill : true
		}
	}, {
		data : d2,
		bars : {
			show : true
		}
	}, {
		data : d3,
		points : {
			show : true
		}
	}, {
		data : d4,
		lines : {
			show : true
		}
	}, {
		data : d5,
		lines : {
			show : true
		},
		points : {
			show : true
		}
	}, {
		data : d6,
		lines : {
			show : true,
			steps : true
		}
	} ]);
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
		
		if(true)
			$("#i5_4").html("<div class='orange_s'>"+value+"</div>");
		else
			$("#i5_4").html("<div class='orange_l'>"+value+"</div>");
		
	})
}