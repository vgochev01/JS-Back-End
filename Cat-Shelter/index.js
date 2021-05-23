const http = require('http');
const addBreedController = require('./controllers/addBreedController');
const addCatController = require('./controllers/addCatController');
const homeController = require('./controllers/homeController');
const staticController = require('./controllers/staticController');
const router = require('./router');

const server = http.createServer(requestHandler);
const port = 3030;

router.get('/', homeController);
router.get('/content/styles/site.css', staticController);
router.get('/add/breed', addBreedController.renderPage);
router.post('/add/breed', addBreedController.addBreed);
router.get('/add/cat', addCatController.renderPage);
router.post('/add/cat', addCatController.addCat);

function requestHandler(req, res){
    const method = req.method;
    const pathname = req.url;
    const handler = router.match(method, pathname);
    console.log('>>>', method, pathname);
    handler(req, res);
}

server.listen(port, () => console.log('Server started on port ' + port));