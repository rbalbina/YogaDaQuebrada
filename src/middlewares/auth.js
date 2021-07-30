const jwt = require('jsonwebtoken')
const User = require('../models')
const auth = async (req, res, next) => {
try {
const token = req.header('Authorization').replace('Bearer ', '')
const decoded = jwt.verify(token, 'secret')
req.user = decoded
console.log(req.user)
next()
} catch (e) {
res.status(401).send(e)
}
}
module.exports = auth