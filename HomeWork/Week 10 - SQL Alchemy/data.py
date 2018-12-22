print("------------------------MAIN DATA BEING IMPORTED------------------------")
from matplotlib import style
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
from datetime import datetime, timedelta
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from sqlalchemy.pool import StaticPool
# engine = create_engine("sqlite:///" + r"C:\Users\nsita\Dropbox\UCB\data-analytics\Homework\Homework 8\Resources\hawaii.sqlite", connect_args={'check_same_thread': False}, echo=True)
engine = create_engine("sqlite:///" + r"C:\Users\catch\Documents\DataAnalytics_GitHub\HomeWork\Week 10 - SQL Alchemy\Resources\hawaii.sqlite",poolclass=StaticPool,connect_args={'check_same_thread':False})

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)
# We can view all of the classes that automap found
Base.classes.keys()
# Save references to each table,
Measurement = Base.classes.measurement
Station = Base.classes.station
# Create our session (link) from Python to the DB
session = Session(engine)
conn = engine.connect()

# Design a query to retrieve the last 12 months of precipitation data and plot the results
# Perform a query to retrieve the data and precipitation scores
# # Save the query results as a Pandas DataFrame and set the index to the date column
# Sort the dataframe by date
# Use Pandas Plotting with Matplotlib to plot the data
max_date = pd.read_sql("select date from measurement",conn)
max_date = max_date.values.tolist()
max_date = max(max_date)
max_date = ''.join(max_date)
year,month,day = max_date.split('-')
days_to_subtract = 365
year_from_max = datetime(int(year),int(month),int(day)) - timedelta(days=days_to_subtract)
year_data = pd.read_sql(f"select * from measurement where date >= '{year_from_max}'",conn)
year_data = year_data[["date","prcp"]]
year_data = year_data.set_index("date")
year_data = year_data.sort_values("date")
year_data.head(20)
year_data.plot(kind="bar", figsize=(20,10), width = 3.5)
plt.xticks(rotation=90)
plt.xlabel("date")
plt.savefig("precipitationgraph.png")


# Use Pandas to calcualte the summary statistics for the precipitation data
year_data.describe()

# How many stations are available in this dataset?
all_data = pd.read_sql("select * from measurement", conn)
nunique = all_data.nunique()
nunique = nunique.to_dict()
nunique['station']

# What are the most active stations?
# List the stations and the counts in descending order.
most_active_station = all_data.groupby("station").count()
most_active_station_dict = most_active_station["id"].sort_values(ascending = False)
most_active_station["id"].sort_values(ascending = False)
most_active_station_dict = pd.DataFrame(most_active_station_dict)
most_active_station_dict = most_active_station_dict.to_dict()
most_active_station_dict

# Using the station id from the previous query, calculate the lowest temperature recorded, 
# highest temperature recorded, and average temperature most active station?
USC00519281 = pd.read_sql("select * from measurement where station = 'USC00519281'",conn)
USC00519281
USC00519281 = USC00519281[["tobs"]]
USC00519281_max = USC00519281.max().tolist()
USC00519281_min = USC00519281.min().tolist()
USC00519281_avg = USC00519281.mean().tolist()
to_list = (USC00519281_min,USC00519281_max,USC00519281_avg)
to_list

# Choose the station with the highest number of temperature observations.
# Query the last 12 months of temperature observation data for this station and plot the results as a histogram
highest_number_temp = all_data[["station","tobs"]]
highest_number_temp = highest_number_temp.groupby("station").count()
highest_number_temp = highest_number_temp.sort_values(by="tobs",ascending=False)
highest_number_temp
USC00519281_tobs = pd.read_sql(f"select date,tobs from measurement where station = 'USC00519281' and date >= '{year_from_max}'",conn)
USC00519281_tobs_dict = USC00519281_tobs.to_dict(orient="records")
USC00519281_tobs_dict
USC00519281_tobs.plot(kind='hist')

# Write a function called `calc_temps` that will accept start date and end date in the format '%Y-%m-%d' 
# and return the minimum, average, and maximum temperatures for that range of dates
def calc_temps(start_date, end_date):
    toreturn = session.query(\
    func.min(Measurement.tobs),\
    func.avg(Measurement.tobs),\
    func.max(Measurement.tobs)).\
    filter(Measurement.date >=start_date).\
    filter(Measurement.date <=end_date).\
    all()
    return toreturn

# Use your previous function `calc_temps` to calculate the tmin, tavg, and tmax 
# for your trip using the previous year's data for those same dates.
max_date = str(max_date)
year_from_max = str(year_from_max.date())
to_bar_chart = calc_temps(year_from_max,max_date)
convert_to_individual = to_bar_chart[0]
TMIN = convert_to_individual[0]
TAVG = convert_to_individual[1]
TMAX = convert_to_individual[2]
tavg_frame = pd.DataFrame({"Trip Avg Temp":[TAVG]})

# Plot the results from your previous query as a bar chart. 
# Use "Trip Avg Temp" as your Title
# Use the average temperature for the y value
# Use the peak-to-peak (tmax-tmin) value as the y error bar (yerr)
tavg_frame.plot(kind="bar",width=.3,yerr=(TMAX-TMIN),figsize=(5,10))
plt.title("Trip Avg Temp")
plt.legend('')
plt.xlabel("Avg Temp")
plt.ylabel("Average Temperature")
plt.tight_layout()
plt.savefig("BarChart.jpg")

# Calculate the rainfall per weather station for your trip dates using the previous year's matching dates.
# Sort this in descending order by precipitation amount and list the station, name, latitude, longitude, and elevation
start_date = '2012-02-28'
end_date = '2012-03-05'

measurement_table = pd.read_sql(f"select * from measurement where date between '{start_date}' and '{end_date}'", conn)
station_table = pd.read_sql('select * from station', conn)
measurement_table = measurement_table[["station","prcp"]]
station_table = station_table[["station","name","latitude","longitude","elevation"]]
measurement_table_grouped = measurement_table.groupby("station").sum()
measurement_table_grouped = measurement_table_grouped.sort_values(by="prcp", ascending=False)
measurement_table_grouped
station_table
measurement_station_merged = measurement_table_grouped.merge(station_table, how='inner',on="station")
measurement_station_merged = measurement_station_merged[["station","name","latitude","longitude","elevation","prcp"]]
measurement_station_merged_dict = measurement_station_merged.to_dict(orient='records')

print("------------------------MAIN DATA FILE IMPORTED AND INTIALIZED------------------------")

