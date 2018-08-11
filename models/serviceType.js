module.exports = function(sequelize, DataTypes) {   
    const service_type = sequelize.define("service_type", {
        service_type_id: {
            type: DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
            allowNull: false
        },
        service_type_english:{
            type:DataTypes.STRING,
            unique:true,
            allowNull:false
        },
        service_type_arabic:{
            type:DataTypes.STRING,
            allowNull:false
        },
        show_price:{
            type:DataTypes.BOOLEAN,
            defaultValue: false,
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
        tableName: 'master_service_type',
        timestamps: false,
        classMethods: {}
    });
    service_type.belongsTo(sequelize.models.service_master, {
        as: 'service_type_details', 
        targetKey:'service_type_id',
        foreignKey: 'service_type_id'
    });
    return service_type;
};