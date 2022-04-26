const express = require('express')
const router = express.Router()

const db = require('../models')


// ROUTES

// index route
router.get('/', async(req, res, next) => {
    try {
        res.send("In user index");
    }
    catch(err) {
        console.log("Error in user index: " + err);
        return next();
    }
});

// new route (sign-up for a user)
router.get('/new', async(req, res, next) => {
    try {
        res.send("In user new");
    }
    catch(err) {
        console.log("Error in user new: " + err);
        return next();
    }
});

// edit route (form for editing user info)
router.get('/:id/edit', async(req, res, next) => {
    try {
        res.send("In user edit");
    }
    catch(err) {
        console.log("Error in user edit: " + err);
        return next();
    }
});

// show route
router.get('/:id', async(req, res, next) => {
    try {
        res.send("In user show");
    }
    catch(err) {
        console.log("Error in user show: " + err);
        return next();
    }
});

// create route
router.post('/', async(req, res, next) => {
    try {
        res.send("In user post");
    }
    catch(err) {
        console.log("Error in user post: " + err);
        return next();
    }
});

// put route (updates user info)
router.put('/:id', async(req, res, next) => {
    try {
        res.send("In user put");
    }
    catch(err) {
        console.log("Error in user put: " + err);
        return next();
    }
});

// delete route
router.delete('/:id', async(req, res, next) => {
    try {
        res.send("In user delete");
    }
    catch(err) {
        console.log("Error in delete put: " + err);
        return next();
    }
});

module.exports = router;