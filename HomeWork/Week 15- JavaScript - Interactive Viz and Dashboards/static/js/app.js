function buildMetadata(sample) {
	// Create a reference to the dropdown select element
	var selector = d3.select("#sample-metadata")
	// Clear the data under the html id 'sample-metadata'
	selector.html('')
	// Obtain the metadata of the sample chosen by the user from the flask route '/metadata' 
	d3.json(`/metadata/${sample}`).then((sampleMetadata)=> {
		Object.entries(sampleMetadata).forEach(([key,value]) => {
			selector.append('p').text(`${key}:${value}`)
		})
		
		// Gague Plot logic:
		// Obtain the wash frequency from the sample's metadata
		var wash_freq  = sampleMetadata['WFREQ']
		// Trig to calc meter point
		var degrees = 180 - (wash_freq*20),
			radius = .5
		var radians = degrees * Math.PI / 180
		var x = radius * Math.cos(radians)
		var y = radius * Math.sin(radians)
		// Path for the gague
		var mainPath = 'M -.0 -0.025 L .0 0.025 L ',
			pathX = String(x),
			space = ' ',
			pathY = String(y),
			pathEnd = ' Z'
		var path = mainPath.concat(pathX,space,pathY,pathEnd)
		// plot the gague chart
		var data = [
			{   type: 'scatter',
				x: [0], y:[0],
				marker: {size: 12, color:'850000'},
				showlegend: false,
				name: 'Wash_Freq',
				text: wash_freq,
				hoverinfo: 'text+name'
			},
			{	values: [48/9, 48/9, 48/9, 48/9, 48/9, 48/9, 48/9, 48/9, 48/9, 48],
				rotation: 90,
				text: ['8-9', '7-8', '6-7', '5-6', '4-5', '3-4', '2-3', '1-2', '0-1', ''],
				textinfo: 'text',
				textposition:'inside',
				marker: {colors:['rgba(0, 105, 11, .5)', 'rgba(10, 120, 22, .5)',
						'rgba(14, 127, 0, .5)', 'rgba(110, 154, 22, .5)',
						'rgba(170, 202, 42, .5)', 'rgba(202, 209, 95, .5)',
						'rgba(210, 206, 145, .5)', 'rgba(232, 226, 202, .5)',
						'rgba(240, 230, 215, .5)', 'rgba(255, 255, 255, 0)']},
				labels: ['8-9', '7-8', '6-7', '5-6', '4-5', '3-4', '2-3', '1-2', '0-1', ''],
				hoverinfo: 'label',
				hole: .5,
				type: 'pie',
				showlegend: false
			}
		]
		var layout = {
			shapes:[{
				type: 'path',
				path: path,
				fillcolor: '850000',
				line: {
					color: '850000'
				}
			}],
			title:'<b>Belly Button Washing Frequency</b> <br> Scrubs per Week',
			height: 500,
			width: 500,
			xaxis: {zeroline:false, showticklabels:false,
						 showgrid: false, range: [-1, 1]
			},
			yaxis: {zeroline:false, showticklabels:false,
						 showgrid: false, range: [-1, 1]
			},
			paper_bgcolor: 'rgba(0,0,0,0)',
			plot_bgcolor: 'rgba(0,0,0,0)',
		}
		Plotly.newPlot('gauge', data, layout)
	})
}
 
function buildCharts(sample) {
   // Obtain the data of the first sample from the flask route '/samples'
	d3.json(`/samples/${sample}`).then(function (data){
		//slice out the top 10 values of the data
		var otu_ids_top_10 = data.otu_ids.slice(0,10)
		var sample_vales_top_10 = data.sample_values.slice(0,10)
		var otu_labels_top_10 = data.otu_labels.slice(0,10)
		//Build a pie chart
		var trace1 = {
			labels: otu_ids_top_10,
			values: sample_vales_top_10,
			type:"pie",
			direction : 'clockwise',
			text: otu_labels_top_10,
			textinfo: 'percent'
		}
		var data1 = [trace1]
		var layout1 = {
						title: "Distribution of top 10 samples for selected sample",
						margin:{t:50},
						paper_bgcolor: 'rgba(0,0,0,0)',
						plot_bgcolor: 'rgba(0,0,0,0)'	
		}
		Plotly.plot("pie", data1, layout1)
		
		//Build a bubble chart		
		var trace2 = {
			x: data.otu_ids,
			y: data.sample_values,
			text: data.otu_labels,
			mode:'markers',
			marker:{
				color: data.otu_ids,
				size: data.sample_values,
				colorscale:"Earth"
			}
		}
		var data2 = [trace2]
		var layout2 = {
						margin:{t:0},
						hovermode:"closest",
						xaxis: {title: "OTU ID"},
						paper_bgcolor: 'rgba(0,0,0,0)',
						plot_bgcolor: 'rgba(0,0,0,0)'
		}
		Plotly.plot("bubble",data2, layout2)
	})
}


function updateCharts(newSample) {
	// Obtain the data of the sample chosen by the user from the flask route '/samples' 
	d3.json(`/samples/${newSample}`).then(function (data){
		//slice out the top 10 values of the data
		var otu_ids_top_10 = data.otu_ids.slice(0,10)
		var sample_vales_top_10 = data.sample_values.slice(0,10)
		var otu_labels_top_10 = data.otu_labels.slice(0,10)
		
		//replace the pie chart with a new pie chart having new data points
		var PIE = document.getElementById("pie")
		Plotly.restyle(PIE, "values", [sample_vales_top_10])
		Plotly.restyle(PIE, "labels", [otu_ids_top_10])
		Plotly.restyle(PIE, "text", [otu_labels_top_10])
		
		//replace the bubble chart with a new bubble chart having new data points
		var BUBBLE = document.getElementById("bubble")
		Plotly.restyle(BUBBLE, "y", [data.sample_values])
		Plotly.restyle(BUBBLE, "x", [data.otu_ids])
		Plotly.restyle(BUBBLE, "text", [data.otu_labels])
	})
}

function init() {
  // Create a reference to the dropdown select element
  var selector = d3.select("#selDataset")

  // Obtain the list of sample names from the flask route '/names' and populate it in the html page
  d3.json("/names").then((sampleNames) => {
		sampleNames.forEach((sample) => {
			selector.append("option").text(sample).property("value", sample)
		})
		// Use the first sample from the drop down list to build the chart, gague and metadata information
		const firstSample = sampleNames[0]
		// Call the updateCharts and buildMetadata functions each time data is changed in the dropdown
		buildCharts(firstSample)
		buildMetadata(firstSample)
  })
}

function optionChanged(newSample) {
  // Call the updateCharts and buildMetadata functions each time data is changed in the dropdown
  updateCharts(newSample)
  buildMetadata(newSample)
}

// Initialize the inti function
init()
