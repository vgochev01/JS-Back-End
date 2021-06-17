const http = require('http');
const url = require('url');

const router = require('./router');

const homeController = require('./controllers/homeController');
const aboutController = require('./controllers/aboutController');
const catalogController = require('./controllers/catalogController');
const createController = require('./controllers/createController');
const deleteHandler = require('./controllers/deleteHandler');
const staticController = require('./controllers/staticController');
const uploadController = require('./controllers/uploadController');

router.get('/', homeController);
router.get('/about', aboutController);
router.get('/catalog', catalogController);
router.post('/create', createController);
router.get('/delete', deleteHandler);
router.post('/upload', uploadController);

const port = 3030;
const server = http.createServer(requestHandler);

function requestHandler(req, res){
    console.log('>>>', req.method, req.url);

    const pathname = url.parse(req.url).pathname;
    const query = url.parse(req.url).query;

    const handler = router.match(req.method, pathname);

    handler(req, res);
}

server.listen(port, () => console.log('Server listening on port ' + port));