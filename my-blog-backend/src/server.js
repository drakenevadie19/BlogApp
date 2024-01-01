import express from 'express';
import { db, connectToDB } from './db.js';

const app = express();
app.use(express.json())

// GET endpoint: for user to load the information -> Can see the upvotes, comments
app.get('/api/articles/:name', async (req, res) => {
    //Call backfunction => get the current value of this-name-URL-parameter 
    //  => use it to query MongoDB => get the infomation for that article
    const { name } = req.params;

     
    const article = await db.collection('articles').findOne( { name });

    if (article) {
        res.json(article);
    } else {
        res.sendStatus(404);
    };
    
})

app.put('/api/articles/:name/upvote', async (req, res) => {
    //logic for upvote article
    // we need to define fake db, which contain how many upvote each articles has? 
    // Later, we will replace this with MongoDB

    // Based on the value of URL param, we need to know what article we need to upvote, 
    //  and then we will increse value of upvotes of that article's object on our DB
    const { name } = req.params;

    await db.collection('articles').updateOne({ name }, {
        $inc: { upvotes: 1 },
    })

    const article = await db.collection('articles').findOne( { name }); 

    //make sure that article exists
    if (article) {
        //Announce for us how many upvote that article currently have
        res.json(article);
    } else {
        //In case that article does not exist, we need to annouce to user that this article does not exist
        res.send(`The ${name} article does not exists`);
    }
})

// PUT endpoint for comments
app.post('/api/articles/:name/comments', async (req, res) => {
    const {name} = req.params;
    const {postedBy, text} = req.body;
    
    //make a query to DB for adding a new comment with postedBy and text for comments
    await db.collection('articles').updateOne({ name }, {
        $push: { comments: { postedBy, text } },
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