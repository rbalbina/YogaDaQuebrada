const cookies = (req, res, next) =>{
    if(req.cookies.userid != undefined){

    }
    next()
}

module.exports = cookies