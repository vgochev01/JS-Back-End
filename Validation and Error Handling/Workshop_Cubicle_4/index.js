const express = require("express");

start();

async function start(){
    const app = express();
    const port = 3000;
    
    require('./config/express')(app);
    require('./config/routes')(app);
    await require('./config/database')(app);
    
    app.listen(port, () => console.log(`Server listening on port ${port}`));
}
