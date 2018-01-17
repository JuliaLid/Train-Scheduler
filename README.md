# Train-Scheduler

## Project Overview: 
Create a train schedule application that incorporates Firebase to host arrival and departure data. App retrieves and manipulates this information with Moment.js. The website will provide up-to-date information about various trains, namely their arrival times and how many minutes remain until they arrive at their station.

## Technology 
* HTML
* Bootstrap (Bootswatch)
* Awesome Font
* JavaScript 
* jQuery 
* Firebase databse
* Moment.js library

## Comments
* I primarily used Bootstrap Cerulean theme for styling. I added minimal CSS to customize some of the components. 

## Challenges
* I couldn't implement an elegant solution for preventing form submission if any fields were left blank. I added logic to check that the value of each field is greater than 0. 
* Moment.js library is useful but difficult to understand. I had to experiment a lot until I found the right methods for needed calculations.
* Removing a child node in the Firebase database.

## Feedback and Questions
* I was able to capture a child node key after pushing it to database. However, I still couldn't delete the child node on click. I would really appreciate your help with soling it!
* What's the best method to validate a form?
* I welcome overall code structure feedback.

