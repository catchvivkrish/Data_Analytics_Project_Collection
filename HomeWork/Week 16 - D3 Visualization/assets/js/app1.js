// function for responsive window
function responsive_window() {

// if the SVG area isn't empty when the browser loads,
// remove it and replace it with a resized version of the chart
var svgArea = d3.select("body").select("svg");

// clear svg is not empty
if (!svgArea.empty()) {
		svgArea.remove();
}

// SVG dimensions are determined by the current width and height of the browser window.
var svg_width = window.innerWidth*0.75;
var svg_height = window.innerHeight*0.75;

//margins to be applied on the SVG object defined
var margin = {
	top: 20,
	right: 60,
	bottom: 100,
	left: 100
}

//final width and height of the svg object
var width = svg_width - margin.left - margin.right
var height = svg_height - margin.top - margin.bottom
	
// Chart Params
// SVG wrapper
var svg = d3.select(".scatter")
		        .append("svg")
			      .attr("width",svg_width)
					  .attr("height",svg_height)

// Appending an SVG group that will hold our chart
var svgGroup = svg.append("g")
			      		  .attr("transform", `translate(${margin.left}, ${margin.top})`);


// Scaling functions
function xScale(census_data, selected_x_axis){
	var xLinearScale = d3.scaleLinear()
											.domain([d3.min(census_data, d => d[selected_x_axis])-(d3.max(census_data, d => d[selected_x_axis])/20),d3.max(census_data, d => d[selected_x_axis])+(d3.max(census_data, d => d[selected_x_axis])/20)])
											.range([0, width])
	return xLinearScale
}

function yScale(census_data, selected_y_axis){
	var yLinearScale = d3.scaleLinear()
											 .domain([d3.min(census_data, d => d[selected_y_axis])-2, d3.max(census_data, d => d[selected_y_axis])+2])
											 .range([height,0])
	return yLinearScale
}

// function used for updating xAxis var upon click on axis label
function create_x_axis(new_x_scale, xAxis){			
	var bottom_axis = d3.axisBottom(new_x_scale)
	xAxis.transition()
			 .duration(1000)
			 .call(bottom_axis)
	return xAxis
}

// function used for updating yAxis var upon click on axis label
function create_y_axis(new_y_scale, yAxis){			
	var left_axis = d3.axisLeft(new_y_scale)
	yAxis.transition()
			 .duration(1000)
			 .call(left_axis)
	return yAxis
}

// function used for rendering circles upon click on xaxis label
function renderCirclesX(circlesGroup,new_x_scale,selected_x_axis){
	circlesGroup.transition()
							.duration(1000)
							.attr("cx", d => new_x_scale(d[selected_x_axis]))
	return circlesGroup
}

// function used for rendering circles upon click on yaxis label
function renderCirclesY(circlesGroup,new_y_scale,selected_y_axis){
	circlesGroup.transition()
							.duration(1000)
					    .attr("cy", d => new_y_scale(d[selected_y_axis]))
	return circlesGroup
}

// function used for rendering text upon click on xaxis label
function renderTextX(textGroup,new_x_scale,selected_x_axis){
	textGroup.transition()
					 .duration(1000)
					 .attr("x", d => new_x_scale(d[selected_x_axis]))
					 .text(d => d.abbr)
	return textGroup
}

// function used for rendering text upon click on yaxis label
function renderTextY(textGroup,new_y_scale,selected_y_axis){
	textGroup.transition()
					 .duration(1000)
					 .attr("y", d => new_y_scale(d[selected_y_axis]))
					 .text(d => d.abbr)
	return textGroup
}

// function to update the tool tip based on the slected x and y axis
function updateToolTip(selected_x_axis, selected_y_axis, circlesGroup, textGroup) {
	var tool_tip = d3.tip()
    							 .attr("class", "d3-tip")
    							 .offset([80, -60])
    							 .html(function(d) {
													return (`${d.state}<br> ${selected_x_axis}: ${d[selected_x_axis]}<br>${selected_y_axis}: ${d[selected_y_axis]}%<br>`)
												})
  circlesGroup.call(tool_tip)
	// onmouse hover event
	circlesGroup.on("mouseover", function(data){
    											 	tool_tip.show(data, this)
														})
	textGroup.on("mouseover", function(data){
	 									tool_tip.show(data, this)
	 	 								})
  // onmouseout event
	circlesGroup.on("mouseout", function(data, index){
      													tool_tip.hide(data, this);
															})
	textGroup.on("mouseout", function(data, index){
		tool_tip.hide(data, this);
	})
  return circlesGroup;
}

// Importing data from the external CSV file
d3.csv("/assets/data/data.csv", function(err, census_data) {
										if (err) throw err;
										// Format the data
										census_data.forEach(function(data) {
																				data.abbr = data.abbr
																				data.poverty = +data.poverty
																				data.povertyMoe = +data.povertyMoe
																				data.age = +data.age
																				data.ageMoe = +data.ageMoe
																				data.income = +data.income
																				data.incomeMoe = +data.incomeMoe
																				data.healthcare = +data.healthcare;
																				data.healthcareLow = +data.healthcareLow
																				data.healthcareHigh = +data.healthcareHigh
																				data.obesity = +data.obesity
																				data.obesityLow = +data.obesityLow
																				data.obesityHigh = +data.obesityHigh
																				data.smokes = +data.smokes
																				data.smokesLow = +data.smokesLow
																				data.smokesHigh = +data.smokesHigh
																				})					
	// Initial Params
	var selected_x_axis  = "poverty"
	var selected_y_axis = "healthcare"

	// xScale function above csv import
	var xLinearScale = xScale(census_data, selected_x_axis);

	// yScale function above csv import
	var yLinearScale = yScale(census_data, selected_y_axis);

	// Create initial axis functions
	var bottom_axis = d3.axisBottom(xLinearScale);
	var left_axis = d3.axisLeft(yLinearScale);

	// append x axis
	var xAxis = svgGroup
								.append("g")
								.attr("transform", `translate(0, ${height})`)
								.call(bottom_axis)

	// append y axis
	var yAxis = svgGroup.append("g")
					.call(left_axis);

	// Circle generator
	var circlesGroup = svgGroup
											.selectAll("circle")
											.data(census_data)
											.enter()
											.append("circle")
											.classed("stateCircle",true)
											.attr("cx", d => xLinearScale(d[selected_x_axis]))
											.attr("cy", d => yLinearScale(d[selected_y_axis]))
											.attr('r','15')
											.attr("opacity", ".9")

	// Text generator
	var textGroup = svgGroup
										.selectAll("text1")
										.data(census_data)
										.enter()
										.append("text")
										.classed("stateText",true)
										.attr("x", d => xLinearScale(d[selected_x_axis]))
										.attr("y", d => yLinearScale(d[selected_y_axis]))
										.text(d => d.abbr)

	// Create axes labels
	// Create group for  3 x- axis labels
	var labelsGroupX = svgGroup
											.append("g")
											.attr("transform", `translate(${width / 2}, ${height + 20})`)

	var label_poverty = labelsGroupX
												.append("text")
												.attr("x", 0)
												.attr("y", 20)
												.attr("value", "poverty") // value to grab for event listener
												.classed("active", true)
												.text("In Poverty (%)")

	var label_age = labelsGroupX
										.append("text")
										.attr("x", 0)
										.attr("y", 40)
										.attr("value", "age") // value to grab for event listener
										.classed("inactive", true)
										.text("Age (Median)")

	var label_hh_income = labelsGroupX
												 .append("text")
												 .attr("x", 0)
												 .attr("y", 60)
												 .attr("value", "income") // value to grab for event listener
												 .classed("inactive", true)
												 .text("Household Income (Median)")


	// Create group for  3 y- axis labels
	var labelsGroupY = svgGroup
											.append("g")
											.attr("transform", "rotate(-90)")

	var label_obese = labelsGroupY
											.append("text")
											.attr("x", 0 - (height / 2))
											.attr("y", 0 - margin.left + 20)
											.attr("dy", "1em")
											.attr("class", "aText")
											.attr("value", "obesity") // value to grab for event listener
											.text("Obese (%)")
											.classed("inactive", true)

	var label_smoke = labelsGroupY
											.append("text")
											.attr("x", 0 - (height / 2))
											.attr("y", 0 - margin.left + 40)
											.attr("dy", "1em")
											.attr("class", "aText")
											.attr("value", "smokes") // value to grab for event listener
											.text("Smokes (%)")
											.classed("inactive", true)

	var label_lack_hc = labelsGroupY
												.append("text")
												.attr("x", 0 - (height / 2))
												.attr("y", 0 - margin.left + 60)
												.attr("dy", "1em")
												.attr("class", "aText")
												.attr("value", "healthcare") // value to grab for event listener
												.text("Lacks Healthcare (%)")
												.classed("active", true)

	// updateToolTip function above csv import
	var circlesGroup = updateToolTip(selected_x_axis, selected_y_axis, circlesGroup, textGroup)

	// x axis labels event listener
	labelsGroupX
		.selectAll("text")
		.on("click", function(){
		// get value of selection
			var value = d3.select(this).attr("value")
			if (value !== selected_x_axis) {
				
				// replaces selected_x_axis with value
				selected_x_axis = value;
				
				// functions here found above csv import
				// updates x scale for new data
				xLinearScale = xScale(census_data, selected_x_axis);
				
				// updates x axis with transition
				xAxis = create_x_axis(xLinearScale, xAxis);
				
				// updates circles with new x values
				circlesGroup = renderCirclesX(circlesGroup, xLinearScale, selected_x_axis);
				
				// updates text with new x values
				textGroup = renderTextX(textGroup, xLinearScale, selected_x_axis)
				
				// updates tooltips with new info
				circlesGroup = updateToolTip(selected_x_axis, selected_y_axis, circlesGroup, textGroup);
				
				// changes classes to change bold text
				if (selected_x_axis === "poverty") {
					label_poverty
						.classed("active", true)
						.classed("inactive", false)
					label_age
						.classed("active", false)
						.classed("inactive", true)
					label_hh_income
						.classed("active", false)
						.classed("inactive", true)
				}
				else if (selected_x_axis === "age") {
					label_poverty
						.classed("active", false)
						.classed("inactive", true)
					label_age
						.classed("active", true)
						.classed("inactive", false)
					label_hh_income
						.classed("active", false)
						.classed("inactive", true)
				}
				else {
					label_poverty
						.classed("active", false)
						.classed("inactive", true)
					label_age
						.classed("active", false)
						.classed("inactive", true)
					label_hh_income
						.classed("active", true)
						.classed("inactive", false)
				}
			}
		})

	labelsGroupY
		.selectAll("text")
		.on("click", function() {
			// get value of selection
			var value = d3.select(this).attr("value");
			if (value !== selected_y_axis) {

				// replaces selected_y_axis with value
				selected_y_axis = value;

				// functions here found above csv import
				// updates y scale for new data
				yLinearScale = yScale(census_data, selected_y_axis);

				// updates y axis with transition
				yAxis = create_y_axis(yLinearScale, yAxis);

				// updates circles with new y values
				circlesGroup = renderCirclesY(circlesGroup, yLinearScale, selected_y_axis);

				// updates text with new y values
				textGroup = renderTextY(textGroup, yLinearScale, selected_y_axis)
				
				// updates tooltips with new info
				circlesGroup = updateToolTip(selected_y_axis, selected_y_axis, circlesGroup, textGroup);

				// changes classes to change bold text
				if (selected_y_axis === "obesity") {
					label_obese
						.classed("active", true)
						.classed("inactive", false)
					label_smoke
						.classed("active", false)
						.classed("inactive", true)
					label_lack_hc
						.classed("active", false)
						.classed("inactive", true)
				}
				else if (selected_y_axis === "smokes") {
					label_obese
						.classed("active", false)
						.classed("inactive", true)
					label_smoke
						.classed("active", true)
						.classed("inactive", false)
					label_lack_hc
						.classed("active", false)
						.classed("inactive", true)
				}
				else {
					label_obese
						.classed("active", false)
						.classed("inactive", true)
					label_smoke
						.classed("active", false)
						.classed("inactive", true)
					label_lack_hc
						.classed("active", true)
						.classed("inactive", false)
				}
			}
		})

})

}
// When the browser loads, responsive_window() is called.
responsive_window();

// When the browser window is resized, responsive_window() is called.
d3.select(window).on("resize", responsive_window);