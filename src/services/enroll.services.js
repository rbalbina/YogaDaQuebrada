const { Class, User, Category, Timing, Enroll } = require('../models')
const bcrypt = require('bcryptjs')

class EnrollService {

    static findAll(enrollData) {
        return Enroll.findAll({
            where: {
              class_id: enrollData.class_id,
              student_id: enrollData.student_id
            }, attributes: {exclude: ["createdAt", "updatedAt"] },
            include: [{
                model: Class,
                required: true,
                as: 'class',
                attributes: ['id', 'week_days', 'category']
            }
            ],
          })
    }

    static EnrolledData(enrollData) {
      return Enroll.findOne({
          where: {
            id: enrollData.class_id,
            student_id: enrollData.student_id
          }, attributes: {exclude: ["createdAt", "updatedAt"] },
          include: [{
              model: Class,
              required: true,
              as: 'class',
              attributes: ['id', 'week_days', 'category']
          }
          ],
        })
  }

    static checkEnrolledClass(enrollData) {
      return Enroll.findOne({
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
            }, attributes: {exclude: ["createdAt", "updatedAt"] },
            include: [{
                model: Class,
                required: true,
                as: 'class',
                attributes: ['id', 'week_days', 'category', 'time']
            }
            ],
          })
    }

    static create(enrollData) {
        return Enroll.create(enrollData)
    }

    static removeClass(id) {

        return Enroll.destroy({ where: { id: id } })
    }

}

module.exports = EnrollService