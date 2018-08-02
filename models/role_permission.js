module.exports = function(sequelize, DataTypes) {   
    const role_permission = sequelize.define("role_permission", {
        role_permission_id: {
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
        can_reject:{
            type:DataTypes.BOOLEAN,
            allowNull:false,
            defaultValue:false
        },
        can_export:{
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
            type:DataTypes.INTEGER,
            defaultValue: 0
        },
        updated_by:{
            type:DataTypes.INTEGER,
            defaultValue: 0
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
    role_permission.belongsTo(sequelize.models.role, {
        as: 'role_details', 
        targetKey:'role_id',
        foreignKey: 'role_id'
    });
    return role_permission;
};