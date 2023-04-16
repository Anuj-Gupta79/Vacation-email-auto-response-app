# Vacation-email-auto-response-app

To achieve the desired functionality, you'll need to follow these steps:

1. First, create a new project in the Google Cloud Console.

2. Enable the Gmail API for the project.

3. Create credentials for the project to authenticate the app to access Gmail API.

4. Install the required packages using npm:
 a. nodemon
 b. googleapis

5. Write the code to authenticate the app using the created credentials and access the Gmail API.

6. Create a function to check for new emails in a given Gmail ID using the Gmail API.

7. Create a function to send replies to emails that have no prior replies using the Gmail API.

8. Create a function to add a Label to the email and move the email to the label using the Gmail API.

9. Finally, use setInterval() to repeat the sequence of steps 6-8 in random intervals of 45 to 120 seconds.