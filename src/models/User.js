module.exports = (sequelize, DataType) =>{
    const User = sequelize.define('User', {

        name:{
            type: DataType.STRING,
            allowNull: false,
        },
        email:{
            type: DataType.STRING,
            allowNull: false,
            unique: true
        },
        password:{
            type: DataType.STRING,
            allowNull: false,
        },
        userType:{
            type: DataType.STRING,
            allowNull: false,        
        }
    },{
        tableName: 'users'
    })

    return User
}