our task is to complete a small web-app interfacing with an existing services back end. This service will run in nodejs on your local machine on port **4200**. It will have a basic in memory data set for you to manipulate. We expect you to use modern client-server interaction seen in interactive web applications, as those are the types of applications you will be building at TobiiDynavox!

You may use any framework you like to build your front-end. Feel free to use the basic demo getting started applications you can create with the command line tools of each framework, and modify them in place as needed. You are not tied to one of these frameworks. You can use any additional npm packages you need to complete your task.

## API Documentation

API documentation of the back end services can be found at http://localhost:9000 while the services are running.

## What you are building

Create a simple UI with the following features:
1. The ability to create new students
2. The ability to create new classrooms
3. The ability to drag and drop students to classrooms to assign them (each student can be assigned to more than one classroom)

The above features should persist their data to the SQLite backend using the express calls documented on http://localhost:9000 while the services are running, and are reset on service restart. Don't worry about designing a workflow, all of the above may be accomplished on a single screen for the purposes of this interview. Additionally, don't worry about making this pretty; 
we know you know your way around CSS and don't expect you to spend more of your time showing it!

## Starting the API Services (from "services" directory) 

`npm install`

`npm run start`

The above commands will boot strap the services back end on port 9000 that is included in the services directory. You will be expected to create a web-app that is self hosted with a development server, and to thoroughly document the startup procedure. You do not need to create a startup script in the root packages.json file, it is a bonus, but for time constraints, simple documentation with your submission is sufficient.