const authRoutes = [
    { href: "/parks", title: "Parks"},
    { href: "/users", title: "Users"},
    { href: "/login", title: "Login"},
    { href: "/register", title: "Register"}
];

const siteRoutes = [
    { href: "/parks", title: "Parks"},
    { href: "/users", title: "Users"}
];

let navLinks = function navLinks(req, res, next) {
    if(!req.session || !req.session.currentUser) {
        res.locals.routes = authRoutes;
    }
    else {
        res.locals.routes = siteRoutes;
    }

    next();
}

module.exports = navLinks;