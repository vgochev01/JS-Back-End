const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const { isGuest, isAuth } = require('../middlewares/guards');

router.get('/register', isGuest(), (req, res) => {
    const ctx = {
        title: 'Register',
    };
    res.render('user/register', ctx);
});

router.post('/register',
    isGuest(),
    body('email').trim().isEmail().withMessage('Please enter a valid email address!'),
    body('password').trim().isLength({ min: 5 }).withMessage('The password should be at least 5 characters long!').bail().isAlphanumeric().withMessage('Password should consist only english letters and digits!'),
    body('rePass').custom((value, { req }) => {
        if(value != req.body.password){
            throw new Error('Passwords don\'t match!');
        }
        return true;
    }),
    async(req, res) => {
        const userInput = {
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
        };
        try{
            const validation = validationResult(req);
            
            if(validation.isEmpty() == false){
                throw new Error(validation.errors.map(e => e.msg).join('\n'));
            }

            await req.auth.register(userInput);
            res.redirect('/');
        } catch(err) {
            const ctx = {
                title: 'Register',
                errors: err.message,
                userInput
            };
            res.render('user/register', ctx);
        }
});

router.get('/login', isGuest(), (req, res) => {
    const ctx = {
        title: 'Login'
    };
    res.render('user/login', ctx);
});

router.post('/login',
    isGuest(),
    body('username').trim().not().isEmpty().withMessage('Username field is required!'),
    body('password').trim().not().isEmpty().withMessage('Password field is required!'),
    async(req, res) => {
        const userInput = {
            username: req.body.username,
            password: req.body.password,
        };
        try{
            const validation = validationResult(req);
            
            if(validation.isEmpty() == false){
                throw new Error(validation.errors.map(e => e.msg).join('\n'));
            }
            try {
                await req.auth.login(userInput);
            } catch(err){
                console.error(err.message);
                throw new Error('Wrong username or password!');
            }
            res.redirect('/');
        } catch(err) {
            const ctx = {
                title: 'Login',
                errors: err.message,
                userInput
            };
            res.render('user/login', ctx);
        }
});

router.get('/logout', isAuth(), (req, res) => {
    req.auth.logout();
    res.redirect('/');
});

module.exports = router;