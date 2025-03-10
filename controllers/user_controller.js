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
                return res.render("./users/edit.ejs", {user: user});
            }
            else {
                return res.redirect(`/users/${req.params.id}`);
            }
        }
        else {
            return res.redirect('/');
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
        const allParks = await db.Park.find({});
        let userReviews = await db.Rating.find({user: user._id}).populate('park');

        let medal;
        let medalMessage;

        // determine which medal the profile gets
        if(user.parks.length > 10) {
            medal = "gold";
            medalMessage = "Super User"
        }
        else if(user.parks.length > 3) {
            medal = "silver";
            medalMessage = "Active User"
        }
        else {
            medal = "bronze";
            medalMessage = "Registered User";
        }
        // check for orphan reviews (where the Park ID changed and no longer maps correctly)
        userReviews = userReviews.filter((review) => review.park !== null)

        let editOK = false;
        // a user should only be able to edit their own profile
        if(req.session.currentUser) {
            if(req.session.currentUser.id === req.params.id) {
                editOK = true; 
            }
        }

        res.render("./users/show.ejs", {user: user, editOK: editOK, allParks: allParks, userReviews: userReviews, medalMessage: medalMessage, medal: medal});
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
                if(req.body.park) {
                    let parktoAdd = await db.Park.findById(req.body.park);
                    let badgetoAdd = await db.Badge.findOne({name: parktoAdd.name});
                    let usertoUpdate = await db.User.findById(req.session.currentUser.id);
                    usertoUpdate.parks.push(parktoAdd);
                    usertoUpdate.badges.push(badgetoAdd);
                    usertoUpdate.save();
                    return res.redirect('back');
                }
                else {
                    if(req.body.password === '') {
                        let updatedUser = await db.User.findByIdAndUpdate(req.params.id, {name: req.body.name, avatar: req.body.avatar, email: req.body.email});
                        req.session.currentUser.name = req.body.name;
                    }
                    else {
                        const salt = await bcrypt.genSalt(12);
                        const hash = await bcrypt.hash(req.body.password, salt);
                        req.body.password = hash;
                        let updatedUser = await db.User.findByIdAndUpdate(req.params.id, {name: req.body.name, avatar: req.body.avatar, email: req.body.email, password: req.body.password});
                        req.session.currentUser.name = req.body.name;
                    }
                }
                
                res.redirect('/home');
            }
            else {
                res.redirect('back');
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