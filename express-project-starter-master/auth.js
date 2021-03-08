const db = require('./db/models');

const loginUser = (req, res, user) => {
    req.session.auth = {
        userId: user.id
    }
};

const logoutUser = (req, res) => {
    delete req.session.auth;
};

const requireAuth = (req, res, next) => {
    if (!res.locals.authenticated) {
        return res.redirect('/login')
    }
    return next();
}