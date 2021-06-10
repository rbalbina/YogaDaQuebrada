module.exports = (sequelize, DataType) =>{
    const Timing = sequelize.define('Timing', {

        
          class_id: {
            type: DataType.INTEGER,
      
          },
          time: {
            type: DataType.STRING,
      
          },
    },{
        tableName: 'timings',
        timestamps: false
    })

    // Timing.associate = (modelList)=>{

    //     Timing.belongsTo(modelList.Class,{
    //         foreignKey: 'class_id',
    //         as:'class'
    //     })

    // }

    return Timing
}