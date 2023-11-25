// //write all server code 
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

import express from 'express';

const app = express();
//MIDDLEware
//Tell express server: when it receives a request that has a JSON body/payload, 
// it is going to parse and automatically make that available to us on req.body
app.use(express.json())

app.get('/hello', (req, res) => {
    //The response to the request
    res.send('Hello!');
})

app.post('/hello', (req, res) => {
    console.log(req.body)
    res.send(`Hello ${req.body.name}!`);
})

app.listen(8000, () => {
    console.log("Server is listening on port 8000")
})
