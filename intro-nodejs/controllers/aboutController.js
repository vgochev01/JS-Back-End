const layout = require("./layout");

const html = `
<div>
    <h1>About Us!</h1>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias eaque, sunt dolores ipsa autem fugiat facilis iure velit. Autem, et dolores ipsa nostrum quas placeat ea quis voluptatum velit est.</p>
</div>
`;

module.exports = (req, res) => {
    res.write(layout(html, 'About'));
    res.end();
}