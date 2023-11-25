/// /write all server code 
// // Simple server to send us a message when we send a message to it 
// import express from 'express';

// //After this, we can create an express app:
// const app = express();

// //then we can define different endpoint, based on what we want our server to do when one of endpoint receive request

// //when our app receives a GET request on endpoint /hello, it will simply respond with a message saying hello
// // first argument /hello here is the specific path that we want to listen for 
// // second argument is call back, that gets called whenever this endpoint receives a request
// //  second argument will have 2 argument, the incoming request, and the response
// app.get('/hello', (req, res) => {
//     //The response to the request
//     res.send('Hello!');
// })

// //Then we have to tell our server to listen 
// // this function have 2 argument 
// //   first argument is the port we are listening to
// //   second argument is the callback function 
// app.listen(8000, () => {
//     console.log("Server is listening on port 8000")
// })

// //Then, we will use NodeJS to run our express server, using node src/server.js
// //Then we go to the link http://localhost:8000/hello, server will response "Hello!"

// import express from 'express';

// const app = express();
// //MIDDLEware
// //Tell express server: when it receives a request that has a JSON body/payload, 
// // it is going to parse and automatically make that available to us on req.body
// app.use(express.json())

// app.get('/hello/:name', (req, res) => {
//     //params give us URL params here => name is a URL param here
//     // our URL can have more than 1 URL param
//     const {name} = req.params;
//     res.send(`Hello ${name}!!!`);
// })

// app.post('/hello', (req, res) => {
//     console.log(req.body)
//     res.send(`Hello ${req.body.name}!`);
// })

// app.listen(8000, () => {
//     console.log("Server is listening on port 8000")
// })

//What we want to do here is that users can upvote our articles to help our articles is the most popular/helpful
import express from 'express';

//temporaty fake db, which contain fake upvote 
// Later, we will replace this with MongoDB
let articlesInfo = [
    {
        name: 'learn-react',
        upvotes: 0
    },{
        name: 'learn-node',
        upvotes: 0
    },{
        name: 'mongodb',
        upvotes: 0
    },
]

const app = express();
app.use(express.json())

//name here is the name of the article we want to upvote
app.put('/api/articles/:name/upvote', (req, res) => {
    //logic for upvote article
    // we need to define fake db, which contain how many upvote each articles has? 
    // Later, we will replace this with MongoDB

    // Based on the value of URL param, we need to know what article we need to upvote, 
    //  and then we will increse value of upvotes of that article's object on our DB
    const { name } = req.params;

    //find the corresponding article with that name
    const article = articlesInfo.find(article => article.name === name);
    //make sure that article exists
    if (article) {
        article.upvotes += 1;
        //Announce for us how many upvote that article currently have
        res.send(`The ${name} article now has ${article.upvotes} upvotes!!`);
    } else {
        //In case that article does not exist, we need to annouce to user that this article does not exist
        res.send(`The ${name} article does not exists`);
    }
})

app.listen(8000, () => {
    console.log("Server is listening on port 8000")
})

//after this, we can use nodemon package, which can fix our problem: we have to restart our server everytime we make changes
// installed it by npm install nodemon --save-dev
// we add the --save-dev flag to the command, which will install this as a dev dependency, which basically means that it will be put 
//  in separate part of our package.JSON along with the dev dependencies instead of actual production dependencies
// After installing, we can run our server by using npx nodemon
//   => it will continuously run our server and EVERYTIME WE MAKE CHANGES TO SERVER.JS file, it will automatically refresh and restart our server

//Since the command npx nodemon src/server.js is kinda long, we can make a shortcut to this command: 
// In package.json file, in "script" category, we add one more line: "dev": "npx nodemon src/server.js",
//  => This line will create a short cut to this commmand
//  => From now, we only need to run the command: npm run dev
//Futhermore, we don't really need "npx" when it is in a package.JSON script, so we will make change: 
//          "dev": "nodemon src/server.js"
