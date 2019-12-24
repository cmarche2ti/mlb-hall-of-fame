# mlb-hall-of-fame

## Methodology

Special thanks to Sean Lahman for his [Baseball Databank](http://www.seanlahman.com/baseball-archive/statistics/). I could not have made this project work without it.

The purpose of this project was to create a web application that would allow users to choose a Baseball position and output players who should be in the Hall of Fame based on a machine learning model. I used players who were eligible for the hall of fame based on the criteria set up by the Baseball Writers Association. To be eligible, players had to play for at least 10 seasons and have been retired for 5 seasons. I did not consider special circumstances, like the steroid era, and focused on statistics alone for my analysis. I wanted to discover which players had careers that were good enough by the statistics, but were overlooked by the Baseball Writers Association.

### Machine Learning

This dataset was challenging to work with because it was imbalanced. There have been very few players inducted into the Baseball Hall of Fame when compared to the total number of players who have played the game. Using a standard random forest classifier did not produce a model that was useful. All it had to do was predict 'No' and it was correct 99% of the time. There are so few baseball players who are in the Hall of Fame that the model only had to predict a player was not going to be elected to the hall for it to be 99% accurate.  

I turned to xgboost and imbalanced-learn as they have built in functionality that helps to mitigate the imbalance in a data set.  With these models I had much better results.
After training I decided to run all of the data for players back through the models I created to see if they would properly predict players who were
already in the Hall of Fame, the players that were overlooked and players that were not eligible but should be in the Hall.  While this is not a scientifically rigorous way to use a machine learning algorithm, it was the goal of this project to make this comparison.

### Results

After exploring both the balanced random forest classifier and xgboost, I went with xgboost for my machine learning model. It had better scores and 
more importantly, was able to predict players to be in Cooperstown more effectively. For most position players the model predicted players currently in the hall with fairly good accuracy.  Pitchers were the most interesting.  While there are only 83 pitchers currently in Cooperstown my model says that 483 players should be inducted.  That is an increase of 400 pitchers!  While my model is not as accurate as I would like it to be for identifying players already in the hall, based on this data, I believe that the Baseball Writers Association of America have under elected pitchers, more than any other position in Major League Baseball.

In the tables below are the classification reports for both Pitchers and Position Players.  The Accuracy of the "No" category for both is very high meaning that the player was not elected to the Hall of Fame and the model predicted "No" as well.  Accuracy for "Yes" is much lower.  This is due to the difficulties with the imbalanced data set.

### Areas for Continued Work

For a lifelong baseball fan, this has been a fascinating project. The time that I had to dedicate to this during my coursework was limited. Moving forward I see several areas that I am interested in pursuing more functionality. These include:

* Refining the Machine Learning Algorithm
* Storing the data in a Database and Querying that Database
* Storing the Machine Learning Algorithm in a separate file and processing data as it is queried
* Allowing Users to sort the output on the website by specific columns, positions or players