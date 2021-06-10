const newUser = (user, email) => {
  return  message = {
    from: '<no-replay@yogadaquebrada.com>', // sender address
    to: email, // list of receivers
    subject: "Cadastro Realizado com Sucesso", // Subject line
    text: "Welcome to XXX " + user // plain text body
   
  }}


  const changePassword = {
    from: '<no-replay@yogadaquebrada.com>', // sender address
    to: "bar@example.com, baz@example.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Welcome to XXX", // plain text body
    html: "<b>Bem-vindo </b>", // html body
  }


  module.exports = {
      newUser, changePassword
  }
