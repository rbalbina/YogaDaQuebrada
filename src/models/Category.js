module.exports = (sequelize, DataType) =>{
    const Category = sequelize.define('Category', {

        name:{
            type: DataType.STRING,
            allowNull: false,
        }
    },{
        tableName: 'categories'
    })

    return Category
}