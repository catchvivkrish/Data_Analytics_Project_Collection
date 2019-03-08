# Python Basics (Python)

# Poll Data Analysis:

**Objective:**
Modernize vote-counting process. Analyzes the votes using python script
![Vote-Counting](Images/Vote_counting.jpg)

**Solution / Approach**
* Poll data called [election_data.csv](PyPoll/Resources/election_data.csv). The dataset is composed of three columns: `Voter ID`, `County`, and `Candidate`. Python script is used to analyzes the votes and calculate each of the following:
  * The total number of votes cast
  * A complete list of candidates who received votes
  * The percentage of votes each candidate won
  * The total number of votes each candidate won
  * The winner of the election based on popular vote.

# Technology / Framework
* Python

# Output:
  ```text
  Election Results
  -------------------------
  Total Votes: 3521001
  -------------------------
  Khan: 63.000% (2218231)
  Correy: 20.000% (704200)
  Li: 14.000% (492940)
  O'Tooley: 3.000% (105630)
  -------------------------
  Winner: Khan
  -------------------------
  ```

# Bank Data Analysis:
**Objective:**
Analyze the financial records of the company data [budget_data.csv](PyBank/Resources/budget_data.csv).

![Revenue](Images/revenue-per-lead.jpg)

**Solution / Approach**
* The dataset is composed of two columns: `Date` and `Profit/Losses`. Python script is used to analyzes the records and calculate each of the following:
  * The total number of months included in the dataset
  * The total net amount of "Profit/Losses" over the entire period
  * The average change in "Profit/Losses" between months over the entire period
  * The greatest increase in profits (date and amount) over the entire period
  * The greatest decrease in losses (date and amount) over the entire period

# Technology / Framework
* Python

# Output:
  ```text
  Financial Analysis
  ----------------------------
  Total Months: 86
  Total: $38382578
  Average  Change: $-2315.12
  Greatest Increase in Profits: Feb-2012 ($1926159)
  Greatest Decrease in Profits: Sep-2013 ($-2196167)
  ```