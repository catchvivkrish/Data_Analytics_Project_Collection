# CitiBike-Tableau

![Citi-Bikes](Images/citi-bike-station-bikes.jpg)

## Data Preparation
This project analyzes the [New York Citi Bike](https://en.wikipedia.org/wiki/Citi_Bike) Program for the year 2018. Data was downloaded from [CitiBike Trip Data](https://s3.amazonaws.com/tripdata/index.html). 

The data for each month was provided as 1 CSV file. Considering all columns were the same name and order, a union function was used to unio all 12 datasets to create the final dataset. Another way this could have been accomplished is by using Python's and Pandas library to merge all CSVs into one file or using any Relational Database, such as SQL Server, to import the CSV files and export the output into a CSV file. Below are some visualization that result in useful information

## Visualizations and Analysis 

### Total Trips in 2018
![total_trips](Images/total_trips.png)

### Daily Ridership f0r 2018
![daily_ridership](Images/daily_ridership.png)

### Ridership change in 2018
![ridership_change](Images/ridership_change.png)

### Short term subscriber growth vs Annual subscriber growth
![Short_term_vs_Annual_subs](Images/Short_term_vs_Annual_subs.png)

### Monthly Rentals for 2018 
![monthly_rentals](Images/monthly_rentals.png)

### Peak Usage Hours
![peak_hour_usage](Images/peak_hour_usage.png)

### Top 10 starting station by ride count / popularity
![top_10_station](Images/top_10_station.png)

### Bottom 10 starting station by ride count / popularity
![bottom_10_station](Images/bottom_10_station.png)

### Bike Utilization by Station ID based on duration, trip distance and number of rentals
![bike_utilization](Images/bike_utilization.png)

### Bike Utilization by Age based on duration, trip distance and number of rentals
![age_utilization](Images/age_utilization.png)

### Bike Utilization by Gender based on duration, trip distance and number of rentals
![Gender_Utilization](Images/Gender_Utilization.png)

### Average age of renters per station
![age_per_station](Images/age_per_station.png)

### Subscribers and Users
![gender_user_types](Images/gender_user_types.png)


### Starting Station's Popularity Over Time
![starting_station_popularity](Images/starting_station_popularity.png)
	
### Ending Station's Popularity Over Time
![ending_station_popularity](Images/ending_station_popularity.png)