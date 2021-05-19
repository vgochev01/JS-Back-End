const layout = (html, title = 'Home') => `
<html>
    <head>
        <title>My Page - ${title}</title>
    </head>
    <nav>
        <a href='/'>Home</a>
        <a href='/catalog'>Catalog</a>
        <a href='/about'>About</a>
    </nav>
    <body>
        ${html}
    </body>
</html>
`;

module.exports = layout;