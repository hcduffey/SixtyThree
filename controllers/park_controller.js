const express = require('express')
const router = express.Router()

const db = require('../models')
// ROUTES

// index route
router.get('/', async(req, res, next) => {
    try {
        const badges = await db.Badge.find({})
        const context = {badges: badges}
        res.render('parks.ejs', context)
    }
    catch(err) {
        console.log("Error in park index: " + err);
        return next();
    }
});

// show route
router.get('/:id', async(req, res, next) => {
    try {
        id = req.params.id
        const badges = await db.Badge.find({})
        const parks = await db.Park.find({})
        const ratings = await db.Rating.find({park: parks[id]._id}).populate('user');

        let currentUserId = "";
        if(req.session && req.session.currentUser) {
            currentUserId = req.session.currentUser.id;
        }

        const context = {parks: parks, badges: badges, ratings: ratings, currentUserId: currentUserId}
        res.render('parks_show.ejs', context)
    }
    catch(err) {
        console.log("Error in park show: " + err);
        return next();
    }
});

// create/refresh parks route
// NOTE: We may or may not need this
router.post('/', async(req, res, next) => {
    try {
        res.send("In park post");
    }
    catch(err) {
        console.log("Error in park post: " + err);
        return next();
    }
});

// put route
router.put('/:id', async(req, res, next) => {
    try {
        res.send("In park put");
    }
    catch(err) {
        console.log("Error in park put: " + err);
        return next();
    }
});

module.exports = router;