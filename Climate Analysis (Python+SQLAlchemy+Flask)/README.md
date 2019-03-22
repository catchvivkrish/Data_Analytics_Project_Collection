# Climate Analysis and Exploration(Python+SQLAlchemy+Flask+Matplotlib)

**Objective:**
Climate analysis on Honolulu, Hawaii!.
![surfs-up.jpeg](Images/surfs-up.jpeg)

**Solution / Approach**

# Technology / Framework
* Python
* SQLAlchemy
* Pandas
* Matplotlib
* sqlite

# Analysis

### Precipitation Analysis
* Designed a query to retrieve the last 12 months of precipitation data
* Selected only the `date` and `prcp` values
* Loaded the query results into a Pandas DataFrame and set the index to the date column
* Sorted the DataFrame values by `date`
* Plotted the results using the DataFrame `plot` method
* Used Pandas to print the summary statistics for the precipitation data
![precipitation](Images/precipitation.png)

### Station Analysis
* Designed a query to calculate the total number of stations
* Designed a query to find the most active stations
	* Listed the stations and observation counts in descending order
	* Identified which station has the highest number of observations
* Designed a query to retrieve the last 12 months of temperature observation data (tobs)
	* Filtered by the station with the highest number of observations
	* Plotted the results as a histogram with `bins=12`
	![station-histogram](Images/station-histogram.png)
 
### Temperature Analysis
* Used a function called `calc_temps` that will accept a start date and end date in the format `%Y-%m-%d` and return the minimum, average, and maximum temperatures for that range of dates
* Use the `calc_temps` function to calculate the min, avg, and max temperatures for the trip using the matching dates from the previous year (i.e., use "2017-01-01" if the trip start date was "2018-01-01")
* Plotted the min, avg, and max temperature from your previous query as a bar chart
	* Used the average temperature as the bar height
	* Used the peak-to-peak (tmax-tmin) value as the y error bar (yerr)
	![temperature](Images/temperature.png)

### Other Analysis
* Calculated the rainfall per weather station using the previous year's matching dates
* Calculated the daily normals. Normals are the averages for the min, avg, and max temperatures
* Created a function called `daily_normals` that will calculate the daily normals for a specific date. This date string will be in the format `%m-%d`. Used all historic tobs that match that date string
* Created a list of dates for your trip in the format `%m-%d`. Used the `daily_normals` function to calculate the normals for each date string and append the results to a list
	* Load the list of daily normals into a Pandas DataFrame and set the index equal to the date.
	* Use Pandas to plot an area plot (`stacked=False`) for the daily normals.
    ![daily-normals](Images/daily-normals.png)

## Climate App

* Design a Flask API based on the queries that were developed
* Used FLASK to create routes

### Routes
* `/api/v1.0/precipitation`
  * Query for the dates and temperature observations from the last year.
  * Convert the query results to a Dictionary using `date` as the key and `tobs` as the value.
  * Return the JSON representation of your dictionary.

* `/api/v1.0/stations`
  * Return a JSON list of stations from the dataset.

* `/api/v1.0/tobs`
  * Return a JSON list of Temperature Observations (tobs) for the previous year.

* `/api/v1.0/<start>` and `/api/v1.0/<start>/<end>`
  * Return a JSON list of the minimum temperature, the average temperature, and the max temperature for a given start or start-end range.
  * When given the start only, calculate `TMIN`, `TAVG`, and `TMAX` for all dates greater than and equal to the start date.
  * When given the start and the end date, calculate the `TMIN`, `TAVG`, and `TMAX` for dates between the start and end date inclusive.


