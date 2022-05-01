const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();

const db = require('../models');

router.get('/flash', async function (req, res) {
    // Set a flash message by passing the key, followed by the value, to req.flash().
    await req.flash('bad-login', 'Bad username or password. Try again.');
    res.redirect('/login');
});

router.get('/home', (req, res) => {
    if(req.session && req.session.currentUser) {
        res.redirect(`/users/${req.session.currentUser.id}`);
    }
    else {
        res.redirect('/');
    }
});

router.get('/login', async(req, res) => {
    const message = await req.consumeFlash('bad-login');

    res.render('auth/login.ejs', {message: message});
});

router.post('/login', async (req, res, next) => {
    try {
        // Make sure user exists in our database
        const foundUser = await db.User.findOne({email: req.body.email});
        if(!foundUser) {
            return res.redirect('/flash');
        }

        // check if submitted password === stored password
        const match = await bcrypt.compare(req.body.password, foundUser.password);
        if(!match) { 
            return res.redirect('/flash');
        }

        // if login is successful, create a session
        req.session.currentUser = {
            id: foundUser._id,
            username: foundUser.email,
            name: foundUser.name
        }

        // then redirect to their profile page
        return res.redirect(`/users/${foundUser._id}`);
    }
    catch(err) {
        console.log('Error in login post: ' + err);
        res.send(err);
    }
});

router.get('/register', (req, res) => {
    res.render('auth/register.ejs');
});

router.post('/register', async (req, res, next) => {
    try {
        // make sure a user with the same email doesn't already exist
        const userExists = await db.User.findOne({email: req.body.email});
        if(userExists) {
            return res.redirect('/login');
        }

        // turn their plaintext password into a hash
        const salt = await bcrypt.genSalt(12);
        const hash = await bcrypt.hash(req.body.password, salt);

        // save them in the database a redirect to login page so they can login
        req.body.password = hash;
        const newUser = await db.User.create(req.body);
        return res.redirect('/login');
    }
    catch(err) {
        console.log('Error in register post: ' + err);
        res.redirect('/login');
    }
});

router.get('/logout', async (req, res, next) => {
    try {
        // destroy their session and redirect to the homepage
        req.session.destroy();
        res.redirect('/');
    }
    catch(err) {
        console.err('Error in logout: ' + err);
        res.redirect('/');
    }
});

module.exports = router;