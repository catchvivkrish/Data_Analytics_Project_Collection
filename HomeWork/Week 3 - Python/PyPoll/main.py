#You will be give a set of poll data called election_data.csv. The dataset is composed of three columns: Voter ID, County, and Candidate.
# Your task is to create a Python script that analyzes the votes and calculates each of the following:
#The total number of votes cast
#A complete list of candidates who received votes
#The percentage of votes each candidate won
#The total number of votes each candidate won
#The winner of the election based on popular vote.

#As an example, your analysis should look similar to the one below:
#  Election Results
#  -------------------------
#  Total Votes: 3521001
#  -------------------------
#  Khan: 63.000% (2218231)
#  Correy: 20.000% (704200)
#  Li: 14.000% (492940)
#  O'Tooley: 3.000% (105630)
#  -------------------------
#  Winner: Khan
#  -------------------------

def main():
    import os
    import csv
    import sys
    csvpath = os.path.join("election_data.csv")
    total_votes = int(0)
    list1 = {}

    with open(csvpath, newline="") as csvfile:
        csvreader = csv.reader(csvfile, delimiter=",")
        if csv.Sniffer().has_header(open(csvpath).read(1024)):
            next(csvreader)
        for row in csvreader:
            total_votes += 1
            if row[2] not in list1:
                list1[row[2]] = 1
            else:
                list1[row[2]] += 1
        print("Election Results")
        print("----------------------------")
        print ("Total Votes: " + str(total_votes))
        print("----------------------------")
        list2 = list(list1.keys())
        list3 = list(list1.values())

        for item in range(len(list2)):
            perc = round(((list3[item]/sum(list3))*100),2)
            print(str(list2[item]) + ": " +str(perc) + "%" + " (" + str(list3[item]) + ")")
        print("----------------------------")
        print("Winner: "+ str(list2[list3.index(max(list3))]))
        print("----------------------------")

        sys.stdout = open('PyPoll_Results.txt', 'w')
        print("Election Results")
        print("----------------------------")
        print ("Total Votes: " + str(total_votes))
        print("----------------------------")
        list2 = list(list1.keys())
        list3 = list(list1.values())

        for item in range(len(list2)):
            perc = round(((list3[item]/sum(list3))*100),2)
            print(str(list2[item]) + ": " +str(perc) + "%" + "(" + str(list3[item]) + ")")
        print("----------------------------")
        print("Winner: "+ str(list2[list3.index(max(list3))]))
        print("----------------------------")
        sys.stdout.close()
main()