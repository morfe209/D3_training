var width = 500;
var height = 500;
var padding = 30;

// var yMax = d3.max(birthData2011, d =>
// 	d.lifeExpectancy); 
// var yMin = d3.min(birthData2011, d =>
// 	d.lifeExpectancy); 
//            /\
//			  ||	
// The same d3.extend 

var yScale = d3.scaleLinear()
				.domain(d3.extent(birthData2011, d => d.lifeExpectancy))
				.range([height-padding, padding]);

var xScale = d3.scaleLinear()
				.domain(d3.extent(birthData2011, d => d.births/d.population))
				.range([padding, width-padding])
var colorScale = d3.scaleLinear()
				.domain(d3.extent(birthData2011, d => d.population/d.area))
				.range(['lightgreen', 'black'])
var radiusScale = d3.scaleLinear()
				.domain(d3.extent(birthData2011, d => d.births))
				.range([2, 40])

var xAxise = d3.axisBottom(xScale)
				.tickSize(-height+2*padding)
				.tickSizeOuter(0);

var yAxise = d3.axisLeft(yScale)
				.tickSize(-width+2*padding)
				.tickSizeOuter(0);

 //<circle cx="50" cy="50" r="40" stroke="green" stroke-width="4" fill="yellow" />
d3.select('svg')
	.append('g')
	.attr('transform', "translate(0,"+(height-padding)+")")
	.call(xAxise);
	
d3.select('svg')
	.append('g')
	.attr('transform', "translate("+padding+", 0)")
	.call(yAxise);

d3.select("svg")
		.attr('width', width)
		.attr('height', height)
	.selectAll("circle")
	.data(birthData2011)
	.enter()
	.append('circle')
		.attr('cy', d => yScale(d.lifeExpectancy))
		.attr('cx', d => xScale(d.births/d.population))
		.attr('r', d => radiusScale(d.births))
		.attr('fill', d => colorScale(d.population/d.area));

d3.select('svg')
	.append('text')
		.attr('x', width/2)
		.attr('y', height-padding)
		.attr('dy', "1.5em")
			.style("text-anchor", "middle")
		.text("Birth per Capita");

d3.select('svg')
	.append('text')
		.attr('x', width/2)
		.attr('y', padding)
			.style('font-size', "1.5em")
			.style("text-anchor", "middle")
		.text("Data on Births by Country in 2011");

d3.select('svg')
	.append('text')
		.attr("transform","rotate(-90)")
		.attr('x', -height/2)
		.attr('y', padding)
		.attr('dy', "-1.1em")
			.style("text-anchor", "middle")
		.text("Life Expectacy");

