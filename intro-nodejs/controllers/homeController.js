const html = `
<html>
    <head>
        <title>My Page - Home</title>
    </head>
    <body>
        <h1>Welcome to my Page!</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias eaque, sunt dolores ipsa autem fugiat facilis iure velit. Autem, et dolores ipsa nostrum quas placeat ea quis voluptatum velit est.</p>
    </body>
</html>
`;

module.exports = (req, res) => {
    res.write(html);
    res.end();
}