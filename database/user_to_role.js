module.exports = function(sequelize, DataTypes) {   
    return sequelize.define("user_role", {
        role_id:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        user_id:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        created_at:{
            type:DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        updated_at:{
            type:DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        created_by:{
            type:DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        updated_by:{
            type:DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        is_active:{
            type:DataTypes.BOOLEAN,
            allowNull:false,
            defaultValue:false
        }
    }, {
        tableName: 'user_role',
        timestamps: false,
        classMethods: {}
    });
};