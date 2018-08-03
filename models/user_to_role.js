module.exports = function(sequelize, DataTypes) {   
    const user_role = sequelize.define("user_role", {
        role_id:{
            type:DataTypes.INTEGER,
            allowNull:false,
            primaryKey:true
        },
        user_id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            allowNull:false
        }
    }, {
        tableName: 'user_role',
        timestamps: false,
        classMethods: {}
    });
    user_role.belongsTo(sequelize.models.role, {
        as: 'role_details',
        foreignKey: 'role_id'
    });
    return user_role;

};