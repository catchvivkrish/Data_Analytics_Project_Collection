# Data Journalism (HTML+JavaScript+D3-SVG)

**Objective:**
Identify correlation  between health risks and demographics. The data set used in this project is based on 2014 ACS 1-year estimates:[https://factfinder.census.gov/faces/nav/jsf/pages/searchresults.xhtml](https://factfinder.census.gov/faces/nav/jsf/pages/searchresults.xhtml)

**Live link:**
[Data Journalism ](https://catchvivkrish.github.io/D3_JS/)

**Solution / Approach**
* Make a graphic where D3 lets the user interact with the data
* Created and situated the axes and labels to the left and bottom of the chart.
* Included state abbreviations in the circles
* Included more demographics and more risk factors in the x and y axis to enable user to pick the combination of demographics vs risk factors to plot and analyze. 
* Animated the transitions for your circles' locations as well as the range of your axes
* Bound all of the CSV data to the circles so we can easily determine their x or y values when you click the labels
* Added tool tips using d3-tip.js plugin

# Technology / Framework
* HTML
* CSS
* JavaScript
* D3.js
* d3-tip.js

# Observations:
* A positive correlation between poverty levels vs. levels of uninsured individuals.
* A positive correlation between poverty vs. obesity and poverty vs. smoking levels.
* A negative correlation between all three outcomes (uninsured individuals, obesity & smoking levels) vs. median household income.
* No obvious correlation between obesity vs. median age or smoking levels vs. median age. 5. A weak negative correlation between uninsured individuals vs. median age.
* The smoking percentage shows a positive correlation vs. median age, as older populations appear to smoke more.
* No obvious correlation between median age and obesity rates.
* Texas had the highest uninsured rate while Massachusetts had the least. 
* West Virginia, Kentucky and Arkansas are the top 3 states with the highest smoking levels. 
* Utah has the lowest percentage of smokers among all states. Utah is also the youngest state by median age, and smoking percentage does tend to decrease with a younger population.
* Arkansas, West Virginia and Mississippi are the top 3 states with the highest obesity levels. 
* Colorado, Washington DC and Hawaii are the top 3 states with the lowest obesity levels.

# Screenshot of the output / webpage built
![png](Images/webpage.png)


