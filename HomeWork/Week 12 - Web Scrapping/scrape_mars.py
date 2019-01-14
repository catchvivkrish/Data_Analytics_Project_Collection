#!/usr/bin/env python
# coding: utf-8

# In[71]:


from splinter import Browser
from bs4 import BeautifulSoup
from selenium import webdriver
import pandas as pd
import time


# In[4]:


def init_browser():
    executable_path = {'executable_path': 'chromedriver.exe'}
    return Browser("chrome", **executable_path, headless=False)


# In[90]:


def scrape():
    #create empty dictionaty to store the required data
    mars_data = {}
    browser = init_browser()
    # visit website1 to gather data
    site1 = "https://mars.nasa.gov/news/"
    browser.visit(site1)
    html = browser.html
    # create a soup object from the html and parse the title and article teaser body
    soup_obj = BeautifulSoup(html, "html.parser")
    news_title =soup_obj.find('div', attrs={'class': 'content_title'}).text
    article_teaser_body = soup_obj.find('div', attrs={'class': 'article_teaser_body'}).text
    #Adding the values to the dictionary
    mars_data["news_title"] = news_title
    mars_data["article_teaser_body"] = article_teaser_body
    
    # visit website2 to gather data
    site2 = "https://www.jpl.nasa.gov/spaceimages/?search=&category=Mars"
    browser.visit(site2)
    # traverse to the desired page by clicking on relevant buttons
    browser.click_link_by_id('full_image')
    time.sleep(2)
    browser.click_link_by_partial_text('more info')
    html = browser.html
    #create a soup object from the html and parse the featured image from the webpage
    soup_obj = BeautifulSoup(html, "html.parser")
    image = soup_obj.find("img", attrs={'class':'main_image'})
    image = image['src']
    image_src = "https://www.jpl.nasa.gov"+image
    #Adding the value to the dictionary
    mars_data["featured_image_url"] = image_src
    
    # visit website3 to gather data
    site3 = "https://twitter.com/marswxreport?lang=en"
    browser.visit(site3)
    html = browser.html
    # create a soup object from the html and parse the weather data from the tweet
    soup_obj = BeautifulSoup(html, "html.parser")
    tweet = soup_obj.find('div', attrs={'class': 'js-tweet-text-container'}).find('p').text
    #Adding the value to the dictionary
    mars_data["mars_weather"] = tweet
    
    #close the browser once all web scraping is done
    browser.quit()
    
    # visit website4 to gather data using pandas
    site4 = "http://space-facts.com/mars/"
    table = pd.read_html(site4)
    df = table[0]
    df.columns = ['Description','Value']
    df.set_index('Description', inplace=True)
    mars_facts = df.to_html()
    df.to_html('table.html')
    #Adding the value to the dictionary
    mars_data["mars_facts"] = mars_facts
   
    #return the dictionary  
    return mars_data