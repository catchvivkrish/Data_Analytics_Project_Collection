# CitiBike-Tableau

![Citi-Bikes](Images/citi-bike-station-bikes.jpg)

## Data Preparation
This project analyzes the [New York Citi Bike](https://en.wikipedia.org/wiki/Citi_Bike) Program for the year 2018. Data was downloaded from [CitiBike Trip Data](https://s3.amazonaws.com/tripdata/index.html). 

The data for each month was provided as 1 CSV file. Considering all columns were the same name and order, a union function was used to unio all 12 datasets to create the final dataset. Another way this could have been accomplished is by using Python's and Pandas library to merge all CSVs into one file or using any Relational Database, such as SQL Server, to import the CSV files and export the output into a CSV file. 

## Visualizations and Analysis 

### Total Trips in 2018
![total_trips](total_trips.png)

### Daily Ridership f0r 2018
![daily_ridership](daily_ridership.png)

### Ridership change in 2018
![ridership_change](ridership_change.png)

### Short term subscriber growth vs Annual subscriber growth
![Short_term_vs_Annual_subs](Short_term_vs_Annual_subs.png)

### Monthly Rentals for 2018 
![monthly_rentals](monthly_rentals.png)

### Peak Usage Hours
![peak_hour_usage](peak_hour_usage.png)

### Top 10 starting station by ride count / popularity
![top_10_station](top_10_station.png)

### Bottom 10 starting station by ride count / popularity
![bottom_10_station](bottom_10_station.png)

### Bike Utilization by Station ID based on duration, trip distance and number of rentals
![bike_utilization](bike_utilization.png)

### Bike Utilization by Age based on duration, trip distance and number of rentals
![age_utilization](age_utilization.png)

### Bike Utilization by Gender based on duration, trip distance and number of rentals
![Gender_Utilization](Gender_Utilization.png)

### Average age of renters per station
![age_per_station](age_per_station.png)

### Subscribers and Users
![gender_user_types](gender_user_types.png)


### Starting Station's Popularity Over Time
![starting_station_popularity](starting_station_popularity.png)
	
### Ending Station's Popularity Over Time
![ending_station_popularity](ending_station_popularity.png)