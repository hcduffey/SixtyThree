const express = require('express')
const router = express.Router()

const db = require('../models')
// ROUTES

// index route
router.get('/', async(req, res, next) => {
    try {
        const badges = await db.Badge.find({})
        console.log(badges)
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
        res.send("In park show");
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