def main():
    import os
    import csv
    csvpath = os.path.join("budget_data.csv")
    txtpath_out = os.path.join("PyBank_Results.txt")
    total_months = int(0)
    total_profits = float(0)
    list = []
    list2 = []
    line_average = []
    with open(csvpath, newline="") as csvfile:
        csvreader = csv.reader(csvfile, delimiter=",")
        if csv.Sniffer().has_header(open(csvpath).read(1024)):
            next(csvreader)
        for row in csvreader:
            total_months += 1
            total_profits = total_profits + float(row[1])
            list.append(row[1])
            list2.append(row[0])

        for item in range(len(list)-1):
            average = (int(list[item+1])-int(list[item]))
            line_average.append(average)
        final_average = sum(line_average)/len(line_average)
        final_average = round(final_average,2)

        print_content = (f"Financial Analysis\n"
                  f"----------------------------\n"
                  f"Total Months: {total_months}\n"
                  f"Total Profit: {total_profits}\n"
                  f"Average  Change: + {final_average}\n"
                  f"Greatest Increase in Profits: {list2[(line_average.index(max(line_average))+1)]} (${max(line_average)}) \n"
                  f"Greatest Increase in Profits: {list2[(line_average.index(min(line_average))+1)]} (${min(line_average)}) \n"
                  )
        print(print_content)

        with open(txtpath_out, 'w') as txtfile:
            txtfile.write(print_content)
main()