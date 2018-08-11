module.exports = function(sequelize, DataTypes) {   
    const service_to_location = sequelize.define("service_to_location", {
        service_id: {
            type: DataTypes.INTEGER,
            primaryKey:true,
            allowNull: false
        },
        location_id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            allowNull:false
        }
    }, {
        tableName: 'service_to_location',
        timestamps: false,
        classMethods: {}
    });
    service_to_location.belongsTo(sequelize.models.service_master, {
        as: 'service_map', 
        targetKey:'service_id',
        foreignKey: 'service_id'
    });
    service_to_location.belongsTo(sequelize.models.master_location, {
        as: 'location_map', 
        targetKey:'location_id',
        foreignKey: 'location_id'
    });
    return service_to_location;
};