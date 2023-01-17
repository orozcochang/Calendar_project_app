# Calendar Project App

The goal for this project is to create a scheduling application.  
Some fatures included are:  
&emsp;-User authentication: Login/logout, create account, delete account.  
&emsp;-API calls to thenounproject.  
&emsp;-Time manipulation to display a calendar in weekly increments.  

The technical stack is:  
&emsp; -Frontend: JavaScript/React, including Bootstrap libraries  
&emsp; -Backend: Python/Django  
&emsp; -Database: PostgreSQL 
  
### Home Page  
The home page loads on a register screen and prompots the user to click the login link if they have and account. The registration form is set to accept valid email formats and to run a check after every input to see if there is an existing user in the database with that email. Once registered, it prompts the user to login.  

<img width="1120" alt="Screen Shot 2023-01-17 at 10 21 21 AM" src="https://user-images.githubusercontent.com/100933440/212789931-98722972-0b46-4512-bd89-bfe4e16d00cf.png">
<img width="742" alt="Screen Shot 2023-01-17 at 10 19 52 AM" src="https://user-images.githubusercontent.com/100933440/212789949-aa4194b0-de98-4458-a072-9cbd2407f0ee.png">
<img width="1034" alt="Screen Shot 2023-01-17 at 10 26 23 AM" src="https://user-images.githubusercontent.com/100933440/212789969-48d864e0-beb6-44fb-8721-51d2a07970cd.png">  

### Login and Account Information  
Once the user is logged in, they can go to their account information and make updates or delete their account completely.  

<img width="1034" alt="Screen Shot 2023-01-17 at 10 29 23 AM" src="https://user-images.githubusercontent.com/100933440/212790427-1ede15fc-14ad-4efe-9330-9b18ee59db73.png">
<img width="1076" alt="Screen Shot 2023-01-17 at 10 29 51 AM" src="https://user-images.githubusercontent.com/100933440/212790434-2bdbd931-32da-44f1-89d4-e37383757014.png">  

### Calendar  
The calendar opens on the current week by default and includes buttons to navigate the weeks. The API call made to thenounproject retrieves a different icon for each month. Each cell can be clicked and assigns the date and user values of the cell to a State to pass on to the server as part of the information to add an event to that cell for that user.
<img width="1000" alt="Screen Shot 2023-01-17 at 10 39 56 AM" src="https://user-images.githubusercontent.com/100933440/212791618-f1136738-95e9-4513-abe6-154ebe889446.png">
<img width="285" alt="Screen Shot 2023-01-17 at 10 42 23 AM" src="https://user-images.githubusercontent.com/100933440/212791639-1faac574-2bce-45d1-98d7-90d31448cad4.png">
