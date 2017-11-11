const express = require("express");
const path = require("path");

const app = express();

const host = "127.0.0.1";
const port = 3000;

const number = Math.floor(Math.random() * 10000) + 1;

app.use(express.static(__dirname + '/css'));
app.use(express.static(__dirname));


app.get('/', (request, response) =>{
    response.sendFile(path.join(__dirname + '/html/main.html'));
});
app.get('/:something', (request, response) =>{
    response.sendFile(path.join(__dirname + '/html/notFound.html'));
});

app.post('/', (request, response) =>{
    let response_number = request.query.num;
    if(number < response_number){
        response.send("less");
    }else if(number > response_number){
        response.send("more");
    }else if(number  ==  response_number){
        response.send("found it");
    }

});

app.listen(port, (err) =>{
    if(err){
        console.log(`Error ${err} happened`);
        return;
    }
    console.log(`Server is listening http://${host}:${port}`);

});
