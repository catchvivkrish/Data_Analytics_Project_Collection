var svg_width = 960;
var svg_height = 500;

var margin = {
	top: 20,
	right: 40,
	bottom: 80,
	left: 100
}

var width = svg_width - margin.left - margin.right
var height = svg_height = margin.top - margin.bottom
	
// Chart Params

// SVG wrapper, and shift the latter by left and top margins.
var svg = d3.select(".scatter")
		    .append("svg")
			.attr("width",svg_width)
			.attr("height",svg_height)

// Appending an SVG group that will hold our chart
var svgGroup =  svg.append("g")
				   .attr("transform",`translate(${margin.left},${margin.top})`)

console.log('hello')			   
d3.csv("data1.csv", function(err, census_data) {
  if (err) throw err;

  // parse data
  // census_data.forEach(function(data) {
    // data.poverty = +data.poverty;
    // data.healthcare = +data.healthcare;
	// console.log(data.poverty)
	// // console.log(data.healthcare)
  // });
})

// Importing data from the external CSV file
// d3.csv("data.csv").then(function(err,census_data) {
	// console.log(census_data)
	// if (err) throw err;
	// // Format the data
	// census_data.forEach(function(data) {
		// data.poverty = +data.poverty;
		// console.log(data.poverty)
		// // data.povertyMoe = parseFloat(data.povertyMoe)
		// // data.age = parseFloat(data.age)
		// // data.ageMoe = parseFloat(data.ageMoe)
		// // data.income = data.income
		// // data.incomeMoe = +data.incomeMoe
		// data.healthcare = +data.healthcare;
		// console.log(data.healthcare)
		// // data.healthcareLow = +data.healthcareLow
		// // data.healthcareHigh = +data.healthcareHigh
		// // data.obesity = +data.obesity
		// // data.obesityLow = +data.obesityLow
		// // data.obesityHigh = +data.obesityHigh
		// // data.smokes = +data.smokes
		// // data.smokesLow = +data.smokesLow
		// // data.smokesHigh = +data.smokesHigh
	// })
	
	
	// // // Scaling functions
	// // var xScale = d3.scaleLinear()
				   // // .domain([0,width])
				   // // .range([d3.extent(data.poverty)])
	
	// // var yScale = d3.scaleLinear()
				   // // .domain([0,height])
				   // // .range([d3.extent(data.healthcare)])
	// // // Axis functions
	// // var bottom_axis = d3.axisBottom(xScale)
	// // var left_axis = d3.axisLeft(yScale)
	
	// // // Append Axes to the chart
	// // svgGroup.append('g')
		    // // .attr("transform", `translate(0,${height})`)
			// // .call(bottom_axis)
			
	// // svgGroup.append('g')
		    // // .attr("transform", `translate(0,${height})`)
			// // .call(left_axis)
	
	
	// // // Circle generators
	// // var circles = svgGroup.selectAll("circle")
						  // // .data(census_data)
						  // // .enter()
						  // // .append('circle')
						  // // .attr("cx", data => xScale(data.poverty))
						  // // .attr("cy", data => yScale(data.healthcare))
						  // // .attr('r','15')
						  // // .attr('fill','pink')
	
	
	// // // ToolTip
	// // var tool_tip = d3.tip()
					 // // .attr("class","d3-tip")
					 // // .offset([80,-60])
					 // // .html(function(data) {
						 // // return (`State:${data.state}<br>Poverty%:${data.poverty}<br>%Lacks Healthcare%:${data.healthcare}%`)
					 // // })
	
	// // // Create tooltip in the chart
	// // svgGroup.call(tool_tip)
	
	// // // Create event listeners to display and hide the tooltip
	// // circles.on("click", function(data) {
			// // tool_tip.show(data,this)
		   // // })
	// // circles.on('mouseout', function(data){
		   // // tool_tip.hide(data)
		   // // })
	// // //Create axes labels
    // // svgGroup.append("text")
      // // .attr("transform", "rotate(-90)")
      // // .attr("y", 0 - margin.left + 40)
      // // .attr("x", 0 - (height / 2))
      // // .attr("dy", "1em")
      // // .attr("class", "aText")
      // // .text("Lacks Healthcare (%)")

    // // svgGroup.append("text")
      // // .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
      // // .attr("class", "aText")
      // // .text("In Poverty (%)")
	  
// })



