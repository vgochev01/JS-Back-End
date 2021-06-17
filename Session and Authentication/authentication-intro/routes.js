module.exports = (app) => {
    app.all('*', (req, res, next) => {
        console.log(`>>> ${req.method} ${req.path}`, req.body);
        console.log(req.session);
        next();
    });
    
    app.get('/', (req, res) => {
        if(req.session.user){
            res.send(`
            <h1>Authentication Intro</h1>
            <h4>Welcome, ${req.session.user.username}</h4>
            <a href="/logout">Logout</a>
            `);
        } else {
            res.send(`
            <h1>Authentication Intro</h1>
            <h4>Welcome, guest!</h4>
            <a href="/login">Login</a>
            <a href="/register">Register</a>
            `);
        }
    });
    
    app.get('/register', (req, res) => {
        res.send(`
        <h1>Register</h1>
        <a href="/">Home</a>
        <a href="/login">Login</a>
        <form action="/register" method="POST">
        <label>Username: <input type="text" name="username"></label>
        <label>Password: <input type="password" name="password"></label>
        <label>Repeat: <input type="password" name="repass"></label>
        <input type="submit" value="Register">
        </form>
        `);
    });
    
    app.get('/login', (req, res) => {
        res.send(`
        <h1>Login</h1>
        <a href="/">Home</a>
        <a href="/register">Register</a>
        <form action="/login" method="POST">
        <label>Username: <input type="text" name="username"></label>
        <label>Password: <input type="password" name="password"></label>
        <input type="submit" value="Login">
        </form>
        `);
    });
}