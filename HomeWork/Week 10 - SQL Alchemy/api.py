import data
import pandas as pd
from flask import Flask, jsonify, url_for,redirect, request

#################################################
# Flask Setup
#################################################
app = Flask(__name__)

#################################################
# Flask Routes
#################################################

@app.route("/api/v1.0/precipitation")
def precipitation():
    
    return jsonify(data.measurement_station_merged_dict)

@app.route("/api/v1.0/stations")
def stations():
    
    return jsonify(data.most_active_station_dict)

@app.route("/api/v1.0/tobs")
def tobs():
    
    return jsonify(data.USC00519281_tobs_dict)

@app.route("/api/v1.0/<start>")
def start(start):

    max_date = data.max_date
    to_retun = data.calc_temps(start,max_date)

    convert_to_individual = to_retun[0]
    TMIN = convert_to_individual[0]
    TAVG = convert_to_individual[1]
    TMAX = convert_to_individual[2]

    start_date_only_dict = pd.DataFrame({"Temp Min":[TMIN],
                "Temp Max":[TMAX],
                "Temp Average":[TAVG]})

    start_date_only_dict = start_date_only_dict.to_dict()

    return jsonify(start_date_only_dict)

@app.route("/api/v1.0/<start>/<end>")
def start_end(start,end):

    to_retun = data.calc_temps(start,end)

    convert_to_individual = to_retun[0]
    TMIN = convert_to_individual[0]
    TAVG = convert_to_individual[1]
    TMAX = convert_to_individual[2]

    start_end_date_dict = pd.DataFrame({"Temp Min":[TMIN],
                "Temp Max":[TMAX],
                "Temp Average":[TAVG]})
                
    start_end_date_dict = start_end_date_dict.to_dict()
    return jsonify(start_end_date_dict)

@app.route("/api/v1.0/DateQuery/")
def start_end_datequery():
    start = request.args.get('StartDate',default = "2010-01-01")
    end = request.args.get('EndDate',default = '2017-08-23')
    to_retun = data.calc_temps(start,end)

    convert_to_individual = to_retun[0]
    TMIN = convert_to_individual[0]
    TAVG = convert_to_individual[1]
    TMAX = convert_to_individual[2]

    start_end_date_dict = pd.DataFrame({"Temp Min":[TMIN],
                "Temp Max":[TMAX],
                "Temp Average":[TAVG]})
                
    start_end_date_dict = start_end_date_dict.to_dict()
    return jsonify(start_end_date_dict)



@app.route("/")
def welcome():
    return redirect(url_for('static',filename='index.html'))
    
# @app.route("/")
# def welcome():
#     return (
#         f"Welcome to the Homework 8 Flask API<br/>"
#         f"Available Routes:<br>"
#         f"<a href='http://127.0.0.1:5000/api/v1.0/precipitation'>precipitation</a><br>"
#         f"<a href='http://127.0.0.1:5000/api/v1.0/stations'>stations</a><br>"
#         f"<a href='http://127.0.0.1:5000/api/v1.0/tobs'>tobs</tobs></a><br>"
#         f"/api/v1.0/start<br>"
#         f"/api/v1.0/start/end<br>"

#     )

if __name__ == "__main__":
    app.run(debug=False)
