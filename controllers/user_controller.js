const express = require('express')
const bcrypt = require('bcryptjs');
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

// edit route (form for editing user info)
router.get('/:id/edit', async(req, res, next) => {
    try {
        const user = await db.User.findById(req.params.id)
        if(req.session.currentUser) {
            if(req.session.currentUser.id === req.params.id) {
                res.render("./users/edit.ejs", {user: user});
            }
            else {
                res.redirect(`/users/${req.params.id}`);
            }
        }
        else {
            res.redirect('/');
        }
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
        let editOK = false;

        // a user should only be able to edit their own profile
        if(req.session.currentUser) {
            if(req.session.currentUser.id === req.params.id) {
                editOK = true; 
            }
        }

        res.render("./users/show.ejs", {user: user, editOK: editOK});
    }
    catch(err) {
        console.log("Error in user show: " + err);
        return next();
    }
});

// put route (updates user info)
router.put('/:id', async (req, res, next) => {
    try {
        if(req.session.currentUser) {
            if(req.session.currentUser.id === req.params.id) {
                if(req.body.password === '') {
                    let updatedUser = await db.User.findByIdAndUpdate(req.params.id, {name: req.body.name, avatar: req.body.avatar, email: req.body.email});
                }
                else {
                    const salt = await bcrypt.genSalt(12);
                    const hash = await bcrypt.hash(req.body.password, salt);
                    req.body.password = hash;
                    let updatedUser = await db.User.findByIdAndUpdate(req.params.id, {name: req.body.name, avatar: req.body.avatar, email: req.body.email, password: req.body.password});
                }
                res.redirect(`/users/${req.params.id}`);
            }
            else {
                res.redirect(`/users/${req.params.id}`);
            }
        }
        else {
            res.redirect('/');
        }
    }
    catch(err) {
        console.log("Error in user put: " + err);
        return next();
    }
});

// delete route
router.delete('/:id', async(req, res, next) => {
    try {
        if(req.session.currentUser) {
            if(req.session.currentUser.id === req.params.id) {
                let deletedUser = await db.User.findByIdAndDelete(req.params.id);
                res.redirect("/");
            }
            else {
                res.redirect(`/users/${req.params.id}`);
            }
        }
        else {
            res.redirect('/');
        }
    }
    catch(err) {
        console.log("Error in delete put: " + err);
        return next();
    }
});

module.exports = router;