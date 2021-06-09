const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();

const sessions = {};

function mySessionStorage(req, res, next){
    let session = {};
    const sessionId = req.cookies.sessionId;

    if(sessionId){
        if(sessions[sessionId] == undefined){
            console.log('Invalid session id, generating new one!');
            createSession();
        } else {
            session = sessions[sessionId];
            console.log(`Known User with session ID: ${sessionId}`);
        }
    } else {
        createSession();
    }


    req.session = session;
    next();

    function createSession(){
        const id = ('00000000' + (Math.random() * 99999999).toString(16)).slice(-8);
        session.visited = 0;
        sessions[id] = session;
        res.cookie('sessionId', id);
        console.log('Generated new session with ID: ' + id);
    }
}

app.use(cookieParser());
app.use(mySessionStorage);

app.get('/', (req, res) => {
    req.session.visited++;
    res.send(`<h1>Hello World!</h1><p>Session Data:<br>${JSON.stringify(req.session)}</p>`);
});

app.listen(3000);