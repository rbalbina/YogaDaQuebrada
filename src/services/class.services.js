const { Class, User, Category, Timing, Enroll } = require('../models')
const bcrypt = require('bcryptjs')

class ClassService {

    static findAll() {
        return Class.findAll({
            attributes: { exclude: ["createdAt", "updatedAt"] },
            include: [
            {
                model: User,
                required: true,
                as: 'professor',
                attributes: ['name']
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


    static findById(id) {
        
        return Class.findByPk(id, {
            attributes: ["id", "week_days"],
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

            ],
          })
    }

    static findClassByUserId(userid) {
        
        return Class.findAll({ where: { professor_id: userid} })
    }

    static create(classData) {

        return Class.create(classData)
    }

    static removeClass(id) {

        return Class.destroy({ where: { id: id } })
    }
}

module.exports = ClassService