# Vacation-email-auto-response-app

To achieve the desired functionality, you'll need to follow these steps:

First, create a new project in the Google Cloud Console.
Enable the Gmail API for the project.
Create credentials for the project to authenticate the app to access Gmail API.
Install the required packages using npm:
a. nodemon
b. googleapis
Write the code to authenticate the app using the created credentials and access the Gmail API.
Create a function to check for new emails in a given Gmail ID using the Gmail API.
Create a function to send replies to emails that have no prior replies using the Gmail API.
Create a function to add a Label to the email and move the email to the label using the Gmail API.
Finally, use setInterval() to repeat the sequence of steps 6-8 in random intervals of 45 to 120 seconds.