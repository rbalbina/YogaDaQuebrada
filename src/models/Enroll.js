module.exports = (sequelize, DataType) =>{
    const Enroll = sequelize.define('Enroll', {

        
          class_id: {
            type: DataType.INTEGER,
      
          },
          
          student_id: {
            type: DataType.INTEGER,
      
          },
          room_link: {
              
            type: DataType.INTEGER,
      
          },
    },{
        tableName: 'student_enrollment',
        timestamps: true
    })

    Enroll.associate = (modelList)=>{

        Enroll.belongsTo(modelList.Class,{
            foreignKey: 'class_id',
            as:'class'
        })

        Enroll.belongsTo(modelList.User,{
            foreignKey: 'student_id',
            as:'student'
        })

    }

    return Enroll
}