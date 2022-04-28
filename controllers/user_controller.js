const express = require('express')
const router = express.Router()

const db = require('../models')


// ROUTES

// index route
router.get('/', async(req, res, next) => {
    try {
        const users = await db.User.find({});
        res.render('./users/index.ejs', {users: users});
    }
    catch(err) {
        console.log("Error in user index: " + err);
        return next();
    }
});

// new route (sign-up for a user)
router.get('/new', (req, res) => {
    res.render('./users/new.ejs');
});

// edit route (form for editing user info)
router.get('/:id/edit', async(req, res, next) => {
    try {
        const user = await db.User.findById(req.params.id)
        res.render("./users/edit.ejs", {user: user});
    }
    catch(err) {
        console.log("Error in user edit: " + err);
        return next();
    }
});

// show route
router.get('/:id', async(req, res, next) => {
    try {
        const user = await db.User.findById(req.params.id).populate('parks').populate('badges');
        let editOK = true; // This will be set if show :id === session user id

        res.render("./users/show.ejs", {user: user, editOK: editOK});
    }
    catch(err) {
        console.log("Error in user show: " + err);
        return next();
    }
});

// create route
router.post('/', async(req, res, next) => {
    try {
        // TODO: Add password bcrypt stuff
        let newUser = await db.User.create(req.body);
        res.redirect(`/users/${newUser._id}`);
    }
    catch(err) {
        console.log("Error in user create (post): " + err);
        return next();
    }
});

// put route (updates user info)
router.put('/:id', async (req, res, next) => {
    try {
        if(req.body.password === '') {
            let updatedUser = await db.User.findByIdAndUpdate(req.params.id, {name: req.body.name, avatar: req.body.avatar, email: req.body.email});
        }
        else {
            //TODO: Add bcrypt stuff before updating password field
            let updatedUser = await db.User.findByIdAndUpdate(req.params.id, {name: req.body.name, avatar: res.body.avatar, email: req.body.email, password: req.body.password});
        }
        res.redirect(`/users/${req.params.id}`);
        
    }
    catch(err) {
        console.log("Error in user put: " + err);
        return next();
    }
});

// delete route
router.delete('/:id', async(req, res, next) => {
    try {
        let deletedUser = await db.User.findByIdAndDelete(req.params.id);
        res.redirect("/");
    }
    catch(err) {
        console.log("Error in delete put: " + err);
        return next();
    }
});

module.exports = router;