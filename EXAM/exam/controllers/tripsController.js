const router = require('express').Router();
const { isAuth, isOwner, notOwner } = require('../middlewares/guards');
const { parseMongooseError } = require('../util/parse');
const { preloadTrip } = require('../middlewares/preload');
const { deleteTripFromHistory } = require('../services/user');

router.get('/', async (req, res) => {
    const trips = await req.storage.getAllTrips();
    const ctx = {
        title: 'Shared Trips',
        trips
    };

    res.render('trips/sharedTrips', ctx);
});

router.get('/create', isAuth(), async(req, res) => {
    const ctx = {
        title: 'Offer a Trip'
    };
    res.render('trips/create', ctx);
});

router.post('/create', isAuth(), async(req, res) => {
    
    const userInput = {
        startPoint: req.body.startPoint,
        endPoint: req.body.endPoint,
        date: req.body.date,
        time: req.body.time,
        carImage: req.body.carImage,
        carBrand: req.body.carBrand,
        seats: Number(req.body.seats),
        price: Number(req.body.price),
        description: req.body.description,
        owner: req.user._id,
        buddies: []
      }

      try {
        await req.storage.createTrip(userInput, req.user._id);
        res.redirect('/trips')
      } catch (err) {
          const ctx = {
            title: 'Offer a Trip',
            errors: [parseMongooseError(err)[0]], // show the first error only
            userInput
          }
          res.render('trips/create', ctx);
      }
});

router.get('/:id', preloadTrip, async(req, res) => {
    const trip = req.data.trip;
    const ctx = {
        title: 'Trip Details',
        trip,
        buddies: trip.buddies.map(u => u.email).join(', '),
        isUser: req.user != undefined,
        isOwner: req.user?._id == trip.owner._id,
        hasJoined: trip.buddies.some(u => u._id == req.user?._id),
        hasSeats: trip.seats > 0
    };

    res.render('trips/details', ctx);
});

router.get('/join/:id', preloadTrip, notOwner(), async (req, res) => {
    try {
        await req.storage.joinTrip(req.params.id, req.user._id);
        res.redirect('/trips/' + req.params.id);
    } catch (err) {
        console.error(err);
        res.redirect('/');
    }
});

router.get('/edit/:id', preloadTrip, isOwner(), async(req, res) => {
    const trip = req.data.trip;
    const ctx = {
        title: 'Edit Trip',
        trip
    };

    res.render('trips/edit', ctx);
});

router.post('/edit/:id', preloadTrip, isOwner(), async(req, res) => {
    const userInput = {
        startPoint: req.body.startPoint,
        endPoint: req.body.endPoint,
        date: req.body.date,
        time: req.body.time,
        carImage: req.body.carImage,
        carBrand: req.body.carBrand,
        seats: Number(req.body.seats),
        price: Number(req.body.price),
        description: req.body.description
    };
    try {
        await req.storage.editTrip(req.params.id, userInput);
        res.redirect('/trips/' + req.params.id);
    } catch (err) {
        const trip = req.data.trip;
        const ctx = {
            title: 'Edit Trip',
            trip,
            errors: [parseMongooseError(err)[0]]
        };
    
        res.render('trips/edit', ctx);
    }
});

router.get('/delete/:id', preloadTrip, isOwner(), async(req, res) => {
    try {
        await req.storage.deleteTrip(req.params.id);
    } catch (err) {
        console.error(err);
    }
    res.redirect('/trips');
});

module.exports = router;