module.exports = function(sequelize, DataTypes) {   
    const autolineStatusMap = sequelize.define("autolineStatusMap", {
        status_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        autoline_status_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        }
    }, 
    {
        tableName: 'autoline_status_map',
        timestamps: false,
        classMethods: {}
    });
    autolineStatusMap.belongsTo(sequelize.models.statusMaster, {'as': 'autoLine_statuses', targetKey: 'status_id', foreignKey: 'status_id'});
    autolineStatusMap.belongsTo(sequelize.models.autolineStatusMaster, {'as': 'autoLine_status_map', targetKey: 'autoline_status_id', foreignKey: 'autoline_status_id'});
    return autolineStatusMap;
};