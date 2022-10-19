The application is divided into two folders 1. Backend 2.Frontend and in order to make use it we'll have to first configure backend and then run the frontend

The steps to run the project are -
(i). To start backend
1. Go to backend folder and install all the dependencies.
2. Create a .env file and copy the below variables in that and just change the MONGO_URL with your own database url rest you can keep it same.
HASH_SECRET=CRYPTO_ORGANISATION_HASH_SECRET
MONGO_URL={YOUR_DATABASE_CONNECTION}
JWT_KEY=ORGANISATION_SECRET_JWT_KEY
JWT_REFRESH_SECRET=JWT_REFRESH_ORGANISATION_SECRET
3. run the server with the command npm start
(ii). To start frontend you just have to go in frontend folder after starting listening to backend and just run npm start to start running the application.


Functionalities that are done in the project
1. The authentication system is done in a secure and optimised way consisting two tokens access and token and storing them in cookie and as a result frontend will continuously remember the status of authentication.
2. In all the operations in frontend it keeps on remember the authentication status and when the access token is expiring i am sending a refresh request which again sets the new access token and ensure good user experience
3. I am storing image as well of the user and showing in profile page but as that image is storing in the backend itself insteal of an proper storage like aws s3 browser is not loading it due to security purpose but the same will work if we do it with a professional storage system
4. The history which i am displaying will be specific to user which means if a user is authenticated it will store it's userId in history and send only those history which have the id of that user as userID

