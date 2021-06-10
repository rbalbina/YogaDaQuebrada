const nodemailer = require('nodemailer')

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "935d6d4c09b117",
      pass: "959d84c68ef5a8"
    }
  });


module.exports = transport