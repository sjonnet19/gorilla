# TobiiDynavox Front End Web Developer Takehome

Thank you for applying to TobiiDynavox for a front-end web developer position!

Your task is to complete a small web-app interfacing with an existing services back end. This service will run in nodejs on your local machine on port **4200**. It will have a basic in memory data set for you to manipulate. We expect you to use modern client-server interaction seen in interactive web applications, as those are the types of applications you will be building at TobiiDynavox!

You may use any framework you like to build your front-end, with that said, we took the time to bootstrap a few of the most common frameworks for you. These are the basic demo getting started applications you can create with the command line tools of each framework, so that you can modify them in place as needed. You are not tied to one of these frameworks, they are provided for your convenience. You can use any additional npm packages you need to complete your task as well.

## API Documentation

API documentation of the back end services can be found at http://localhost:9000 while the services are running.

## What you are building

Create a simple UI with the following features:
1. The ability to create new students
2. The ability to create new instructors
3. The ability to drag and drop students to instructors to assign them

The above features should persist their data to the SQLite backend using the express calls documented on http://localhost:9000 while the services are running. Don't worry about designing a workflow, all of the above may be accomplished on a single screen for the purposes of this interview. Additionally, don't worry about making this pretty; 
we know you know your way around CSS and don't expect you to spend more of your time showing it!

## Bootstrap Quick Start Projects

### Angular Bootstrap

`npm install`

`npm run install-angular`

`npm run start-angular`

### Ember Bootstrap

`npm install`

`npm run install-ember`

`npm run start-ember`

### React Bootstrap

`npm install`

`npm run install-react`

`npm run start-react`

### Vue.Js Bootstrap

`npm install`

`npm run install-vue`

`npm run start-vue`

### Your Own Framework

`npm install`

`npm run start-services`

For rolling your own framework the above commands will boot strap the services back end on port 9000 that is included in the services directory. You will be expected to create a web-app that is self hosted with a development server, and to thoroughly document the startup procedure. You do not need to create a startup script in the root packages.json file, it is a bonus, but for time constraints, simple documentation with your submission is sufficient.