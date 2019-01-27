// from data.js
var ufoData = data;

// create a function to clear table body and load it with the dataset passed to the function
function display(dataset) {
// select the table body
var tbody = d3.select("tbody");
// clear the table body before displaying the dataset
tbody.html('')
// display dataset on page load by inserting one row for each dataset element
dataset.forEach( (dataset) => {
    var row = tbody.append('tr')
    Object.entries(dataset).forEach(([key,value]) => {
    var col = row.append('td')
    col.text(value)
    })
})
}

//Display all data on page loan
display(ufoData)

//Take action on click on submit
var submit = d3.select('#filter-btn')
submit.on('click', function() {
    // Prevent the page from refreshing
    d3.event.preventDefault();
    // Select the filter_date and get the raw HTML node
    var filter_date = d3.select('#datetime');
    // Get the value property of the filter_date
    var filter_date_value = filter_date.property("value");
    // Filter the data from original data set based on the date entered by the user
    var filtered_data = ufoData.filter((value) => value.datetime === filter_date_value)
    // check if filtered date is empty
    if (filter_date_value !== ''){
        // check if record exists in dataset post filtering by date
        if (filtered_data.length>0){
            //call function to print filtered data
            display(filtered_data)
        }
        // if no record exists in dataset post filtering by date
        else {
            // select the table body
            var tbody = d3.select("tbody");
            // clear the table body before displaying a message to the user
            tbody.html('<p>No data present for the date entered. Please try filtering by a different date</p>')
        }
    }
    // if no date is entered then call function to show all data
    else {
        display(ufoData)
    }
})

// Action on click of clear button
var clear = d3.select('#filter-btn-clear')
clear.on('click',function() {
     // Prevent the page from refreshing
    d3.event.preventDefault();
    // call function to show all data 
    display(ufoData)
    // Set the value property of the filter_date to blank
    d3.select('#datetime').property('value', '')
})