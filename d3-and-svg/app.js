var minYear = d3.min(birthData, function(d){
	return d.year;
});
var maxYear = d3.max(birthData, function(d){
	return d.year;
});
var width = 600;
var height = 600;
var barPadding = 10;
var numBar = 12;
var barWidth = width/numBar - barPadding;
var maxBirth= d3.max(birthData, function(d){
	return d.births;
})

d3.select("input")
	.property("min", minYear)
	.property("max", maxYear)
	.property("value", minYear);


var yScale= d3.scaleLinear()
				.domain([0, maxBirth])
				.range([height, 0]);	

d3.select("svg")
	.attr("width", width)
	.attr("height", height)
	.style('border', '1px solid black')
  .selectAll("rect")
  .data(birthData.filter(function(d){
  	return d.year === minYear;
  }))
  .enter()
  .append('rect')
  	.attr('width', barWidth)
  	.attr('height', function(d){
  		return height-yScale(d.births);
  	})
  	.attr('y', function(d){
  		return yScale(d.births);
  	})
  	.attr('x', function(d, i){
  		return (barWidth+barPadding)*i;
  	})
  	.attr('fill', 'purple');

d3.select("input")
	.on('input', function(){
		var year = +d3.event.target.value;
		d3.selectAll("rect")
			.data(birthData.filter(function(d) {
				return d.year === year;
			}))
				.attr('height', function(d){
			  		return height-yScale(d.births);
			  	})
			  	.attr('y', function(d){
			  		return yScale(d.births);
			  	}); 
	});


