// import express from 'express';
import { MongoClient } from 'mongodb';

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
// let articlesInfo = [
//     {
//         name: 'learn-react',
//         upvotes: 0,
//         comments: [],
//     },{
//         name: 'learn-node',
//         upvotes: 0,
//         comments: [],
//     },{
//         name: 'mongodb',
//         upvotes: 0,
//         comments: [],
//     },
// ]
// Since we could connect the mongoDB, we can remove this.

const app = express();
app.use(express.json())

// GET endpoint: for user to load the information -> Can see the upvotes, comments
app.get('/api/articles/:name', async (req, res) => {
    //Call backfunction => get the current value of this-name-URL-parameter 
    //  => use it to query MongoDB => get the infomation for that article
    const { name } = req.params;
    const client = new MongoClient('mongodb://127.0.0.1:27017');
    await client.connect();

    const db = client.db('react-blog-db');

    const article = await db.collection('articles').findOne( { name });

    if (article) {
        res.json(article);
    } else {
        res.sendStatus(404);
    };
    
})


//name here is the name of the article we want to upvote
// app.put('/api/articles/:name/upvote', (req, res) => {
//     //logic for upvote article
//     // we need to define fake db, which contain how many upvote each articles has? 
//     // Later, we will replace this with MongoDB

//     // Based on the value of URL param, we need to know what article we need to upvote, 
//     //  and then we will increse value of upvotes of that article's object on our DB
//     const { name } = req.params;

//     //find the corresponding article with that name
//     const article = articlesInfo.find(article => article.name === name);
//     //make sure that article exists
//     if (article) {
//         article.upvotes += 1;
//         //Announce for us how many upvote that article currently have
//         res.send(`The ${name} article now has ${article.upvotes} upvotes!!`);
//     } else {
//         //In case that article does not exist, we need to annouce to user that this article does not exist
//         res.send(`The ${name} article does not exists`);
//     }
// })

app.put('/api/articles/:name/upvote', async (req, res) => {
    //logic for upvote article
    // we need to define fake db, which contain how many upvote each articles has? 
    // Later, we will replace this with MongoDB

    // Based on the value of URL param, we need to know what article we need to upvote, 
    //  and then we will increse value of upvotes of that article's object on our DB
    const { name } = req.params;

    // 27017 is default port for MongoDB
    const client = new MongoClient('mongodb://127.0.0.1:27017');
    await client.connect();

    const db = client.db('react-blog-db');
    await db.collection('articles').updateOne({ name }, {
        $inc: { upvotes: 1 },
    })

    const article = await db.collection('articles').findOne( { name });

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

//Let's adding function to allow users to add comments to our article 
// inside the endpoint that we create for our adding comments, we basically just going to take any information that we get from our user, such as 
//  comment text and create a new object that we will insert into this comments array
//This adding comment endpoint should be POST, because we are adding new comment to the comments 
//This comment is to add a new comment to ${name} article
app.post('/api/articles/:name/comments', (req, res) => {
    //We have to decide what format the comments are going to be specified when they are sent to the server as a request
    // We want the client side (FE) to specify both of the Text of the new comment that they are adding and the Name of the commentor
    // => POST query's body will has 2 properties: 
    //      1. "postedBy": name of commentor
    //      2. "text": comment
    const {name} = req.params;
    const {postedBy, text} = req.body;
    
    //Since we have the properties from the request body, we will insert those into the comments array for the corresponding articles
    const article = articlesInfo.find(article => article.name === name);
    if (article) {
        article.comments.push( {postedBy, text});
        //we need to send back a response after adding a new comment to this article
        // we will send the entire array of comments for that article, so that we can see whether they are successfully getting added or not?
        res.send(article.comments);
    } else {
        res.send(`The ${name} article does not exists!!`);
    }
    //when our server is restarted, all of our data (comments) will be reseted, since old data is only stored in fake in-memory database (comments array)
})

app.listen(8000, () => {
    console.log("Server is listening on port 8000")
})


