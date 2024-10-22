const returnTo = (request,_,next) => {
    if (request.query.returnTo) {
        request.session.returnTo = request.query.returnTo;
    }
    if (request.query.alias) {
        request.session.alias = request.query.alias;
    }
    
    next();
}

module.exports = {returnTo};