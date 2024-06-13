const { checkSessionInDatabase } = require('../Model/checkSessionModel');

const checkSessionMiddleware = async (req, res, next) => {
    const sessionId = req.cookies["sessionID"];
    
    if (await checkSessionInDatabase(sessionId)) {
        next();
    } else {
        res.redirect("/login");
    }
};

module.exports = checkSessionMiddleware;
