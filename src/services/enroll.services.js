const { Class, User, Category, Timing, Enroll } = require('../models')
const bcrypt = require('bcryptjs')

class EnrollService {

    static findAll(enrollData) {
        return Enroll.findAll({
            where: {
              class_id: enrollData.class_id,
              student_id: enrollData.student_id
            }
          })
    }

    static findClassByUser(userid) {
        return Enroll.findAll({
            where: {
              student_id: userid
            }
          })
    }

    static create(enrollData) {
        return Enroll.create(enrollData)
    }

    static remove(id) {

        return Class.destroy({ where: { id: id } })
    }

}

module.exports = EnrollService