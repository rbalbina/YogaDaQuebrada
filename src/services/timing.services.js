const { Class, User, Category, Timing, Enroll } = require('../models')
const bcrypt = require('bcryptjs')

class TimingService {

    static findAll() {
        return Class.findAll({
            attributes: { exclude: ["createdAt", "updatedAt"] },
            include: [{
                model: Category,
                required: true,
                as: 'category',
                attributes: ['name']
            },
            {
                model: User,
                required: true,
                as: 'professor',
                attributes: ['name']
            },
            {
                model: Timing,
                required: true,
                as: 'timings',
                attributes: ['time']
            },
            {
                model: Enroll,
                // required: true,
                as: 'students',
                attributes: ['student_id']
            }
            ],
        })
    }

    static findAllTiming() {
        return Timing.findAll()
    }

    static findById(id) {
        return Class.findByPk(id, {
            attributes: ["id", "date"],
            include: [{
              model: Category,
              required: true,
              as: 'category',
              attributes: ['name']
            },
            {
              model: User,
              required: true,
              as: 'professor',
              attributes: ['name']
            },
            {
              model: Timing,
              required: true,
              as: 'timings',
              attributes: ['time']
            }
            ],
          })
    }

    static create(timings) {
        return Timing.bulkCreate(timings)
    }

    static remove(id) {

        return Class.destroy({ where: { id: id } })
    }

    static login(userData) {
        return Class.findOne({ where: { email: userData.email } })
    }
}

module.exports = TimingService