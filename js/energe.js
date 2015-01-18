$(function() {
	RadarChart.defaultConfig.color = function() {
	};
	RadarChart.defaultConfig.radius = 2;
	var data0 = [ {
		className : 'air',
		axes : [ {
			axis : "1F",
			value : 6
		}, {
			axis : "5F",
			value : 7
		}, {
			axis : "4F",
			value : 3
		}, {
			axis : "3F",
			value : 4
		}, {
			axis : "2F",
			value : 9
		} ]
	}, {
		className : 'plugin',
		axes : [ {
			axis : "1F",
			value : 6
		}, {
			axis : "5F",
			value : 7
		}, {
			axis : "4F",
			value : 6.4
		}, {
			axis : "3F",
			value : 6
		}, {
			axis : "2F",
			value : 9
		} ]
	}, {
		className : 'light', // optional can be used for styling
		axes : [ {
			axis : "1F",
			value : 5
		}, {
			axis : "5F",
			value : 6
		}, {
			axis : "4F",
			value : 5
		}, {
			axis : "3F",
			value : 9
		}, {
			axis : "2F",
			value : 2
		} ]
	} ];
	var data1 = [ {
		className : 'radar4', // optional can be used for styling
		axes : [ {
			axis : "1F",
			value : 13
		}, {
			axis : "5F",
			value : 6
		}, {
			axis : "4F",
			value : 5
		}, {
			axis : "3F",
			value : 9
		}, {
			axis : "2F",
			value : 2
		} ]
	}, {
		className : 'radar5',
		axes : [ {
			axis : "1F",
			value : 6
		}, {
			axis : "5F",
			value : 7
		}, {
			axis : "4F",
			value : 10
		}, {
			axis : "3F",
			value : 13
		}, {
			axis : "2F",
			value : 9
		} ]
	} ];

	function dataSet() {
		return data0.map(function(d) {
			return {
				className : d.className,
				axes : d.axes.map(function(axis) {
					var a = Math.ceil(Math.random() * 10);
					console.log(a);
					return {
						axis : axis.axis,
						value : a
					};
				})
			};
		});
	}
	var chart = RadarChart.chart();
	var cfg = chart.config(); // retrieve default config
	var svg = d3.select('#radar0').append('svg').attr('width', cfg.w).attr(
			'height', cfg.h);
	svg.append('g').classed('single', 1).datum(data0).call(chart);
	var svg2 = d3.select('#radar1').append('svg').attr('width', cfg.w).attr(
			'height', cfg.h);
	svg2.append('g').classed('single', 1).datum(data1).call(chart);
})