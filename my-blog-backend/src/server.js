import express from 'express';
import { db, connectToDB } from './db.js';

import fs from 'fs';
import admin from 'firebase-admin';

const credentials = JSON.parse(
    fs.readFileSync('./credentials.json')
)

admin.initializeApp({
    credential: admin.credential.cert(credentials),
}) // => telling the firebase admin package what credentials to use in order to connect to our project


const app = express();
app.use(express.json())

// Use Express Middleware to automatically load the user's info when we receive a request 
app.use(async (req, res, next) => {
    //get authtoken
    const { authtoken } = req.headers;

    //use fb auth to tkae that token to load the fb user for that token
    // => if user did not log in, we are not going to include the authtoken along with the request, and load the basic article info
    if (authtoken) {
        try {
            req.user = await admin.auth().verifyIdToken(authtoken); // Verify whether authToken is valid and load the coresponding user that making request for that authtoken 
        } catch (e) {
            return res.sendStatus(400);
        }
    }

    req.user = req.user || {};
    
    next();
})
// Then we will go though every endpoint and checking whether who is making the request 


// GET endpoint: for user to load the information -> Can see the upvotes, comments
app.get('/api/articles/:name', async (req, res) => {
    //Call backfunction => get the current value of this-name-URL-parameter 
    //  => use it to query MongoDB => get the infomation for that article
    const { name } = req.params;

    const { uid } = req.user;
     
    const article = await db.collection('articles').findOne( { name });

    if (article) {
        // Checking whether user with id = uid have upvoted before 
        // Create an array containing all of users that upvoted in the past 
        const upvoteIds = article.upvoteIds || []; //In case this property did not exists in this article, we will add an empty array for it
        // => We will check whether user with uid existed in upvoteIds array or not
        // send back this properties along with the article, to make sure that an user can not upvote more than once in a time 
        article.canUpvote = uid && !upvoteIds.includes(uid);

        res.json(article);
    } else {
        res.sendStatus(404);
    };
    
})

//
app.use((req, res, next) => {
    // if the use exist and include authToken with their request
    if (req.user) {
        next();
    } else {
        res.sendStatus(401); // 401 = user is not allowed to make the request 
    }
});

app.put('/api/articles/:name/upvote', async (req, res) => {
    //logic for upvote article
    // we need to define fake db, which contain how many upvote each articles has? 
    // Later, we will replace this with MongoDB

    // Based on the value of URL param, we need to know what article we need to upvote, 
    //  and then we will increse value of upvotes of that article's object on our DB
    const { name } = req.params;
    const { uid } = req.user;

    const article = await db.collection('articles').findOne( { name });

    if (article) {
        // Checking whether user with id = uid have upvoted before 
        // Create an array containing all of users that upvoted in the past 
        const upvoteIds = article.upvoteIds || []; //In case this property did not exists in this article, we will add an empty array for it
        // => We will check whether user with uid existed in upvoteIds array or not
        // send back this properties along with the article, to make sure that an user can not upvote more than once in a time 
        const canUpvote = uid && !upvoteIds.includes(uid);
        
        // if user can upvote, we can make changes to our database 
        if (canUpvote) {
            await db.collection('articles').updateOne({ name }, {
                $inc: { upvotes: 1 },
                $push: { upvoteIds: uid} // push requester's uid to the upvoteIds array, which mean next time checking, this user can not upvote 
            })
        }

        const updatedArticle = await db.collection('articles').findOne( { name }); 
        //Announce for us how many upvote that article currently have
        res.json(updatedArticle);
    } else {
        //In case that article does not exist, we need to annouce to user that this article does not exist
        res.send(`The ${name} article does not exists`);
    }
})

// PUT endpoint for comments
app.post('/api/articles/:name/comments', async (req, res) => {
    const {name} = req.params;
    const {text} = req.body;
    const {email} = req.user;
    
    //make a query to DB for adding a new comment with postedBy and text for comments
    await db.collection('articles').updateOne({ name }, {
        $push: { comments: { postedBy: email, text } },
    });

    const article = await db.collection('articles').findOne({ name })

    if (article) {
        res.json(article);
    } else {
        res.send(`The ${name} article does not exists!!`);
    }
    //when our server is restarted, all of our data (comments) will be reseted, since old data is only stored in fake in-memory database (comments array)
});

connectToDB(() => {
    console.log("Successfully connected to DB");
    app.listen(8000, () => {
        console.log("Server is listening on port 8000")
    })
})