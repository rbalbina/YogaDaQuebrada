module.exports = (sequelize, DataType) =>{
    const Class = sequelize.define('Class', {

        date: {
            type: DataType.STRING,
            allowNull: false,
          },
        //   time_id: {
        //     type: DataType.INTEGER,
        //     allowNull: false,
        //   },
          professor_id: {
            type: DataType.INTEGER,
      
          },
          category_id: {
            type: DataType.INTEGER,
      
          },
    },{
        tableName: 'classes'

    })

    Class.associate = (modelList)=>{

        Class.belongsTo(modelList.Category,{
            foreignKey: 'category_id',
            as:'category'
        })

        Class.belongsTo(modelList.User,{
            foreignKey: 'professor_id',
            as:'professor'
        })

        Class.hasMany(modelList.Timing,{
            foreignKey: 'class_id',
            as:'timings'
        })

        Class.hasMany(modelList.Enroll,{
            foreignKey: 'class_id',
            as:'students'
        })

    }

    return Class
}