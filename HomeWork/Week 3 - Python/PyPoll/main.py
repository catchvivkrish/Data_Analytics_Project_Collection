def main():
    import os
    import csv
    csvpath = os.path.join("election_data.csv")
    txtpath_out = os.path.join("PyPoll_Results.txt")
    total_votes = int(0)
    list1 = {}

    with open(csvpath, newline="") as csvfile:
        csvreader = csv.reader(csvfile, delimiter=",")
        firstline = True
        for row in csvreader:
            if firstline:  # skip first line which is the header
                 firstline = False
                 continue
            total_votes += 1
            if row[2] not in list1:
                list1[row[2]] = 1
            else:
                list1[row[2]] += 1
        list2 = list(list1.keys())
        list3 = list(list1.values())
        print_content1 = (
        f"Election Results\n"
        f"----------------------------\n"
        f"Total Votes: {total_votes}\n"
        f"----------------------------"
        )
        print(print_content1)

        for item in range(len(list2)):
            perc = round(((list3[item]/sum(list3))*100),2)
            print(f"{list2[item]} : {perc} % ({list3[item]})")
        print_content3 = (
        f"----------------------------\n"
        f"Winner: {list2[list3.index(max(list3))]}\n"
        f"----------------------------"
        )
        print(print_content3)

        with open(txtpath_out, 'w') as txtfile:
            txtfile.write(print_content1 + "\n")
            for item in range(len(list2)):
                perc = round(((list3[item]/sum(list3))*100),2)
                txtfile.write(f"{list2[item]} : {perc} % ({list3[item]})\n")
            txtfile.write(print_content3)

main()

