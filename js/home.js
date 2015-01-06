$(function(){
	set_i2();
	set_runway(60,70,75,55,36);
	
});
function set_runway(run0,run1,run2,run3,run4){
	var runwayColor=["#949adc","#cbad89","#79b89e","#e99e4a","#cfd75a","#646464"];
    var  r = Raphael("holder", 480, 480),
     R = 227,
     init = true,
      param = {stroke: "#646464", "stroke-width": 25},
	  
      hash = document.location.hash,
        marksAttr = {fill: hash || "#444", stroke: "none"},
		path;
    // Custom Attribute
	
    r.customAttributes.arc = function (value, total, R,i) {
		total=100;
		var percent=value/total;
		var path;
		
		if(percent<0.25&&percent>=0){
		 path = [["M", 33, 240 - R], ["L",240*percent/0.25 , 240 - R]];
		
		}else if(percent>=0.25&&percent<=0.75){
		
        var alpha = 360 * percent,
            a = (90 - alpha) * Math.PI / 180,
            x = 240 + R * Math.cos(a),
            y = 240 - R * Math.sin(a),
			endX=(percent-0.25)/0.25*R;
           // color = "hsb(".concat(Math.round(R) / 200, ",", value / total, ", .75)"),
            path = [["M", 33, 240 - R], ["L", 240, 240 - R], ["A", R, R, 0, +(alpha > 180), 1, x, y]];
        
		}else if(percent<=1&&percent>0.75){
		 var alpha = 360 * 0.75,
            a = (90 - alpha) * Math.PI / 180,
            x = 240 + R * Math.cos(a),
            y = 240 - R * Math.sin(a),
			endY=240-(percent-0.75)/0.25*75;
			
		path = [["M", 33, 240 - R], ["L", 240, 240 - R], ["A", R, R, 0, 1, 1, x, y]];
		path.push(["L",x,endY]);
		}
        return {path: path, stroke: runwayColor[i]};
    };

   var runway0bg=r.path().attr(param).attr({arc: [0, 100, R,5]});
    var runway0 = r.path().attr(param).attr({arc: [0, 100, R,0]});
	
    R -= 33;
  var runway1bg=r.path().attr(param).attr({arc: [0, 100, R,5]});
    var runway1 = r.path().attr(param).attr({arc: [0, 100, R,1]});
	
    R -= 33;
 var runway2bg=r.path().attr(param).attr({arc: [0, 100, R,5]});
    var runway2 = r.path().attr(param).attr({arc: [0, 100, R,2]});
	
    R -= 33;
 var runway3bg=r.path().attr(param).attr({arc: [0, 100, R,5]});
    var runway3 = r.path().attr(param).attr({arc: [0, 100, R,3]});
	
    R -= 33;
var runway4bg=r.path().attr(param).attr({arc: [0, 100, R,5]});
    var runway4 = r.path().attr(param).attr({arc: [0, 100, R,4]});
	
    //var pm = r.circle(300, 300, 16).attr({stroke: "none", fill: Raphael.hsb2rgb(15 / 200, 1, .75).hex});
    //html[5].style.color = Raphael.hsb2rgb(15 / 200, 1, .75).hex;

	function getPath(percent){
	
	
	}
	
    function updateVal(value, total, R, hand, id) {
        
	if (init) {
            hand.animate({arc: [value, total, R,id]}, 900, ">");
        } 
	/*	
		else {
            if (!value || value == total) {
                value = total;
                hand.animate({arc: [value, total, R]}, 750, "bounce", function () {
                    hand.attr({arc: [0, total, R]});
                });
            } else {
                hand.animate({arc: [value, total, R]}, 750, "elastic");
            }
        }*/
        
    }

    function drawMarks(R, total) {
        total=100;
		/*
        var color = "hsb(".concat(Math.round(R) / 200, ", 1, .75)"),
            out = r.set();
        
        return out;
		*/
    }

    (function () {
       updateVal(100, 100, 227, runway0bg, 5);
        updateVal(run0, 100, 227, runway0, 0);
		 updateVal(100, 100, 194, runway1bg, 5);
        updateVal(run1, 100, 194, runway1, 1);
		updateVal(100, 100, 161, runway2bg, 5);
        updateVal(run2, 100, 161, runway2, 2);
		updateVal(100, 100, 128, runway3bg, 5);
        updateVal(run3, 100, 128, runway3, 3);
		 updateVal(100, 100, 95, runway4bg, 5);
        updateVal(run4, 100, 95, runway4, 4);
       
        
		//调用自身
        //setTimeout(arguments.callee, 1000);
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