#The dataset is composed of two columns: Date and Profit/Losses.
#Your task is to create a Python script that analyzes the records to calculate each of the following:
#The total number of months included in the dataset
#The total net amount of "Profit/Losses" over the entire period
#The average change in "Profit/Losses" between months over the entire period
#The greatest increase in profits (date and amount) over the entire period
#The greatest decrease in losses (date and amount) over the entire period
#  Financial Analysis
#  ----------------------------
#  Total Months: 86
#  Total: $38382578
#  Average  Change: $-2315.12
#  Greatest Increase in Profits: Feb-2012 ($1926159)
#  Greatest Decrease in Profits: Sep-2013 ($-2196167)
#In addition, your final script should both print the analysis to the terminal and export a text file with the results.

def main():
    import os
    import csv
    import sys
    csvpath = os.path.join("budget_data.csv")
    total_months = int(0)
    total_profits = int(0)
    list = []
    list2 = []
    line_average = []
    with open(csvpath, newline="") as csvfile:
        csvreader = csv.reader(csvfile, delimiter=",")
        if csv.Sniffer().has_header(open(csvpath).read(1024)):
            next(csvreader)
        #list = [row[1] for row in csvreader]
        #list.remove('Profit/Losses')
        for row in csvreader:
            total_months += 1
            total_profits = total_profits + int(row[1])
            list.append(row[1])
            list2.append(row[0])

        for item in range(len(list)-1):
            average = (int(list[item+1])-int(list[item]))
            line_average.append(average)
        final_average = sum(line_average)/len(line_average)
        final_average = round(final_average,2)

        print("Financial Analysis")
        print("----------------------------")
        print ("Total Months: " + str(total_months))
        print ("Total Profit: " + str(total_profits))
        print ("Average  Change:" + str(final_average))
        print("Greatest Increase in Profits: " + str(list2[line_average.index(max(line_average))+1]) + " " +
              str(max(line_average)))
        print("Greatest Decrease in Profits: " + str(list2[line_average.index(min(line_average))+1]) + " " +
              str(min(line_average)))

        sys.stdout = open('PyBank_Results.txt', 'w')
        print("Financial Analysis")
        print("----------------------------")
        print("Total Months: " + str(total_months))
        print("Total Profit: " + str(total_profits))
        print("Average  Change:" + str(final_average))
        print("Greatest Increase in Profits: " + str(list2[line_average.index(max(line_average)) + 1]) + " " +
              str(max(line_average)))
        print("Greatest Decrease in Profits: " + str(list2[line_average.index(min(line_average)) + 1]) + " " +
              str(min(line_average)))
        sys.stdout.close()
main()