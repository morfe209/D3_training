// var regionData = {
//     "region": "Afghanistan",
//     "subscribersPer100": 60,
//     "adultLiteracyRate": null,
//     "growthRate": -2.4,
//     "urbanPopulationRate": 24,
//     "extremePovertyRate": null,
//     "medianAge": 16.2
//   }

  var width = 600;
  var height = 600;
  var padding =50;

var data = regionData.filter(mustHaveKeys);

var yScale = d3.scaleLinear()
  					.domain(d3.extent(data, d => d.subscribersPer100))
  					.range([height - padding, padding]);

var xScale = d3.scaleLinear()
  					.domain(d3.extent(data, d => d.adultLiteracyRate))
  					.range([padding, width - padding]); 

var colorScale = d3.scaleLinear()
						.domain(d3.extent(data, d => d.urbanPopulationRate))
						.range(['green', 'blue']);

var radiusScale = d3.scaleLinear()
						.domain(d3.extent(data, d => d.medianAge))
						.range([5, 30]);

var xAxise =d3.axisBottom(xScale)
				.tickSize(-height+2*padding)
				.tickSizeOuter(0);
var yAxise =d3.axisLeft(yScale)
				.tickSize(-width+2*padding)
				.tickSizeOuter(0);
var svg = d3.select('svg')
		.attr('width', width)
		.attr('height',height);


svg.append('g')
	.attr('transform', "translate(0,"+(height-padding)+")")
	.call(xAxise);

svg.append('g')
	.attr('transform', "translate("+padding+", 0)")
	.call(yAxise);

  
svg.selectAll('circle')
	.data(data)
	.enter()
	.append('circle')
		.attr('cx', d => xScale(d.adultLiteracyRate))
		.attr('cy', d => yScale(d.subscribersPer100))
		.attr('r', d => radiusScale(d.medianAge))
		.attr('fill', d => colorScale(d.urbanPopulationRate))
		.attr('stroke', "#fff")

svg.append('text')
		.attr('x', width/2)
		.attr('y', height-padding)
		.attr('dy', padding/2)
			.style("text-anchor", "middle")
		.text('some text')

svg.append('text')
		.attr('x', width/2)
		.attr('y', padding)
			.style('font-size', "1.5em")
			.style("text-anchor", "middle")
		.text('some text')

svg.append('text')
		.attr('transform', 'rotate(-90)')
		.attr('x', -height/2)
		.attr('y', padding)
		.attr('dy', "-1.2em")
			.style("text-anchor", "middle")
		.text('some text')

function mustHaveKeys(obj){
	var keys =[
		"subscribersPer100",
		"adultLiteracyRate",
		"urbanPopulationRate",
		"medianAge"
	]

	for(var i=0; i<keys.length; i++){
		if(obj[keys[i]] ===null) return false;
	}
	return true;
}