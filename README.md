# Hubla Challenge


## Overview
The application has a form to upload files of products sold in the creator-affiliated model. Files are processed and saved in the relational database according to the challenge description. Based on the database, we perform the operations for calculating the total transactions and organize the data to show on the screen, separated by producer or affiliate.

## Tools used

### Frontend
For the frontend, available in the client folder, we used **ReactJs** and some libraries to connect with the backend, such as **Axios**. The **Jest** library is also used for unit testing. Furthermore, to better present the frontend design, elements from the **Material UI** library are used - it is worth mentioning that the configuration was not a concern in the project, having much room for improvement.

### Backend
**NodeJs, Express**, and **Sequelize** are used for the backend to connect to the database.

The relational database chosen was **MySQL**. The database was created on the **Heroku** cloud access platform to facilitate the project. This way, the project could then be scaled to actual deployment.

## Running the application
To install and run the project, you can use docker-compose with the following command (in the project's base folder):

```sh
  docker-compose up --build
```

Since the database is available on the Heroku platform, docker compose has only 2 instances: the frontend application and the backend application.

### Open locally
After running the project, your application will be available locally.
The client will be available at:
http://localhost:3000/

The server will be available at:
http://localhost:8080/

## Running tests
To run the tests, you can enter the folder corresponding to the client or server and run the following command:

```sh
  npm test
```
