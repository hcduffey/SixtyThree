const siteRoutes = [
    { href: "/parks", title: "Parks"},
    { href: "/users", title: "Users"}
];

let navLinks = function navLinks(req, res, next) {
    res.locals.routes = siteRoutes;
    res.locals.active = req.originalUrl;
    
    if(res.locals.active.includes(req.session.currentUser.id)) {
        res.locals.active = "/home";
    }
   
    next();
}

module.exports = navLinks;