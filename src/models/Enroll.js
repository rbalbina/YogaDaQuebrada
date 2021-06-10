module.exports = (sequelize, DataType) =>{
    const Enroll = sequelize.define('Enroll', {

        
          class_id: {
            type: DataType.INTEGER,
      
          },
          time_id: {
            type: DataType.INTEGER,
      
          },
          student_id: {
            type: DataType.INTEGER,
      
          },
    },{
        tableName: 'student_enrollment',
        timestamps: false
    })

    // Enroll.associate = (modelList)=>{

    //     Enroll.belongsTo(modelList.Category,{
    //         foreignKey: 'category_id',
    //         as:'category'
    //     })

    //     Enroll.belongsTo(modelList.User,{
    //         foreignKey: 'professor_id',
    //         as:'professor'
    //     })

    // }

    return Enroll
}