module.exports = function(sequelize, DataTypes) {   
    const service_master = sequelize.define("service_master", {
        service_id: {
            type: DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
            allowNull: false
        },
        service_english:{
            type:DataTypes.STRING,
            unique:true,
            allowNull:false
        },
        service_arabic:{
            type:DataTypes.STRING,
            allowNull:false
        },
        service_type_id:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        price:{
            type:DataTypes.DECIMAL(10, 2),
            defaultValue: 0,
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
        tableName: 'master_service',
        timestamps: false,
        classMethods: {}
    });

    return service_master;
};