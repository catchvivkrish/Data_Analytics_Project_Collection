// from data.js
var ufoData = data;

// select the table body
var tbody = d3.select("tbody");
// display all ufo data on page load
ufoData.forEach( (ufo_data) => {
    var row = tbody.append('tr')
    Object.entries(ufo_data).forEach (([key,value]) => {
    var col = row.append('td')
    col.text(value)
    })
})

var submit = d3.select('#filter-btn')

submit.on('click', function() {
 // Prevent the page from refreshing
 d3.event.preventDefault();
 // Select the filter_date and get the raw HTML node
 var filter_date = d3.select('#datetime');
 // Get the value property of the input element
 var filter_date_value = filter_date.property("value");
 // Filter the data from orignal data set based on the date entered by the user
 var filtered_data = ufoData.filter((value) => value.datetime === filter_date_value)

 if (filter_date_value !== ''){
    if (filtered_data.length>0){
    // select the table body
    var tbody = d3.select("tbody");
    // clear the table body before displaying filtered result
    tbody.html('')
    // Displaying filtered result
    filtered_data.forEach( (data) => {
        var row = tbody.append('tr')
        Object.entries(data).forEach (([key,value]) => {
        var col = row.append('td')
        col.text(value)
        })
    })
    }
    else {
    // select the table body
    var tbody = d3.select("tbody");
    // clear the table body before displaying filtered result
    tbody.html('<p>No data present for the date entered. Please try a different date</p>')
    }
}
    else {
        // select the table body
        var tbody = d3.select("tbody");
        // clear the table body before displaying filtered result
        tbody.html('')
        // display all ufo data on page load
        ufoData.forEach( (ufo_data) => {
        var row = tbody.append('tr')
        Object.entries(ufo_data).forEach (([key,value]) => {
        var col = row.append('td')
        col.text(value)
        })
    })

    }

})

var clear = d3.select('#filter-btn-clear')
clear.on('click',function() {
     // Prevent the page from refreshing
    d3.event.preventDefault();
    var tbody = d3.select("tbody");
    // display all ufo data on page load
    // clear the table body before displaying filtered result
    tbody.html('')
    ufoData.forEach( (ufo_data) => {
        var row = tbody.append('tr')
        Object.entries(ufo_data).forEach (([key,value]) => {
        var col = row.append('td')
        col.text(value)
        })
    })
    // Set the value property of the filter_date to blank
    d3.select('#datetime').property('value', '')
})