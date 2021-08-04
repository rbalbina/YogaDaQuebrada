module.exports = (sequelize, DataType) =>{
    const Class = sequelize.define('Class', {

        week_days: {
            type: DataType.STRING,
            allowNull: false,
          },

          time: {
            type: DataType.STRING,
      
          },

          professor_id: {
            type: DataType.INTEGER,
      
          },
          category: {
            type: DataType.STRING,
      
          },
    },{
        tableName: 'classes'

    })

    Class.associate = (modelList)=>{

        // Class.belongsTo(modelList.Category,{
        //     foreignKey: 'category_id',
        //     as:'category'
        // })

        Class.belongsTo(modelList.User,{
            foreignKey: 'professor_id',
            as:'professor'
        })

        Class.hasMany(modelList.Enroll,{
            foreignKey: 'class_id',
            as:'students'
        })

    }

    return Class
}