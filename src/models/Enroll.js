module.exports = (sequelize, DataType) =>{
    const Enroll = sequelize.define('Enroll', {

        
          class_id: {
            type: DataType.INTEGER,
      
          },
          // time_id: {
          //   type: DataType.INTEGER,
      
          // },
          student_id: {
            type: DataType.INTEGER,
      
          },
    },{
        tableName: 'student_enrollment',
        timestamps: false
    })

    Enroll.associate = (modelList)=>{

        Enroll.belongsTo(modelList.Class,{
            foreignKey: 'class_id',
            as:'category'
        })

        Enroll.belongsTo(modelList.User,{
            foreignKey: 'student_id',
            as:'student'
        })

    }

    return Enroll
}