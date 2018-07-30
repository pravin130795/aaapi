module.exports = function(sequelize, DataTypes) {   
    return sequelize.define("role_permission", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
            allowNull: false
        },
        menu_item_id:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        role_id:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        can_view:{
            type:DataTypes.BOOLEAN,
            allowNull:false,
            defaultValue:false
        },
        can_create:{
            type:DataTypes.BOOLEAN,
            allowNull:false,
            defaultValue:false
        },
        can_update:{
            type:DataTypes.BOOLEAN,
            allowNull:false,
            defaultValue:false
        },
        can_delete:{
            type:DataTypes.BOOLEAN,
            allowNull:false,
            defaultValue:false
        },
        can_approve:{
            type:DataTypes.BOOLEAN,
            allowNull:false,
            defaultValue:false
        },
        can_report:{
            type:DataTypes.BOOLEAN,
            allowNull:false,
            defaultValue:false
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
        tableName: 'role_permission',
        timestamps: false,
        classMethods: {}
    });
};