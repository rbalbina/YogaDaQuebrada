const bcrypt = require('bcryptjs')
const { User } = require('../models')

class UserService {

    static findAll(req) {
        let { page = 1 } = req.query
        return User.findAndCountAll({
            limit: 6,
            offset: (page - 1) * 6
        })
    }

    static findById(req) {
        const _id = req.params.id
        return User.findByPk(_id)
    }

    static create(user) {
        const salt = bcrypt.genSaltSync(8)
        const hash = bcrypt.hashSync(user.password, salt)
        user.password = hash
        return User.create(user)
    }

    static remove(id) {

        return User.destroy({ where: { id: id } })
    }

    static login(userData) {
        return User.findOne({ where: { email: userData.email } })
    }
}

module.exports = UserService