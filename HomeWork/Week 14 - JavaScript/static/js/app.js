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
// Obrain the row count of the filtered data and print on screen
var record_count = CountRows()
document.getElementById("row-count").innerHTML = "Total records found: " + record_count;
}

// function filter(type,val) {
//     console.log(type)
//     console.log(val)
//     console.log(ufoData)
//     var fil = ufoData.filter(value => value.type === val)
//     console.log(fil)
//    // console.log(filtered_data)
// }

//Display all data on page loan
display(ufoData)
//Take action on click on submit
var submit = d3.select('#filter-btn')
submit.on('click', function() {
    // Prevent the page from refreshing
    d3.event.preventDefault();
    // Obtain the filter type
    var filter_type = d3.select('#filter_type').property('value')
    // Obtain the filter value
    var filter_value = d3.select('#filter_value').property("value")
    // check the type of filter and apply the respective filter on the base dataset
    if (filter_type === 'date'){
       var filtered_data = ufoData.filter((value) => value.datetime === filter_value)
    }
    else if(filter_type === 'city'){
        var filtered_data = ufoData.filter((value) => value.city === filter_value)
    }
    else if(filter_type === 'state'){
        var filtered_data = ufoData.filter((value) => value.state === filter_value)
    }
    else if(filter_type === 'country'){
        var filtered_data = ufoData.filter((value) => value.country === filter_value)
    }
    else if (filter_type === 'shape'){
        var filtered_data = ufoData.filter((value) => value.shape === filter_value)
    }
    else {
        // Set the value property of the filter_date to blank
        d3.select('#filter_value').property('value', '')
        // Show the full data set
        var filtered_data = ufoData
    }
    // check if filtered date is empty
    if (filter_value !== ''){
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
    d3.select('#filter_value').property('value', '')
})

function CountRows() {
    var totalRowCount = 0;
    var rowCount = 0;
    var table = document.getElementById("ufo-table");
    var rows = table.getElementsByTagName("tr")
    for (var i = 0; i < rows.length; i++) {
        totalRowCount++;
        if (rows[i].getElementsByTagName("td").length > 0) {
            rowCount++;
        }
    }
    return rowCount
}