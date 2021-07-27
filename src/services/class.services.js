const { Class, User, Category, Timing, Enroll } = require('../models')
const bcrypt = require('bcryptjs')

class ClassService {

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

    static create(classData) {

        return Class.create(classData)
    }

    static remove(id) {

        return Class.destroy({ where: { id: id } })
    }
}

module.exports = ClassService