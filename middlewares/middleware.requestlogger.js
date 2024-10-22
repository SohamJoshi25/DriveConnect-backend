const LogRequest = (request,_,next) => {
    //console.log(request.method,request.path,request.query,request.session)
    next()
}

module.exports = LogRequest