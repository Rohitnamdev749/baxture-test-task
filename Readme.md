# How to run backend in local system

- Install node.js 20.12.2 LTS version.
- Install mongodb.
- Clone the repository.
- Pull the latest code from master branch.
- create a file called ".env" onto your root folder of the project and put these two keys 1) <b>PORT=3000</b>, 2)<b>DB_URL='mongodb://localhost:27017/buxture-test'</b>.
- Install the dependencies using node package manager. " npm install " !.

### Run the project by using following commands

<b>For development :</b> npm run start:dev

<b>For production :</b> npm run start:prod

<b>For test :</b> npm run start:test

<b>For seeder: </b> npm run seeder

<b>For multiple server: </b> npm run start:multi


